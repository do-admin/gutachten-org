/**
 * Article Loader
 * Loads blog articles from markdown files with frontmatter
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCurrentSite } from "./config";
import { slugifyFilename } from "./slug-utils.mjs";

export interface ArticleMetadata {
  title: string;
  slug: string;
  metaDescription: string;
  metaKeywords: string;
  datePublished: string;
  dateWritten: string;
  isFeatured: string;
  category: string;
  author: string;
  authorImage?: string;
  articleImage?: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}

/**
 * Get the articles directory for the current site
 */
export function getArticlesDirectory(): string {
  const currentSite = getCurrentSite();
  const siteId = currentSite.id || "hausverwaltunghannover";
  return path.join(process.cwd(), "src", "data", siteId, "articles");
}

/**
 * Get all article files
 */
export function getArticleFiles(): string[] {
  const articlesDirectory = getArticlesDirectory();

  // Check if directory exists
  if (!fs.existsSync(articlesDirectory)) {
    console.warn(`Articles directory not found: ${articlesDirectory}`);
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".md"));
}

/**
 * Parse article from markdown file
 */
export function parseArticleFile(filename: string): Article | null {
  try {
    const articlesDirectory = getArticlesDirectory();
    const fullPath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title || !data.slug) {
      console.warn(
        `Article ${filename} is missing required fields (title or slug)`
      );
      return null;
    }

    // Get current site for image paths
    const currentSite = getCurrentSite();
    const siteId = currentSite.id || "hausverwaltunghannover";

    // Construct image paths (slugify filenames for URL safety)
    const authorImage = data["author-image"]
      ? `/images/${siteId}/articles/authors/${slugifyFilename(data["author-image"])}`
      : undefined;

    // Check if article image exists, otherwise use placeholder
    // Prefer WebP format for better performance
    // Note: Files in public/ are slugified during sync, files in src/data/ keep original names
    let articleImage: string = `/images/${siteId}/articles/articleImages/article-placeholder.webp`;
    if (data["article-image"]) {
      const originalImageName = data["article-image"] as string;
      // Slugify the filename (files in public/ are renamed to slugified versions)
      const slugifiedImageName = slugifyFilename(originalImageName);

      // Check if there's a WebP version available
      const webpImageName = originalImageName.replace(
        /\.(png|jpg|jpeg)$/i,
        ".webp"
      );
      const slugifiedWebpName = slugifyFilename(webpImageName);

      // Check public folder first (production) - files here are slugified
      const publicWebpPath = path.join(
        process.cwd(),
        "public",
        "images",
        siteId,
        "articles",
        "articleImages",
        slugifiedWebpName
      );

      const publicOriginalPath = path.join(
        process.cwd(),
        "public",
        "images",
        siteId,
        "articles",
        "articleImages",
        slugifiedImageName
      );

      // Also check src/data location (source location) - files here keep original names
      const dataWebpPath = path.join(
        process.cwd(),
        "src",
        "data",
        siteId,
        "images",
        "articles",
        "articleImages",
        webpImageName
      );

      const dataOriginalPath = path.join(
        process.cwd(),
        "src",
        "data",
        siteId,
        "images",
        "articles",
        "articleImages",
        originalImageName
      );

      // Helper to check file existence with unicode normalization handling
      const fileExistsNormalized = (filePath: string): boolean => {
        // Try direct check first
        if (fs.existsSync(filePath)) return true;

        // On macOS, try checking the directory for normalized matches
        try {
          const dir = path.dirname(filePath);
          const fileName = path.basename(filePath);
          const files = fs.readdirSync(dir);
          // Check both NFC and NFD normalized forms
          const normalizedTarget = fileName.normalize("NFC");
          return files.some(
            (f) =>
              f.normalize("NFC") === normalizedTarget ||
              f.normalize("NFD") === fileName.normalize("NFD")
          );
        } catch {
          return false;
        }
      };

      // Check for desktop/mobile variants (slugified in public/)
      const slugifiedDesktopWebpName = slugifiedWebpName.replace(
        ".webp",
        "-desktop.webp"
      );
      const publicDesktopWebpPath = path.join(
        process.cwd(),
        "public",
        "images",
        siteId,
        "articles",
        "articleImages",
        slugifiedDesktopWebpName
      );

      // Prefer WebP if available, otherwise use original
      // Always return slugified paths (files in public/ are slugified)
      const publicWebpExists = fileExistsNormalized(publicWebpPath);
      const dataWebpExists = fileExistsNormalized(dataWebpPath);
      const publicDesktopWebpExists = fileExistsNormalized(
        publicDesktopWebpPath
      );

      if (publicWebpExists || dataWebpExists) {
        // Return slugified path (public/ files are slugified)
        articleImage = `/images/${siteId}/articles/articleImages/${slugifiedWebpName}`;
      } else if (publicDesktopWebpExists) {
        // Fallback to -desktop version (optimized WebP, slugified)
        articleImage = `/images/${siteId}/articles/articleImages/${slugifiedDesktopWebpName}`;
      } else if (
        fileExistsNormalized(publicOriginalPath) ||
        fileExistsNormalized(dataOriginalPath)
      ) {
        // Return slugified path (public/ files are slugified)
        articleImage = `/images/${siteId}/articles/articleImages/${slugifiedImageName}`;
      } else {
        // If original not found, try alternative extensions (png, jpg, jpeg)
        // This handles cases where markdown specifies .webp but file is .png
        const baseName = originalImageName.replace(
          /\.(webp|png|jpg|jpeg)$/i,
          ""
        );
        const alternativeExtensions = [".png", ".jpg", ".jpeg"];
        let foundAlternative = false;

        for (const ext of alternativeExtensions) {
          const altImageName = `${baseName}${ext}`;
          const slugifiedAltName = slugifyFilename(altImageName);
          const publicAltPath = path.join(
            process.cwd(),
            "public",
            "images",
            siteId,
            "articles",
            "articleImages",
            slugifiedAltName
          );
          const dataAltPath = path.join(
            process.cwd(),
            "src",
            "data",
            siteId,
            "images",
            "articles",
            "articleImages",
            altImageName
          );

          if (
            fileExistsNormalized(publicAltPath) ||
            fileExistsNormalized(dataAltPath)
          ) {
            // Return slugified path (public/ files are slugified)
            articleImage = `/images/${siteId}/articles/articleImages/${slugifiedAltName}`;
            foundAlternative = true;
            break;
          }
        }

        if (!foundAlternative) {
          // Image doesn't exist, use article placeholder
          articleImage = `/images/${siteId}/articles/articleImages/article-placeholder.webp`;
        }
      }
    } else {
      // No article-image specified, use article placeholder
      articleImage = `/images/${siteId}/articles/articleImages/article-placeholder.webp`;
    }

    return {
      title: data.title,
      slug: data.slug,
      metaDescription: data["meta-description"] || "",
      metaKeywords: data["meta-keywords"] || "",
      datePublished: data["date-published"] || "",
      dateWritten: data["date-written"] || "",
      isFeatured: data.isFeatured || "false",
      category: data.category || "",
      author: data.author || "",
      authorImage,
      articleImage,
      content: content.trim(),
    };
  } catch (error) {
    console.error(`Error parsing article file ${filename}:`, error);
    return null;
  }
}

/**
 * Get all articles
 */
export function getAllArticles(): Article[] {
  const articleFiles = getArticleFiles();

  const articles = articleFiles
    .map((filename) => parseArticleFile(filename))
    .filter((article): article is Article => article !== null);

  // Sort by date published (newest first)
  articles.sort((a, b) => {
    const dateA = parseGermanDate(a.datePublished);
    const dateB = parseGermanDate(b.datePublished);
    return dateB.getTime() - dateA.getTime();
  });

  return articles;
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): Article | null {
  const allArticles = getAllArticles();
  return allArticles.find((article) => article.slug === slug) || null;
}

/**
 * Get featured articles
 */
export function getFeaturedArticles(): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.isFeatured === "true");
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: string): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.category === category);
}

/**
 * Parse German date format (dd.MM.yyyy) to Date object
 */
function parseGermanDate(dateString: string): Date {
  if (!dateString) return new Date(0);

  try {
    const [day, month, year] = dateString.split(".");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } catch (error) {
    console.error(`Error parsing date: ${dateString}`, error);
    return new Date(0);
  }
}

/**
 * Get article slugs for static generation
 */
export function getAllArticleSlugs(): string[] {
  const allArticles = getAllArticles();
  return allArticles.map((article) => article.slug);
}
