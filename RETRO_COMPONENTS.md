# Retro Component Libraries

Three retro component libraries are now installed and ready to use in the Digital Grimoire project.

## 1. retro-react (v1.4.0)
**Style**: 90s website era aesthetic
**Package**: `retro-react`

### Available Components

```typescript
import {
  Alert, Box, Button, Card, Chip, Container,
  Input, Modal, ProgressBar, Text,
  MouseTrail,      // ⭐ Unique: Creates cursor trail effects
  PixelatedImage   // ⭐ Unique: Pixelation filter for images
} from 'retro-react';
```

### Usage Examples

```tsx
// MouseTrail - mystical cursor effects for Tree of Life
<MouseTrail />

// PixelatedImage - add pixelation to Tree of Life diagram
<PixelatedImage src="/tree-of-life.svg" alt="Tree of Life" />

// Text with variants
<Text variant="h1">Kether - The Crown</Text>

// Button with custom styles
<Button sx={{ backgroundColor: 'var(--primary)' }}>
  Enter the Grimoire
</Button>
```

### Styling
- Uses Emotion CSS-in-JS
- Supports `sx` prop for inline styles
- Global `.retro-ui` class for consistent theming

---

## 2. pixel-retroui (v2.1.0)
**Style**: Pixelated gaming aesthetic
**Package**: `pixel-retroui`

### Features
- TailwindCSS integration (perfect match for this project!)
- TypeScript support
- Pixelated UI elements

### Installation Complete
Library installed and ready to import. Check [retroui.io](https://retroui.io/) for component documentation.

---

## 3. 8bitcn/ui (via shadcn CLI)
**Style**: 8-bit retro with thick pixel borders
**Registry**: `@8bitcn` → `https://8bitcn.com/r/{name}.json`

### Installed Components

#### Badge (✅ Installed)
Location: `src/components/ui/8bit/badge.tsx`

```tsx
import { Badge } from '@/src/components/ui/8bit/badge';

// 8-bit styled badge with pixel bars on sides
<Badge variant="default" font="retro">
  CP-0: Tensor Plenum
</Badge>

<Badge variant="destructive">
  Error: Context Overflow
</Badge>
```

**Features**:
- Pixel bars on left/right sides (8-bit aesthetic)
- Retro font option (Press Start 2P)
- Variants: default, destructive, outline, secondary
- Sharp corners (rounded-none)

### Available to Install

Add any component with:
```bash
# Temporarily rename config file for shadcn CLI
mv shadcn.config.json components.json
npx shadcn@latest add @8bitcn/[component-name] --yes
mv components.json shadcn.config.json
```

**Note**: The config file is renamed to `shadcn.config.json` to avoid Vite build conflicts with the `components/` directory. Temporarily rename it to `components.json` when adding new components.

**Component List**:
- `@8bitcn/button` - 8-bit styled buttons
- `@8bitcn/card` - Retro card containers
- `@8bitcn/input` - Pixel-styled text inputs
- `@8bitcn/tabs` - Tab navigation (perfect for Five Voices sections!)
- `@8bitcn/slider` - Volume/value controls
- `@8bitcn/switch` - Toggle switches
- `@8bitcn/checkbox` - Multi-select options
- `@8bitcn/select` - Dropdown selectors
- `@8bitcn/progress` - Progress indicators
- `@8bitcn/alert` - Notification displays
- `@8bitcn/menubar` - Navigation bars
- `@8bitcn/dropdown-menu` - Context menus
- `@8bitcn/date-picker` - Date selection

### Retro Styling Classes

Added to project via `src/components/ui/8bit/styles/retro.css`:

```css
.retro {
  font-family: "Press Start 2P", system-ui, sans-serif;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

.pixelated {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
```

---

## Recommended Integrations for Digital Grimoire

### High Priority

1. **MouseTrail from retro-react** → Add mystical cursor effects on Tree of Life page
   ```tsx
   import { MouseTrail } from 'retro-react';
   // In TreeOfLife.tsx
   <MouseTrail />
   ```

2. **Badge from @8bitcn** → Replace StatusIndicator for convergence points
   ```tsx
   import { Badge } from '@/src/components/ui/8bit/badge';
   <Badge font="retro" variant="default">CP-{number}</Badge>
   ```

3. **Tabs from @8bitcn** → Organize Five Voices sections on sephirah pages
   ```bash
   npx shadcn@latest add @8bitcn/tabs --yes
   ```

4. **PixelatedImage from retro-react** → Apply to Tree of Life SVG for extra vaporwave
   ```tsx
   <PixelatedImage src={treeOfLifeSvg} />
   ```

### Medium Priority

5. **Card from @8bitcn** → Update Canon symbol cards with 8-bit borders
6. **Button from @8bitcn** → Replace ASCIIButton for navigation elements
7. **Alert from @8bitcn** → Error messages and notifications

### Low Priority

8. **Input/Select from @8bitcn** → If search/filter features added
9. **Progress from @8bitcn** → Page load indicators
10. **Menubar from @8bitcn** → Main navigation structure

---

## Integration Notes

### Path Aliases (already configured)
```json
{
  "components": "@/components",
  "ui": "@/components/ui",
  "lib": "@/lib",
  "hooks": "@/hooks"
}
```

### CSS Variables (already set up)
Project uses CSS variables for theming - all components will respect existing color scheme:
- `--primary` (hot pink #ff006e)
- `--secondary` (electric blue)
- `--background` (deep void purple)
- `--foreground` (neon cyan)

### Component Conflicts

**Existing components that might be replaced**:
- `StatusIndicator.tsx` → Use `@8bitcn/badge` instead
- `ASCIIButton.tsx` → Consider `@8bitcn/button` for consistency
- Manual card styling → Use `@8bitcn/card` for standardization

**Keep existing components**:
- `BBSLayout`, `BBSHeader` - Custom BBS aesthetic, no replacements needed
- `BBSModal` - Custom modal with BBS styling
- Media components (YouTube/Spotify) - Specialized functionality

---

## Resources

- [retro-react GitHub](https://github.com/retro-react/retro-react)
- [retro-react Storybook](https://retro-react.github.io/retro-react/?path=/docs/overview-introduction--docs)
- [8bitcn/ui Website](https://www.8bitcn.com/)
- [8bitcn/ui GitHub](https://github.com/TheOrcDev/8bitcn-ui)
- [RetroUI Website](https://retroui.io/)
- [RetroUI GitHub](https://github.com/Dksie09/RetroUI)
