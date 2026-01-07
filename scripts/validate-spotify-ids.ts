#!/usr/bin/env node
/**
 * Validate Spotify IDs in canon data files
 *
 * This script checks all Spotify embed IDs in the canon data files
 * and reports which ones return 404 errors.
 *
 * Usage:
 *   npx tsx scripts/validate-spotify-ids.ts
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

async function validateSpotifyId(id: string, type: string = 'album'): Promise<boolean> {
  try {
    const response = await fetch(`https://open.spotify.com/${type}/${id}`, {
      method: 'HEAD',
    });
    return response.ok;
  } catch (error) {
    console.error(`Error validating ${type}/${id}:`, error);
    return false;
  }
}

async function main() {
  const canonDir = join(process.cwd(), 'data', 'canon');
  const files = await readdir(canonDir);
  const tsFiles = files.filter(f => f.endsWith('.ts'));

  console.log(`Validating Spotify IDs in ${tsFiles.length} canon files...\n`);

  const invalidIds: Array<{
    file: string;
    entryId: string;
    title: string;
    artist: string;
    spotifyUri: string;
    spotifyType: string;
    spotifyId: string;
  }> = [];

  for (const file of tsFiles) {
    const content = await readFile(join(canonDir, file), 'utf-8');

    // Extract Spotify URIs using regex
    const spotifyMatches = content.matchAll(/embedId:\s*['"]spotify:([^:]+):([^'"]+)['"]/g);

    for (const match of spotifyMatches) {
      const type = match[1];
      const id = match[2];

      // Find the entry context for better reporting
      const lineIndex = content.indexOf(match[0]);
      const beforeContext = content.substring(Math.max(0, lineIndex - 500), lineIndex);
      const titleMatch = beforeContext.match(/title:\s*['"]([^'"]+)['"]/);
      const artistMatch = beforeContext.match(/artist:\s*['"]([^'"]+)['"]/);
      const idMatch = beforeContext.match(/id:\s*['"]([^'"]+)['"]/);

      const isValid = await validateSpotifyId(id, type);

      if (!isValid) {
        invalidIds.push({
          file,
          entryId: idMatch?.[1] || 'unknown',
          title: titleMatch?.[1] || 'unknown',
          artist: artistMatch?.[1] || 'unknown',
          spotifyUri: `spotify:${type}:${id}`,
          spotifyType: type,
          spotifyId: id,
        });
        console.log(`❌ ${file}: "${titleMatch?.[1]}" - spotify:${type}:${id}`);
      } else {
        console.log(`✅ ${file}: "${titleMatch?.[1]}" - spotify:${type}:${id}`);
      }

      // Rate limit: wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log(`\n\n=== SUMMARY ===`);
  console.log(`Total invalid Spotify IDs: ${invalidIds.length}`);

  if (invalidIds.length > 0) {
    console.log(`\nInvalid IDs by file:`);
    const byFile = invalidIds.reduce((acc, item) => {
      if (!acc[item.file]) acc[item.file] = [];
      acc[item.file].push(item);
      return acc;
    }, {} as Record<string, typeof invalidIds>);

    for (const [file, items] of Object.entries(byFile)) {
      console.log(`\n${file}:`);
      for (const item of items) {
        console.log(`  - ${item.title} by ${item.artist}`);
        console.log(`    Current: ${item.spotifyUri}`);
        console.log(`    Search: https://open.spotify.com/search/${encodeURIComponent(`${item.artist} ${item.title}`)}`);
      }
    }
  }
}

main().catch(console.error);
