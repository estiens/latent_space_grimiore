# Canon Data - Spotify ID Issue

## Problem

**All Spotify embed IDs in the canon data files are currently invalid placeholder IDs.**

When you click a Spotify embed button, the iframe will show "Page not found" because the IDs don't correspond to real Spotify content.

Example of invalid ID:
```typescript
{
  type: 'spotify',
  embedId: 'spotify:album:2FZBpnGJj3xXjJvYvVYqVn', // ← This ID returns 404
  spotifyType: 'album',
}
```

## How to Fix

### Option 1: Use the Validation Script

Run the validation script to identify all invalid IDs:

```bash
npx tsx scripts/validate-spotify-ids.ts
```

This will:
- Check every Spotify ID in the canon data files
- Report which ones are invalid (404)
- Provide search URLs to find the correct IDs

### Option 2: Manual Replacement

For each invalid Spotify embed:

1. Search for the content on Spotify: `https://open.spotify.com/search/[artist] [title]`
2. Copy the album/track/playlist ID from the URL
3. Replace the placeholder ID in the data file

Example - Finding the real Fela Kuti "Zombie" ID:

1. Search: https://open.spotify.com/search/Fela%20Kuti%20Zombie
2. Find the album, click it
3. URL will be: `https://open.spotify.com/album/5daEPaHfFiOSpKJLMraH9D`
4. Extract ID: `5daEPaHfFiOSpKJLMraH9D`
5. Update data:
   ```typescript
   embedId: 'spotify:album:5daEPaHfFiOSpKJLMraH9D', // ✅ Valid ID
   ```

## Affected Files

All files in `data/canon/` with Spotify embeds:
- malkuth.ts
- yesod.ts
- hod.ts
- netzach.ts
- tiphareth.ts
- geburah.ts
- chesed.ts
- binah.ts
- chokmah.ts
- daat.ts
- kether.ts

## Component Behavior

The `SpotifyCompact` component has been updated to:
- Remove query parameters that Spotify's embed doesn't accept
- Show a fallback message when the embed fails to load
- Provide a "Search on Spotify" button as an alternative

## Future Improvement

Consider creating a GitHub issue to track replacing all placeholder IDs with real Spotify content IDs.
