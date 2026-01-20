import React from "react";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  Article,
} from "@/lib/article-loader";
import MarkdownRenderer from "@/lib/MarkdownRenderer";
import { StructuredData } from "@/components/StructuredData";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getCurrentSite } from "@/lib/config";
import { LeadForm } from "@/components/blocks/LeadForm";
import { Ratgeber } from "@/components/blocks/Ratgeber/Ratgeber";
import { getImagePath } from "@/lib/site-config-helper";
import { TableOfContents } from "@/components/blocks/TableOfContents";
import { extractHeadings } from "@/lib/extract-headings";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}

type ArticleVariant = "default" | "minimalist";

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel nicht gefunden",
    };
  }

  const currentSite = getCurrentSite();
  const siteUrl = currentSite.domain?.startsWith("https://www.")
    ? currentSite.domain
    : `https://www.${currentSite.domain || "gutachten.org"}`;
  const canonicalUrl = `${siteUrl}/ratgeber/${article.slug}/`;

  // Ensure title is max 60 characters
  const title =
    article.title.length > 60
      ? `${article.title.substring(0, 57)}...`
      : article.title;

  // Ensure description is max 155 characters
  const description =
    article.metaDescription.length > 155
      ? `${article.metaDescription.substring(0, 152)}...`
      : article.metaDescription;

  // Get article image URL for OG/Twitter (article.articleImage is already slugified from article-loader.ts)
  const articleImageUrl = article.articleImage
    ? article.articleImage.startsWith("http")
      ? article.articleImage
      : `${siteUrl}${article.articleImage}`
    : `${siteUrl}/images/gutachten-org/articles/articleImages/article-placeholder.webp`;

  return {
    title: `${title}`,
    description,
    keywords: article.metaKeywords,
    authors: [{ name: "Gutachten.org" }],
    creator: "Gutachten.org",
    publisher: "Gutachten.org",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Gutachten.org`,
      description,
      url: canonicalUrl,
      siteName: "Gutachten.org",
      locale: "de_DE",
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateWritten,
      authors: [article.author],
      images: [
        {
          url: articleImageUrl,
          width: 1200,
          height: 630,
          alt: `${article.title} - Ratgeber für Immobiliengutachten von Gutachten.org`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Gutachten.org`,
      description,
      images: [
        {
          url: articleImageUrl,
          width: 1200,
          height: 630,
          alt: `${article.title} - Ratgeber für Immobiliengutachten von Gutachten.org`,
        },
      ],
    },
  };
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

// Format German date
function formatGermanDate(dateString: string): string {
  if (!dateString) return "";

  try {
    const [day, month, year] = dateString.split(".");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

// Convert German date to ISO format
function germanDateToISO(dateString: string): string {
  if (!dateString) return new Date().toISOString();

  try {
    const [day, month, year] = dateString.split(".");
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    ).toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}

export default async function ArticlePage({
  params,
  searchParams,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const readingTime = calculateReadingTime(article.content);
  const formattedDate = formatGermanDate(article.datePublished);
  const currentSite = getCurrentSite();
  const siteUrl = currentSite.domain?.startsWith("http")
    ? currentSite.domain
    : `https://${currentSite.domain || "gutachten.org"}`;
  const articleUrl = `${siteUrl}/ratgeber/${article.slug}`;
  // Article image URL for meta tags (article.articleImage is already slugified from article-loader.ts)
  const articleImageUrl = article.articleImage
    ? article.articleImage.startsWith("http")
      ? article.articleImage
      : `${siteUrl}${article.articleImage}`
    : `${siteUrl}/images/gutachten-org/og-image/gutachten-org-og.webp`;

  // Article image path for Image component (article.articleImage is already slugified from article-loader.ts)
  const articleImagePath = article.articleImage
    ? article.articleImage
    : "/images/gutachten-org/articles/articleImages/article-placeholder.webp";

  // Prepare publisher logo data
  const publisherLogo = currentSite.logo?.light
    ? {
        url: `${siteUrl}${currentSite.logo.light}`,
      }
    : undefined;

  // Format date for minimalist variant (DD.MM.YYYY)
  const simpleDate = article.datePublished || "";

  // Check if current site is gutachten-org
  const isGutachtenOrg = currentSite.id === "gutachten-org";

  return (
    <>
      {/* Structured Data for Article (includes breadcrumb) */}
      <StructuredData
        type="article"
        data={{
          headline: article.title,
          description: article.metaDescription,
          image: articleImageUrl,
          author: {
            "@type": "Person",
            name: article.author,
            url: siteUrl,
            ...(article.authorImage && { image: article.authorImage }),
          },
          publisher: {
            name: currentSite.name,
            url: siteUrl,
            logo: publisherLogo,
          },
          datePublished: germanDateToISO(article.datePublished),
          dateModified: germanDateToISO(
            article.dateWritten || article.datePublished
          ),
          articleSection: article.category || "Ratgeber",
          url: articleUrl,
          articleType: "BlogPosting",
          inLanguage: "de-DE",
          wordCount: article.content.split(/\s+/).length,
          keywords: article.metaKeywords,
          breadcrumb: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Ratgeber",
              item: `${siteUrl}/ratgeber`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
            },
          ],
        }}
      />
      {isGutachtenOrg ? (
        <GutachtenOrgArticleLayout
          article={article}
          formattedDate={formattedDate}
          simpleDate={simpleDate}
          readingTime={readingTime}
          articleImageUrl={articleImageUrl}
          articleImagePath={articleImagePath}
          currentSite={currentSite}
          siteUrl={siteUrl}
        />
      ) : (
        <MinimalistArticleLayout
          article={article}
          formattedDate={formattedDate}
          simpleDate={simpleDate}
          readingTime={readingTime}
          articleImageUrl={articleImageUrl}
          articleImagePath={articleImagePath}
        />
      )}
    </>
  );
}

// Gutachten.org specific layout matching the reference design exactly
function GutachtenOrgArticleLayout({
  article,
  formattedDate,
  simpleDate,
  readingTime,
  articleImageUrl,
  articleImagePath,
  currentSite,
  siteUrl,
}: {
  article: Article;
  formattedDate: string;
  simpleDate: string;
  readingTime: number;
  articleImageUrl?: string;
  articleImagePath: string;
  currentSite: any;
  siteUrl: string;
}) {
  const headings = extractHeadings(article.content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area - Two Column Layout: TOC Left, Content Right */}
      <div className="bg-gray-50 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 lg:pt-20">
        <div className="container-gutachten px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[320px_1fr]">
            {/* Left Sidebar - Table of Contents (Sticky) */}
            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <TableOfContents
                  headings={headings}
                  title="Themenübersicht"
                  stickyTop="top-24"
                  titleClassName="mb-4 font-sans text-lg font-bold text-gray-900"
                  containerClassName="rounded-lg bg-white p-6 shadow-sm"
                  listClassName="font-sans"
                  linkBaseClassName="inline-block font-sans text-sm leading-relaxed transition-colors"
                  activeHeadingClassName="font-semibold text-gray-900 text-base"
                  inactiveHeadingClassName="font-normal text-[#526E68]! hover:text-gray-900 text-base"
                  scrollOffset={100}
                />
              </aside>
            )}

            {/* Right Column - Main Content */}
            <div className="min-w-0 overflow-x-hidden">
              {/* Article Content */}
              <article>
                <div className="prose prose-sm sm:prose-base md:prose-lg prose-gray prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:text-left prose-h2:text-lg prose-h2:mb-3 prose-h2:mt-6 prose-h2:font-bold sm:prose-h2:text-xl prose-h3:text-base prose-h3:mb-2 prose-h3:mt-4 prose-h3:font-bold sm:prose-h3:text-lg prose-p:text-sm prose-p:leading-6 prose-p:text-gray-700 prose-p:mb-4 prose-p:text-left sm:prose-p:text-base sm:prose-p:leading-7 sm:prose-p:mb-6 md:prose-p:text-lg md:prose-p:leading-8 md:prose-p:text-justify prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-4 prose-ul:pl-4 sm:prose-ul:my-6 sm:prose-ul:pl-6 prose-li:text-sm prose-li:leading-6 prose-li:text-gray-700 prose-li:mb-2 sm:prose-li:text-base sm:prose-li:leading-7 md:prose-li:text-lg md:prose-li:leading-8 prose-blockquote:border-l-[3px] prose-blockquote:border-orange-500 prose-blockquote:pl-4 prose-blockquote:pr-3 prose-blockquote:py-2 prose-blockquote:my-6 prose-blockquote:text-sm prose-blockquote:text-gray-700 prose-blockquote:bg-transparent prose-blockquote:font-normal sm:prose-blockquote:pl-6 sm:prose-blockquote:pr-4 sm:prose-blockquote:py-3 sm:prose-blockquote:my-8 sm:prose-blockquote:text-base prose-img:my-6 prose-img:rounded-none prose-img:max-w-full prose-img:h-auto sm:prose-img:my-8 prose-figcaption:text-xs prose-figcaption:text-gray-500 prose-figcaption:text-left prose-figcaption:mt-2 sm:prose-figcaption:text-sm prose-table:my-6 prose-table:w-full prose-table:overflow-x-auto sm:prose-table:my-8 max-w-none">
                  {/* Category tag - rounded badge with uppercase text */}
                  {article.category &&
                    article.category !== "Keine Kategorie" &&
                    article.category !== "keine" && (
                      <Badge
                        variant="secondary"
                        className="mb-4 !rounded-full bg-[#CAE5DD] px-3 py-1 text-xs font-semibold text-gray-900 uppercase sm:mb-6 md:text-sm"
                        id="835ba4d5-eac0-4244-8cb1-c763e333537b"
                      >
                        {article.category === "Ratgeber"
                          ? "RATGEBER"
                          : article.category.toUpperCase()}
                      </Badge>
                    )}

                  {/* Article title - large, bold, left-aligned */}
                  <h1 className="font-heading mb-4 text-2xl leading-tight !font-normal tracking-tight text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                    {article.title}
                  </h1>

                  {/* Author info with image, name, and date as live link */}
                  {article.author && (
                    <Link
                      href={`/ratgeber/${article.slug}`}
                      className="mb-4 flex flex-wrap items-center gap-2 text-xs font-normal text-gray-500 transition-colors hover:text-gray-700 sm:mb-6 sm:text-sm md:text-base"
                    >
                      {article.authorImage ? (
                        <div className="relative h-4 w-4 flex-shrink-0 overflow-hidden rounded-full sm:h-5 sm:w-5">
                          <Image
                            src={article.authorImage}
                            alt={article.author}
                            width={20}
                            height={20}
                            className="object-cover"
                            sizes="20px"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <User className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
                      )}
                      <span className="text-gray-700">{article.author}</span>
                      {" - "}
                      <span>{simpleDate}</span>
                    </Link>
                  )}

                  {/* Meta description as intro paragraph - directly in article content */}
                  {article.metaDescription && (
                    <p className="mb-4 text-left text-sm leading-6 text-gray-700 sm:mb-6 sm:text-base sm:leading-7 md:text-justify md:text-lg md:leading-8">
                      {article.metaDescription}
                    </p>
                  )}

                  {article.articleImage && (
                    <div className="mb-6 sm:mb-8 md:mb-6">
                      <div className="mx-auto w-full max-w-full sm:max-w-4xl">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={articleImagePath}
                            alt={article.title}
                            width={1200}
                            height={675}
                            className="w-full object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                            loading="eager"
                            priority
                            id="fc7cc963-cb46-43dd-a885-26bcc6c41529"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Table of Contents - shown only on mobile */}
                  {headings.length > 0 && (
                    <div className="mb-6 sm:mb-8 lg:hidden">
                      <TableOfContents
                        headings={headings}
                        title="Themenübersicht"
                        stickyTop=""
                        className="!static"
                        titleClassName="mb-3 font-sans text-base font-bold text-gray-900 sm:mb-4 sm:text-lg"
                        containerClassName="rounded-lg bg-white p-4 shadow-sm sm:p-6"
                        listClassName="font-sans"
                        linkBaseClassName="inline-block font-sans text-xs leading-relaxed transition-colors sm:text-sm"
                        activeHeadingClassName="font-semibold text-gray-900 text-base sm:text-lg"
                        inactiveHeadingClassName="font-normal text-[#526E68] hover:text-gray-900 text-sm sm:text-base"
                        scrollOffset={100}
                      />
                    </div>
                  )}
                  <MarkdownRenderer content={article.content} />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Posts Section - Ähnliche Beiträge */}
      <div className="bg-white">
        <SimilarPostsSection
          currentArticle={article}
          title="Ähnliche Artikel"
          buttonText="Alle anzeigen"
          buttonIcon="ArrowUpRight"
        />
      </div>

      {/* Contact Form Section - Sie haben Fragen? */}
      <div className="bg-gray-50">
        <ContactFormSection />
      </div>
    </div>
  );
}

// Minimalist variant matching the reference design from gutachten.org
function MinimalistArticleLayout({
  article,
  formattedDate,
  simpleDate,
  readingTime,
  articleImageUrl,
  articleImagePath,
}: {
  article: Article;
  formattedDate: string;
  simpleDate: string;
  readingTime: number;
  articleImageUrl?: string;
  articleImagePath: string;
}) {
  const headings = extractHeadings(article.content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header - Full width */}
      <div className="bg-white px-4 py-8 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:py-20">
        <div className="container-gutachten">
          <div className="mx-auto max-w-7xl">
            {/* Category tag - rounded badge with uppercase text */}
            {article.category &&
              article.category !== "Keine Kategorie" &&
              article.category !== "keine" && (
                <Badge
                  variant="secondary"
                  className="mb-4 !rounded-md bg-teal-200 px-3 py-1 text-xs font-semibold text-gray-900 uppercase sm:mb-6 md:text-sm"
                  id="835ba4d5-eac0-4244-8cb1-c763e333537b"
                >
                  {article.category === "Ratgeber"
                    ? "RATGEBER"
                    : article.category.toUpperCase()}
                </Badge>
              )}

            {/* Article title - large, bold, left-aligned */}
            <h1 className="font-heading mb-4 text-2xl leading-tight font-bold tracking-tight text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {article.title}
            </h1>

            {/* Author info - format with dashes */}
            {article.author && (
              <div className="mb-0 flex flex-wrap items-center gap-2 text-xs font-normal text-gray-500 sm:text-sm md:text-base">
                <User className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
                <span className="text-gray-700">{article.author}</span>
                {" - "}
                <span>{simpleDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area - Two Column Layout: TOC Left, Content Right */}
      <div className="bg-gray-50 pb-12 sm:pb-16 md:pb-20">
        <div className="container-gutachten px-4 sm:px-6">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-8 sm:gap-8 sm:py-12 md:grid-cols-[280px_1fr] md:gap-12 lg:grid-cols-[320px_1fr]">
            {/* Left Sidebar - Table of Contents (Sticky) */}
            {headings.length > 0 && (
              <aside className="hidden md:block">
                <TableOfContents
                  headings={headings}
                  title="Themenübersicht"
                  stickyTop="top-24"
                  titleClassName="mb-4 text-base font-bold text-gray-900"
                  containerClassName="rounded-lg bg-white p-6 shadow-sm"
                  scrollOffset={100}
                />
              </aside>
            )}

            {/* Right Column - Main Content */}
            <div className="min-w-0 overflow-x-hidden">
              {/* Mobile Table of Contents - shown only on mobile */}
              {headings.length > 0 && (
                <div className="mb-6 sm:mb-8 md:hidden">
                  <TableOfContents
                    headings={headings}
                    title="Themenübersicht"
                    stickyTop=""
                    className="!static"
                    titleClassName="mb-3 text-sm font-bold text-gray-900 sm:mb-4 sm:text-base"
                    containerClassName="rounded-lg bg-white p-4 shadow-sm sm:p-6"
                    scrollOffset={100}
                  />
                </div>
              )}

              {/* Meta description as intro paragraph - no heading */}
              {article.metaDescription && (
                <div className="mb-6 sm:mb-8 md:mb-12">
                  <div className="prose prose-sm sm:prose-base prose-gray prose-p:text-sm prose-p:leading-6 prose-p:text-gray-700 prose-p:mb-3 prose-p:text-left sm:prose-p:text-base sm:prose-p:leading-7 sm:prose-p:mb-4 md:prose-p:text-lg md:prose-p:leading-8 md:prose-p:text-justify max-w-none">
                    <p>{article.metaDescription}</p>
                  </div>
                </div>
              )}

              {/* Article Content */}
              <article>
                <div className="prose prose-sm sm:prose-base md:prose-lg prose-gray prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:text-left prose-h1:text-2xl prose-h1:mb-6 prose-h1:mt-8 sm:prose-h1:text-3xl sm:prose-h1:mb-8 sm:prose-h1:mt-10 md:prose-h1:text-4xl md:prose-h1:mt-12 prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-6 sm:prose-h2:text-2xl sm:prose-h2:mb-5 sm:prose-h2:mt-8 md:prose-h2:text-3xl md:prose-h2:mb-6 md:prose-h2:mt-10 prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-4 sm:prose-h3:text-xl sm:prose-h3:mb-4 sm:prose-h3:mt-6 md:prose-h3:text-2xl md:prose-h3:mt-8 prose-p:text-sm prose-p:leading-6 prose-p:text-gray-700 prose-p:mb-4 prose-p:text-left sm:prose-p:text-base sm:prose-p:leading-7 sm:prose-p:mb-5 md:prose-p:text-lg md:prose-p:leading-8 md:prose-p:mb-6 md:prose-p:text-justify prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-4 prose-ul:pl-4 sm:prose-ul:my-5 sm:prose-ul:pl-5 md:prose-ul:my-6 md:prose-ul:pl-6 prose-li:text-sm prose-li:leading-6 prose-li:text-gray-700 prose-li:mb-2 sm:prose-li:text-base sm:prose-li:leading-7 md:prose-li:text-lg md:prose-li:leading-8 prose-blockquote:border-l-[3px] prose-blockquote:border-orange-500 prose-blockquote:pl-4 prose-blockquote:pr-3 prose-blockquote:py-2 prose-blockquote:my-4 prose-blockquote:text-sm prose-blockquote:text-gray-700 prose-blockquote:bg-transparent prose-blockquote:font-normal sm:prose-blockquote:pl-5 sm:prose-blockquote:pr-3.5 sm:prose-blockquote:py-2.5 sm:prose-blockquote:my-6 sm:prose-blockquote:text-base md:prose-blockquote:pl-6 md:prose-blockquote:pr-4 md:prose-blockquote:py-3 md:prose-blockquote:my-8 prose-img:my-6 prose-img:rounded-none prose-img:max-w-full prose-img:h-auto sm:prose-img:my-8 prose-figcaption:text-xs prose-figcaption:text-gray-500 prose-figcaption:text-left prose-figcaption:mt-2 sm:prose-figcaption:text-sm prose-table:my-6 prose-table:w-full prose-table:overflow-x-auto sm:prose-table:my-8 max-w-none">
                  <MarkdownRenderer content={article.content} />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Posts Section - Ähnliche Beiträge */}
      <div className="bg-white">
        <SimilarPostsSection
          currentArticle={article}
          title="Ähnliche Artikel"
          buttonText="Alle anzeigen"
          buttonIcon="ArrowUpRight"
        />
      </div>

      {/* Contact Form Section - Sie haben Fragen? */}
      <div className="bg-gray-50">
        <ContactFormSection />
      </div>
    </div>
  );
}

// Similar Posts Section Component - Uses existing Ratgeber component with custom header
function SimilarPostsSection({
  currentArticle,
  title = "Ähnliche Beiträge",
  buttonText = "Alle Beiträge",
  buttonIcon = "ArrowUpRight",
}: {
  currentArticle: Article;
  title?: string;
  buttonText?: string;
  buttonIcon?: string;
}) {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 md:py-16">
      {/* Use existing Ratgeber component with blog-card variant */}
      <Ratgeber
        variant="blog-card"
        title={title}
        showTitle={true}
        showFeatured={false}
        // showAllArticles={true}
        articlesPerRow={3}
        headingLevel={2}
        readMoreText="Mehr lesen"
        articlesPerPage={2}
        categoryFilter={
          currentArticle.category &&
          currentArticle.category !== "Keine Kategorie" &&
          currentArticle.category !== "keine"
            ? currentArticle.category
            : undefined
        }
        maxArticles={4}
        containerClassName="container-gutachten !px-0"
        headerCtaButton={{
          text: buttonText,
          icon: buttonIcon as any,
          href: "/ratgeber",
        }}
        headingClassName="text-start text-[#243239] text-lg sm:text-xl md:text-2xl"
        cardClassName="pt-0"
        className="!p-0"
      />
    </div>
  );
}

// Contact Form Section Component - Uses existing LeadForm component
function ContactFormSection() {
  // LeadForm configuration (shared with ratgeber.ts)
  const leadFormConfig = {
    title: "Sie haben Fragen?",
    subtitle: "Wir haben antworten.",
    variant: "image-form" as const,
    imageSrc: getImagePath("/images/{{siteId}}/ratgeber/felix-holfert.webp"),
    imageAlt: "Kontaktformular",
    sections: [
      {
        fields: [
          {
            id: "name",
            name: "name",
            label: "Name",
            type: "text" as const,
            placeholder: "Name",
            inputClassName: "form-input-base h-14 sm:h-16",
            required: true,
          },
          {
            id: "email",
            name: "email",
            label: "E-Mail Adresse",
            type: "email" as const,
            placeholder: "E-Mail Adresse",
            inputClassName: "form-input-base form-input-accent h-14 sm:h-16",
            required: true,
          },
          {
            id: "phone",
            name: "phone",
            label: "Telefonnummer",
            type: "tel" as const,
            placeholder: "Telefonnummer",
            inputClassName: "form-input-base h-14 sm:h-16",
          },
          {
            id: "concern",
            name: "concern",
            label: "Anliegen",
            type: "select" as const,
            placeholder: "Bitte wählen Sie ihr Anliegen aus",
            inputClassName: "form-input-base h-14 text-gray-900 sm:h-16",
            options: [
              { value: "restnutzungsdauer", label: "Restnutzungsdauer" },
              { value: "kaufpreisaufteilung", label: "Kaufpreisaufteilung" },
              { value: "wertermittlung", label: "Wertermittlung" },
              {
                value: "verkehrswertgutachten",
                label: "Verkehrswertgutachten",
              },
              { value: "steuerberatung", label: "Steuerberatung" },
              { value: "preise", label: "Preise" },
              { value: "schadensgutachten", label: "Schadensgutachten" },
              {
                value: "problem mit Finanzamt",
                label: "Problem mit Finanzamt",
              },
              { value: "sonstiges", label: "Sonstiges" },
            ],
            required: true,
          },
          {
            id: "message",
            name: "message",
            label: "Ihr Anliegen",
            type: "textarea" as const,
            placeholder: "Ihr Anliegen (optional)",
            rows: 5,
            inputClassName:
              "form-input-base font-primary min-h-32 resize-none sm:min-h-40",
          },
        ],
      },
    ],
    submitButtonText: "Absenden",
    submitButtonColor: "#FF914C",
    privacyFieldId: "privacy",
    privacyLinkUrl: "/datenschutz",
    privacyLinkText: "Datenschutzerklärung",
    privacyText:
      "Mit Absenden des Formulars willige ich in die Verarbeitung meiner Daten gemäß der Datenschutzerklärung ein. Diese Einwilligung kann ich jederzeit widerrufen.",
    privacyLinkColor: "#CC4400",
    className: "mb-0",
  };

  return (
    <div>
      <div>
        <LeadForm
          {...leadFormConfig}
          containerClassName="container-gutachten"
          privacyCheckboxClassName="data-[state=checked]:bg-slate-900!"
        />
      </div>
    </div>
  );
}

// Default variant (existing layout)
function DefaultArticleLayout({
  article,
  formattedDate,
  readingTime,
  articleImageUrl,
  articleImagePath,
}: {
  article: Article;
  formattedDate: string;
  readingTime: number;
  articleImageUrl?: string;
  articleImagePath: string;
}) {
  return (
    <>
      {/* Article Header */}
      <div className="border-b bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Back button */}
            <div className="mb-8">
              <Link
                href="/ratgeber"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
                id="d44fd42c-8539-4228-b303-bd4d7008a9a2"
              >
                <ArrowLeft
                  className="h-5 w-5"
                  id="88a12c11-b9db-4df0-8e82-964d7122f3f8"
                />
                <span>Zurück zum Ratgeber</span>
              </Link>
            </div>

            {/* Article meta information */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              {article.category &&
                article.category !== "Keine Kategorie" &&
                article.category !== "keine" && (
                  <Badge
                    variant="secondary"
                    id="0ab205a3-1ec7-41cb-8ebd-e845aa68889f"
                  >
                    {article.category}
                  </Badge>
                )}
              {article.isFeatured === "true" && (
                <Badge
                  variant="default"
                  id="15c9dcdf-10b5-4242-b946-67fe69dfeaae"
                >
                  Empfohlen
                </Badge>
              )}
              <div className="text-muted-foreground flex items-center gap-2">
                <Calendar
                  className="h-4 w-4"
                  id="e99347e2-bd22-4d6d-b68f-ee59f17c7e60"
                />
                <span className="text-sm">{formattedDate}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2">
                <Clock
                  className="h-4 w-4"
                  id="f5b3eff0-ad17-403c-96cc-08d5933c7e84"
                />
                <span className="text-sm">{readingTime} Min. Lesezeit</span>
              </div>
            </div>

            {/* Article title */}
            <h1 className="font-heading text-foreground mb-6 text-3xl font-bold md:text-5xl">
              {article.title}
            </h1>

            {/* Article description */}
            {article.metaDescription && (
              <p className="text-muted-foreground text-xl leading-relaxed">
                {article.metaDescription}
              </p>
            )}

            {/* Author information */}
            {article.author && (
              <div className="mt-8 flex items-center gap-3 border-t pt-8">
                {article.authorImage && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={`${article.authorImage}`}
                      alt={article.author}
                      width={48}
                      height={48}
                      className="object-cover"
                      sizes="48px"
                      loading="lazy"
                      id="87c1b5fa-8e8b-4d05-8e6e-62b9659792e3"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    {!article.authorImage && (
                      <User
                        className="h-4 w-4"
                        id="def2012b-4c37-447f-a094-8b81a53c6801"
                      />
                    )}
                    <span className="text-foreground font-medium">
                      {article.author}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">Autor</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article featured image */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={articleImagePath}
              alt={article.title}
              width={1200}
              height={400}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              loading="lazy"
              id="7ad389d5-3f10-4239-8391-8d95f7dc28df"
            />
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <article className="mx-auto max-w-4xl">
            <MarkdownRenderer content={article.content} />
          </article>
        </div>
      </div>

      {/* Article footer / Related articles CTA */}
      <div className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading mb-4 text-2xl font-bold md:text-3xl">
              Weitere Artikel entdecken
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Entdecke weitere hilfreiche Artikel und Tipps in unserem Ratgeber
            </p>
            <Link
              href="/ratgeber"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
              id="0a07591e-bd2b-448d-894f-1217e7fbaa02"
            >
              <span>Alle Artikel anzeigen</span>
              <ArrowLeft
                className="h-5 w-5 rotate-180"
                id="d12d2ced-91c3-466d-8ed9-7838a7fa9771"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
