# Heart Rate Component Tooltip Styling Guide

This guide explains how to find and customize the tooltip styles in the heart rate monitoring component.

## Finding the Tooltip Component

The tooltip is located in the `GoalLineTooltip` function within `/App.tsx`. You can find it by searching for:
```
function GoalLineTooltip
```

## Current Tooltip Implementation

```tsx
function GoalLineTooltip({ bpm, visible, x, y }: { bpm: string; visible: boolean; x: number; y: number }) {
  if (!visible) return null;
  
  return (
    <div 
      className="absolute px-2 py-1 rounded-md text-[12px] font-medium pointer-events-none z-50 transition-opacity duration-200 border"
      style={{ 
        left: `${x}px`, 
        top: `${y - 30}px`,
        transform: 'translateX(-50%)',
        opacity: visible ? 1 : 0,
        backgroundColor: 'rgba(217, 70, 239, 0.05)',
        borderColor: 'rgba(217, 70, 239, 0.05)',
        color: '#D946EF',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {bpm}bpm
    </div>
  );
}
```

## Styling Properties Breakdown

### Tailwind Classes
These classes handle layout, spacing, and basic styling:
- `absolute` - Absolute positioning
- `px-2 py-1` - Padding (horizontal: 8px, vertical: 4px)
- `rounded-md` - Border radius
- `text-[12px]` - Font size
- `font-medium` - Font weight
- `pointer-events-none` - Prevents mouse interactions
- `z-50` - Z-index for layering
- `transition-opacity duration-200` - Opacity transition animation
- `border` - Adds border

### Inline Styles
These handle positioning, colors, and effects:
- `left` & `top` - Dynamic positioning based on mouse location
- `transform: 'translateX(-50%)'` - Centers tooltip horizontally
- `opacity` - Controls visibility with fade effect
- `backgroundColor: 'rgba(217, 70, 239, 0.05)'` - Purple background with 5% opacity
- `borderColor: 'rgba(217, 70, 239, 0.05)'` - Purple border with 5% opacity  
- `color: '#D946EF'` - Purple text color
- `backdropFilter: 'blur(20px)'` - Background blur effect (20px)
- `WebkitBackdropFilter: 'blur(20px)'` - Safari/WebKit browser support

## How to Update Tooltip Styles

### 1. Changing Colors

**Background Color:**
```tsx
backgroundColor: 'rgba(217, 70, 239, 0.05)', // Current purple
backgroundColor: 'rgba(59, 130, 246, 0.05)', // Blue example
backgroundColor: 'rgba(16, 185, 129, 0.05)', // Green example
```

**Text Color:**
```tsx
color: '#D946EF', // Current purple
color: '#3B82F6', // Blue example
color: '#10B981', // Green example
```

**Border Color:**
```tsx
borderColor: 'rgba(217, 70, 239, 0.05)', // Current purple
borderColor: 'rgba(59, 130, 246, 0.05)', // Blue example
```

### 2. Adjusting Background Blur

```tsx
backdropFilter: 'blur(20px)', // Current blur
backdropFilter: 'blur(10px)', // Less blur
backdropFilter: 'blur(30px)', // More blur
backdropFilter: 'none',       // No blur
```

### 3. Changing Size and Spacing

**Padding (Tailwind classes):**
```tsx
className="... px-1 py-0.5 ..." // Smaller padding
className="... px-3 py-2 ..."   // Larger padding
```

**Font Size (Tailwind classes):**
```tsx
className="... text-[10px] ..." // Smaller text
className="... text-[14px] ..." // Larger text
```

### 4. Adjusting Position

**Vertical offset:**
```tsx
top: `${y - 30}px`, // Current (30px above cursor)
top: `${y - 40}px`, // Further above cursor
top: `${y - 20}px`, // Closer to cursor
```

**Horizontal alignment:**
```tsx
transform: 'translateX(-50%)', // Centered (current)
transform: 'translateX(0)',    // Left-aligned
transform: 'translateX(-100%)', // Right-aligned
```

### 5. Opacity and Animation

**Background opacity:**
```tsx
backgroundColor: 'rgba(217, 70, 239, 0.05)', // 5% opacity (current)
backgroundColor: 'rgba(217, 70, 239, 0.1)',  // 10% opacity
backgroundColor: 'rgba(217, 70, 239, 0.15)', // 15% opacity
```

**Transition speed (Tailwind classes):**
```tsx
className="... duration-200 ..." // Current (200ms)
className="... duration-100 ..." // Faster (100ms)
className="... duration-300 ..." // Slower (300ms)
```

## Example Customizations

### Blue Theme Tooltip
```tsx
style={{ 
  backgroundColor: 'rgba(59, 130, 246, 0.05)',
  borderColor: 'rgba(59, 130, 246, 0.05)',
  color: '#3B82F6',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)'
}}
```

### High Contrast Tooltip
```tsx
style={{ 
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  color: '#FFFFFF',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)'
}}
```

### Minimal Tooltip (No Blur)
```tsx
style={{ 
  backgroundColor: 'rgba(217, 70, 239, 0.9)',
  borderColor: 'rgba(217, 70, 239, 1)',
  color: '#FFFFFF',
  backdropFilter: 'none',
  WebkitBackdropFilter: 'none'
}}
```

## Important Notes

1. **Keep both `backdropFilter` and `WebkitBackdropFilter`** - This ensures cross-browser compatibility for the blur effect

2. **RGBA vs Hex colors** - Use `rgba()` for backgrounds/borders when you need transparency, use hex (`#`) for solid text colors

3. **Positioning is dynamic** - The `left`, `top`, and `opacity` values are controlled by the component logic and shouldn't be modified directly

4. **Z-index** - Keep `z-50` or higher to ensure the tooltip appears above other chart elements

5. **Testing** - After making changes, test the tooltip by hovering over the BPM goal line segments in the chart

## Where Tooltips Appear

The tooltip shows up when hovering over the dotted BPM goal line segments in the heart rate chart. It displays different BPM values depending on which segment you hover over:
- Baseline segments: Shows the input BPM goal value
- Elevated segments: Shows the BPM goal value minus 6