// utils/slug.ts
export function slugifyTitle(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with dashes
      .replace(/^-+|-+$/g, '');    // Trim starting/ending dashes
  }
  