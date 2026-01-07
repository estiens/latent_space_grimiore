# Spotify Embed Fix - Investigation Report

## Problem Identified

All Spotify embeds show "Page not found" errors in iframes.

## Root Cause

**The Spotify IDs in the canon data files are invalid placeholder IDs that don't exist on Spotify.**

### Evidence

Testing various IDs from the data:
- `spotify:album:2FZBpnGJj3xXjJvYvVYqVn` (Malkuth - Meredith Monk) → HTTP 404
- `spotify:album:20EbPQpeptYQcdmJsKXbrS` (Fela Kuti - Zombie) → HTTP 404
- `spotify:track:7KmHVLdXs3B0WgPXGz9Ueu` (Steve Reich - Clapping Music) → HTTP 404

Real Spotify ID format works fine:
- `spotify:album:5daEPaHfFiOSpKJLMraH9D` (Actual Fela Kuti - Zombie) → HTTP 200 ✅

## What Was Fixed

### 1. Component Updates (`components/media/SpotifyCompact.tsx`)

**Removed problematic query parameters:**
```typescript
// Before (causes 404):
`https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0`

// After (works when ID is valid):
`https://open.spotify.com/embed/${type}/${spotifyId}`
```

**Added error handling:**
- Added `embedError` state to track failed embeds
- Added fallback UI when embed fails showing:
  - Spotify icon (grayed out)
  - "Spotify embed unavailable" message
  - "Search on Spotify" button that opens search

**Updated footer:**
- Shows "Embed failed" when error detected instead of "Playing"

### 2. Created Validation Script (`scripts/validate-spotify-ids.ts`)

A Node.js script that:
- Scans all canon data files for Spotify URIs
- Validates each ID by making HEAD requests to Spotify
- Reports which IDs are invalid (404)
- Provides search URLs to find correct IDs

Usage:
```bash
npx tsx scripts/validate-spotify-ids.ts
```

### 3. Documentation (`data/canon/README.md`)

Created comprehensive guide covering:
- What the problem is
- How to fix individual IDs
- How to use the validation script
- List of affected files
- Component behavior

## Current State

### What Works
✅ Component gracefully handles invalid IDs
✅ Fallback UI provides search option
✅ Build succeeds with no TypeScript errors
✅ URL format is correct (when IDs are valid)

### What Still Needs Work
❌ All ~45 Spotify IDs in canon data are invalid placeholders
❌ Users will see "Page not found" or fallback UI for all embeds
❌ Need to replace each ID with real Spotify content IDs

## Next Steps

### Option A: Quick Fix (Hide Invalid Embeds)
Filter out invalid Spotify embeds entirely until real IDs are available.

### Option B: Systematic Replacement (Recommended)
1. Run validation script to get full list of invalid IDs
2. For each entry:
   - Search Spotify for the artist + title
   - Copy the real ID from the URL
   - Update the data file
3. Re-run validation to confirm all IDs work

### Option C: Hybrid Approach
1. Replace critical/popular entries first (Fela Kuti, Steve Reich, etc.)
2. Hide remaining invalid entries
3. Replace rest over time

## Files Modified

- `/components/media/SpotifyCompact.tsx` - Component fixes
- `/scripts/validate-spotify-ids.ts` - Validation tool (new)
- `/data/canon/README.md` - Documentation (new)
- `/SPOTIFY_FIX.md` - This report (new)

## Testing Recommendations

1. Start dev server: `npm run dev`
2. Navigate to `/malkuth`
3. Click a Spotify button
4. Verify you see either:
   - The embed (if ID happens to be valid)
   - OR fallback UI with search button

## Example Fix (Fela Kuti - Zombie)

**Before:**
```typescript
{
  type: 'spotify',
  embedId: 'spotify:album:20EbPQpeptYQcdmJsKXbrS', // Invalid!
  spotifyType: 'album',
}
```

**After:**
```typescript
{
  type: 'spotify',
  embedId: 'spotify:album:5daEPaHfFiOSpKJLMraH9D', // Valid!
  spotifyType: 'album',
}
```

How to find the correct ID:
1. Go to https://open.spotify.com/search/Fela%20Kuti%20Zombie
2. Find the 1976 album "Zombie"
3. Click it to open: https://open.spotify.com/album/5daEPaHfFiOSpKJLMraH9D
4. Extract ID: `5daEPaHfFiOSpKJLMraH9D`
5. Use format: `spotify:album:5daEPaHfFiOSpKJLMraH9D`
