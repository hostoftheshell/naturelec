# Keystatic Configuration Migration Guide

This guide covers the migration from the monolithic `Collections.tsx` structure to a modular schema organization.

## Overview of Changes

### 1. File Structure Changes

**Before:**

```
src/components/keystatic-components/
├── Collections.tsx (monolithic)
└── ComponentBlocks.tsx
```

**After:**

```
src/components/keystatic-components/
├── index.ts                    # Main exports
├── types.ts                    # TypeScript definitions
├── schemas/
│   ├── shared.ts              # Shared utilities and constants
│   ├── content.ts             # Blog, authors, projects
│   ├── pages.ts               # Services, careers, other pages
│   └── homepage.ts            # All homepage singletons
└── ComponentBlocks.tsx
```

### 2. Collection Name Changes

| Old Name                    | New Name               | Type       | Notes                           |
| --------------------------- | ---------------------- | ---------- | ------------------------------- |
| `heroSection`               | `homepageHeroFR`       | Singleton  | Consistent homepage prefix      |
| `aboutFR`                   | `homepageAboutFR`      | Singleton  | Consistent homepage prefix      |
| `aboutMeFR`                 | `homepageAboutMeFR`    | Singleton  | Consistent homepage prefix      |
| `WarrantyFR`                | `homepageWarrantiesFR` | Singleton  | Fixed typo + consistent naming  |
| `homePageLightboxMarqueeFR` | `homepageGalleryFR`    | Singleton  | Simplified name                 |
| `homePageLocationFR`        | `homepageLocationFR`   | Singleton  | Consistent casing               |
| `FooterFR`                  | `footerFR`             | Singleton  | Consistent casing               |
| `authors`                   | `authorsFR`            | Collection | Added FR suffix for consistency |
| `resumeFR`                  | `resumeFR`             | Singleton  | No change                       |
| `blogFR`                    | `blogFR`               | Collection | No change                       |
| `servicesFR`                | `servicesFR`           | Collection | No change                       |
| `careersFR`                 | `careersFR`            | Collection | No change                       |
| `projectsFR`                | `projectsFR`           | Collection | No change                       |
| `otherPagesFR`              | `otherPagesFR`         | Collection | No change                       |

### 3. Import Changes

**Before:**

```typescript
import Collections from "@/components/keystatic-components/Collections";

// Usage
collections: {
  blogFR: Collections.Blog("fr"),
  authors: Collections.Authors(""),
}
```

**After:**

```typescript
import { createBlog, createAuthors } from "@/components/keystatic-components/schemas/content";

// Usage
collections: {
  blogFR: createBlog("fr"),
  authors: createAuthors(""),
}
```

## Migration Steps

### Step 1: Update Component References

You'll need to update any components that reference the old collection names:

**Before:**

```typescript
// In your Astro components
const heroData = await getEntry('heroSection');
const aboutData = await getEntry('aboutFR');
const authors = await getCollection('authors'); // No change needed
```

**After:**

```typescript
// In your Astro components
const heroData = await getEntry('homepageHeroFR');
const aboutData = await getEntry('homepageAboutFR');  
const authors = await getCollection('authors'); // No change needed
```

### Step 2: Update Content References

If you have any hardcoded references to collection names in your templates or components:

**Before:**

```astro
---
const hero = await getEntry("heroSection");
const about = await getEntry("aboutFR");
const warranties = await getEntry("WarrantyFR");
---
```

**After:**

```astro
---
const hero = await getEntry("homepageHeroFR");
const about = await getEntry("homepageAboutFR");
const warranties = await getEntry("homepageWarrantiesFR");
---
```

### Step 3: Blog Author References - No Changes Needed

The authors collection keeps its original name for compatibility:

✅ **No changes needed** - The `authors` collection name remains the same:
```typescript
// In blog post MDX files or queries - no changes needed
authors: ['author-slug']  // still references 'authors' collection
```

Note: We kept the `authors` collection name unchanged to maintain compatibility with your existing codebase.

### Step 4: Update Type Definitions (Optional)

If you have TypeScript files that reference collection types:

```typescript
// Before
import type { CollectionEntry } from 'astro:content';
type HeroEntry = CollectionEntry<'heroSection'>;
type AboutEntry = CollectionEntry<'aboutFR'>;
type AuthorEntry = CollectionEntry<'authors'>;

// After
import type { CollectionEntry } from 'astro:content';
type HeroEntry = CollectionEntry<'homepageHeroFR'>;
type AboutEntry = CollectionEntry<'homepageAboutFR'>;
type AuthorEntry = CollectionEntry<'authors'>; // No change needed
```

## Benefits of New Structure

### 1. **Modularity**

- Each schema type is in its own file
- Easier to maintain and understand
- Better code organization

### 2. **Consistency**
- All homepage sections use `homepage` prefix
- Language suffixes where appropriate (`FR` for content-specific collections)
- Consistent casing conventions
- Maintained compatibility with existing `authors` collection

### 3. **Reusability**

- Shared utilities reduce duplication
- Common field patterns are centralized
- Easy to add new languages or content types

### 4. **Type Safety**

- Better TypeScript support
- Dedicated types file
- Clear interface definitions

### 5. **Scalability**

- Easy to add new schema types
- Logical grouping by content category
- Reduced cognitive load when working on specific areas

## Troubleshooting

### Issue: "Collection not found" errors

**Cause:** Old collection names still referenced in code
**Solution:** Search for old collection names and update them:

```bash
# Search for old references
grep -r "heroSection" src/
grep -r "aboutFR" src/
grep -r "WarrantyFR" src/
# Note: No need to search for 'authors' - it remains unchanged
```

### Issue: Build errors after migration

**Cause:** Cached content or outdated imports
**Solution:**

1. Clear build cache: `rm -rf .astro/ dist/`
2. Restart dev server: `npm run dev`
3. Check for any remaining old imports

### Issue: Keystatic admin not loading

**Cause:** Schema validation errors
**Solution:**

1. Check browser console for specific errors
2. Verify all imports are correct in `keystatic.config.tsx`
3. Ensure all referenced files exist

### Issue: Content not appearing

**Cause:** Path mismatches between old and new schemas
**Solution:**

1. Check that content files are in the expected locations
2. Verify data format matches (YAML vs JSON)
3. Update any hardcoded paths in your components

## Testing the Migration

1. **Start development server:**

   ```bash
   npm run dev
   ```

2. **Test Keystatic admin:**
   - Navigate to `/admin` or `/keystatic`
   - Verify all collections and singletons appear
   - Try editing a few entries to ensure they save correctly

3. **Test frontend:**
   - Check that all pages load correctly
   - Verify content appears as expected
   - Test any dynamic content queries

4. **Build test:**
   ```bash
   npm run build
   ```

   - Ensure build completes without errors
   - Check generated pages work correctly

## Rollback Plan

If you need to rollback to the old structure:

1. Restore the original `keystatic.config.tsx`
2. Keep the old `Collections.tsx` file (make a backup before migration)
3. Update any component references back to old names
4. Clear cache and restart development server

## Need Help?

- Check the TypeScript types in `types.ts` for reference
- Use the shared utilities in `shared.ts` for consistent field creation
- Refer to existing schemas in each category file for examples
- The legacy default export in `index.ts` provides backward compatibility during transition
