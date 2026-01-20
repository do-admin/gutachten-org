import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, ArrowUpRight, LucideIcon } from "lucide-react";
import {
  getAllArticles,
  getFeaturedArticles,
  Article,
} from "@/lib/article-loader";
import { Heading, HeadingLevel } from "@/components/blocks/Heading/Heading";
import { PaginatedArticles } from "./PaginatedArticles";
import { cn } from "@/lib/utils";
import { DynamicIcon, type LucideIconName } from "@/lib/icon-utils";

export interface RatgeberProps {
  // Variant
  variant?: "top-article" | "grid" | "blog-card";

  // Main content
  title: string;
  subtitle?: string;
  description?: string;

  // Display options
  showFeatured?: boolean;
  showCategories?: boolean;
  showAllArticles?: boolean;
  articlesPerRow?: 2 | 3 | 4;

  // Heading options
  headingLevel?: HeadingLevel;
  showTitle?: boolean;

  // Styling
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  featuredClassName?: string;
  headingClassName?: string;
  authorSectionClassName?: string;
  contentSectionClassName?: string;
  buttonClassName?: string;
  imageContainerClassName?: string;
  baseImageClassName?: string;
  titleClassName?: string;

  // Article filtering
  categoryFilter?: string;
  maxArticles?: number;

  // Content customization
  featuredLabel?: string;
  allArticlesLabel?: string;
  readMoreText?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaIcon?: LucideIcon;

  // TopArticle-style props (for top-artikel variant)
  sectionId?: string;
  baseImage?: string;
  baseImageAlt?: string;
  authorName?: string;
  authorImage?: string;
  authorImageAlt?: string;
  publishDate?: string;
  category?: string;

  // Pagination
  enablePagination?: boolean;
  articlesPerPage?: number;

  // Header CTA Button
  headerCtaButton?: {
    text: string;
    icon?: LucideIconName;
    href?: string;
  };

  // Additional content
  children?: React.ReactNode;
}

export const Ratgeber: React.FC<RatgeberProps> = ({
  variant = "grid",
  title = "Ratgeber",
  subtitle,
  description,
  showFeatured = true,
  showAllArticles = true,
  articlesPerRow = 3,
  headingLevel = 1,
  showTitle = true,
  className = "",
  containerClassName,
  cardClassName = "",
  featuredClassName = "",
  headingClassName,
  authorSectionClassName,
  contentSectionClassName,
  buttonClassName,
  imageContainerClassName,
  baseImageClassName,
  titleClassName,
  categoryFilter,
  maxArticles,
  featuredLabel = "Empfohlener Artikel",
  allArticlesLabel,
  readMoreText = "Artikel lesen",
  enablePagination = false,
  articlesPerPage = 9,
  ctaText = "Mehr lesen",
  ctaLink,
  ctaIcon: CtaIcon = ArrowUpRight,
  sectionId = "ratgeber",
  baseImage,
  baseImageAlt = "Article image",
  authorName,
  authorImage,
  authorImageAlt = "Author avatar",
  publishDate,
  category,
  headerCtaButton,
  children,
}) => {
  // Load articles
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();

  // Apply filters
  let displayArticles = categoryFilter
    ? allArticles.filter((article) => article.category === categoryFilter)
    : allArticles;

  if (maxArticles) {
    displayArticles = displayArticles.slice(0, maxArticles);
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const calculateReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  // Grid columns based on articlesPerRow
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[articlesPerRow];

  // Get featured article for top-artikel variant
  const featuredArticle =
    showFeatured && featuredArticles.length > 0
      ? featuredArticles[0]
      : displayArticles.length > 0
        ? displayArticles[0]
        : null;

  // Top-artikel variant (TopArticle style)
  if (variant === "top-article" && featuredArticle) {
    const articleImage = baseImage || featuredArticle.articleImage;
    const articleTitle = featuredArticle.title;
    const articleDescription = description || featuredArticle.metaDescription;
    const articleCategory = category || featuredArticle.category || "Artikel";
    const articleAuthorName = authorName || "Autor";
    const articlePublishDate = publishDate || featuredArticle.datePublished;
    const articleCtaLink = ctaLink || `/ratgeber/${featuredArticle.slug}`;
    const defaultContainerClass = containerClassName || "container-gutachten";

    return (
      <section
        id={sectionId}
        className={cn("w-full bg-white py-8 md:py-16", className)}
      >
        <div
          className={defaultContainerClass}
          herokit-id="20097a22-a6b0-4c78-9372-64f999349721"
        >
          {/* Section Heading */}
          {showTitle && (
            <h2
              className={cn(
                "text-lg font-normal text-[#273238] md:text-[32px]",
                headingClassName
              )}
              herokit-id="bfae1512-852d-4130-9083-563d6c5b6f41"
            >
              {title}
            </h2>
          )}

          {/* Article Card */}
          <div
            className={cn(
              "mt-10 flex flex-col gap-8 lg:flex-row lg:gap-16",
              cardClassName
            )}
          >
            <div
              className={cn(
                "relative flex flex-shrink-0 overflow-hidden rounded-lg lg:w-[45%]",
                imageContainerClassName
              )}
              herokit-id="866ee270-9e78-409a-bf92-5c6a9c47cce4"
            >
              {articleImage && (
                <img
                  src={articleImage}
                  alt={baseImageAlt || featuredArticle.title}
                  width={624}
                  height={523}
                  loading="eager"
                  fetchPriority="high"
                  className={cn(
                    "h-full w-full object-cover",
                    baseImageClassName
                  )}
                />
              )}
              {/* Category Badge */}
              <div className="absolute top-4 left-4 flex items-center justify-center rounded-full bg-[#CAE5DD] px-3 py-1">
                <span
                  className="text-xs font-semibold text-gray-900 uppercase md:text-sm"
                  herokit-id="7e26c36d-6f97-44c3-b177-03904521ab8a"
                >
                  {articleCategory}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={cn(
                "flex flex-1 flex-col justify-between gap-8",
                contentSectionClassName
              )}
            >
              {/* Author Info */}
              <div
                className={cn(
                  "flex items-center gap-4",
                  authorSectionClassName
                )}
                herokit-id="48bd7dcf-1b2f-4b92-bdb4-da736d732cc6"
              >
                {authorImage ? (
                  <Image
                    src={authorImage}
                    alt={authorImageAlt}
                    loading="lazy"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                )}
                <div className="flex flex-col gap-1">
                  <p
                    className="text-sm font-semibold text-black"
                    herokit-id="e223ff76-18a5-4c2e-a3ee-64e66159a73a"
                  >
                    {articleAuthorName}
                  </p>
                  <p
                    className="text-xs text-[#515A5F]"
                    herokit-id="f19d134d-705f-4505-b6ee-ae348e8a867a"
                  >
                    {articlePublishDate}
                  </p>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-4">
                {/* Title */}
                <Link
                  href={articleCtaLink}
                  className="group"
                  herokit-id="69f6ec06-a8b7-4c7f-b741-b873f5a1fefa"
                >
                  <h3
                    className={cn(
                      "text-lg font-normal text-[#273238] transition-colors hover:text-[#FF985C] md:text-2xl",
                      titleClassName
                    )}
                  >
                    {articleTitle}
                  </h3>
                </Link>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed text-[#515A5F] md:text-base md:leading-7"
                  herokit-id="a870483e-b3a4-46da-81f4-f67de2035b83"
                >
                  {articleDescription}
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-4">
                <Button
                  asChild
                  className={cn(
                    "gap-6 rounded-[8px] border-0 border-t border-[#9999994A] bg-slate-900 px-6 py-6 text-sm font-semibold text-white hover:bg-slate-900/90",
                    "w-full! justify-center! gap-2 md:max-w-max! md:justify-between md:gap-6",
                    buttonClassName
                  )}
                >
                  <Link
                    href={articleCtaLink}
                    herokit-id="eb2b8adf-f8d5-448f-b03d-ebf28039c2de"
                  >
                    {ctaText}
                    <CtaIcon
                      className="h-3 w-3 text-[#FF985C]"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Additional content */}
          {children && (
            <div
              className="mt-12"
              herokit-id="bfd0b3ce-bfaa-477e-aa6f-b5486423213c"
            >
              {children}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Grid variant (existing style)
  const gridContainerClass = containerClassName || "container mx-auto px-4";

  return (
    <div className={`bg-white ${className}`}>
      <div className="py-8">
        <div
          className={gridContainerClass}
          herokit-id="68c6e244-d56c-4ee9-afd6-366c721bfc38"
        >
          {/* Header */}
          {showTitle && (
            <div
              className="mb-12 flex flex-wrap items-center justify-between gap-2 md:gap-4"
              herokit-id="2140d69d-6312-4565-a4b5-38b55366326c"
            >
              <div
                className="space-y-2"
                herokit-id="ab26fe5d-8d1b-4386-8f56-74bc7aa7ddcf"
              >
                <Heading
                  level={headingLevel}
                  className={cn(headingClassName)}
                  herokit-id="89c193f2-f776-49f1-bbf9-fc955e8806b5"
                >
                  {title}
                </Heading>
                {subtitle && (
                  <p
                    className="text-muted-foreground mb-2 text-xl"
                    herokit-id="a0979df3-e856-4b98-9331-7c7caad22ea4"
                  >
                    {subtitle}
                  </p>
                )}
                {description && (
                  <p
                    className="text-muted-foreground mx-auto max-w-3xl text-lg"
                    herokit-id="7d08fa57-256e-45f6-b0b7-7e0a01568a02"
                  >
                    {description}
                  </p>
                )}
              </div>

              {headerCtaButton && (
                <Button
                  asChild
                  className={cn(
                    "flex-shrink-0 gap-2 rounded-[8px] bg-gray-800 !px-4.5 py-6 text-sm font-medium text-white transition-colors hover:bg-gray-900",
                    "w-full! justify-center! gap-2 md:max-w-max! md:justify-between md:gap-6",
                    buttonClassName
                  )}
                >
                  <Link
                    href={headerCtaButton?.href || ctaLink || "/ratgeber"}
                    herokit-id="e194ec06-6ce2-4da1-afcb-750b24669a29"
                  >
                    {headerCtaButton?.text || ""}
                    {headerCtaButton?.icon ? (
                      <DynamicIcon
                        name={headerCtaButton.icon}
                        className="h-4 w-4 text-[#FF914C]"
                      />
                    ) : (
                      CtaIcon && <CtaIcon className="h-4 w-4 text-[#FF985C]" />
                    )}
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* Featured Article */}
          {showFeatured && featuredArticles.length > 0 && (
            <div className="mb-12">
              <h2
                className="font-heading mb-6 text-2xl font-semibold"
                herokit-id="018be488-2c8c-43a3-a55f-8981914c015e"
              >
                {featuredLabel}
              </h2>
              <Card className={`shadow-medium ${featuredClassName}`}>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div
                        className="mb-3 flex items-center gap-2"
                        herokit-id="330a9328-f90e-437f-bef4-755d5c590f82"
                      >
                        {featuredArticles[0].category && (
                          <Badge
                            variant="secondary"
                            herokit-id="75fef5e2-a9e5-4c6c-ba7d-334577445c7a"
                          >
                            {featuredArticles[0].category}
                          </Badge>
                        )}
                        <div
                          className="text-muted-foreground flex items-center text-sm"
                          herokit-id="716b59fa-4943-4026-99a5-63b9423824d4"
                        >
                          <Clock className="mr-1 h-4 w-4" />
                          {calculateReadingTime(
                            featuredArticles[0].content
                          )}{" "}
                          min
                        </div>
                      </div>
                      <h3
                        className="font-heading mb-3 text-2xl font-bold"
                        herokit-id="45a22548-7d1d-4b56-b2b8-a1c6fc720566"
                      >
                        {featuredArticles[0].title}
                      </h3>
                      <p
                        className="text-muted-foreground mb-4"
                        herokit-id="50eb9355-55a1-49aa-a329-bc1ed1f3b7cf"
                      >
                        {featuredArticles[0].metaDescription}
                      </p>
                      <Button asChild variant="default">
                        <Link
                          href={`/ratgeber/${featuredArticles[0].slug}`}
                          herokit-id="f2258fa4-0bbb-45bd-9f64-d6c647c3b313"
                        >
                          {readMoreText} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div
                      className="flex items-center justify-center"
                      herokit-id="c55d0caa-33f5-4a57-97ee-2fbf5a7913f5"
                    >
                      <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                        <Image
                          src={
                            featuredArticles[0].articleImage ||
                            "/images/gutachten-org/articles/articleImages/article-placeholder.webp"
                          }
                          alt={featuredArticles[0].title}
                          width={128}
                          height={128}
                          className="object-cover"
                          sizes="128px"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* All Articles */}
          {showAllArticles && displayArticles.length > 0 && (
            <div herokit-id="73fd61e5-ceaa-4889-b0bf-8467d8bca7c3">
              {allArticlesLabel && (
                <h2
                  className="font-heading mb-6 text-2xl font-semibold"
                  herokit-id="f13b817a-cd59-4496-87c1-ad366b511aa4"
                >
                  {allArticlesLabel}
                </h2>
              )}
              {enablePagination ? (
                <PaginatedArticles
                  articles={displayArticles}
                  articlesPerPage={articlesPerPage}
                  articlesPerRow={articlesPerRow}
                  cardClassName={cardClassName}
                  variant={variant === "top-article" ? "grid" : variant}
                  readMoreText={readMoreText}
                />
              ) : variant === "blog-card" ? (
                <div
                  className={`grid grid-cols-1 ${gridCols} gap-6`}
                  herokit-id="1613e1bf-0e14-4450-8c12-8e1b03e23855"
                >
                  {displayArticles.map((article: Article, index: number) => {
                    const category = article.category || "Artikel";
                    const imageSrc =
                      article.articleImage ||
                      "/images/gutachten-org/articles/articleImages/article-placeholder.webp";
                    const imageAlt = article.title;
                    const authorName = article.author || "Autor";
                    const authorImage = article.authorImage;
                    const authorImageAlt = article.author;
                    const publishDate = article.datePublished;
                    const title = article.title;
                    const excerpt = article.metaDescription;
                    const description = article.metaDescription;
                    const readMoreTextValue = readMoreText || "Mehr lesen";
                    const href = `/ratgeber/${article.slug}`;

                    return (
                      <Link key={index} href={href} className="block">
                        <div
                          className={cn(
                            "flex flex-col gap-6 overflow-hidden rounded-lg bg-white",
                            cardClassName
                          )}
                          herokit-id="cfbfcd6e-a34e-40d8-928b-a2df56e2c28a"
                        >
                          {/* Featured Image Container */}
                          <div className="relative h-48 w-full overflow-hidden bg-gray-200 sm:h-56 md:h-64">
                            <Image
                              src={imageSrc}
                              alt={imageAlt}
                              loading="lazy"
                              width={800}
                              height={450}
                              className="h-full w-full object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 flex items-center justify-center gap-2.5 rounded-full border-0 bg-[#CAE5E2] px-3 py-1">
                              <span
                                className="text-xs leading-[1.2] font-semibold text-[#000000] uppercase sm:text-sm"
                                herokit-id="4ff0951b-9951-465d-abb3-a91f715d984d"
                              >
                                {category}
                              </span>
                            </div>
                          </div>

                          {/* Content Container */}
                          <div className="flex flex-col gap-6 pb-4 sm:pb-6">
                            {/* Author Section */}
                            <div
                              className="flex items-center gap-4"
                              herokit-id="095c5b54-5202-4834-b0aa-47b12b7d1579"
                            >
                              {authorImage && (
                                <Image
                                  src={authorImage}
                                  alt={authorImageAlt || authorName}
                                  loading="lazy"
                                  width={48}
                                  height={48}
                                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                                />
                              )}

                              <div className="flex flex-col gap-0.5">
                                <h3
                                  className="text-sm leading-[1.2] font-semibold text-[#000000]"
                                  herokit-id="1b6b4bd4-e6b0-4da8-a5b3-84badc9671d2"
                                >
                                  {authorName}
                                </h3>
                                <p
                                  className="text-xs leading-[1.2] font-normal text-[#515A5F] sm:text-sm"
                                  herokit-id="fb56aad6-65b7-4b7c-aefb-73eaa633e945"
                                >
                                  {publishDate}
                                </p>
                              </div>
                            </div>

                            {/* Title and Excerpt Section */}
                            <div className="flex flex-col gap-4">
                              {/* Title */}
                              <h2
                                className="hover:text-accent transition-smooth line-clamp-2 text-xl leading-[1.4] font-normal text-[#273238] sm:text-2xl"
                                herokit-id="43f42813-4563-4c13-a6c5-fd8e2b14b577"
                              >
                                {title}
                              </h2>

                              {/* Description/Excerpt */}
                              <p
                                className="line-clamp-2 text-sm leading-[1.5] font-normal text-[#515A5F] sm:text-base"
                                herokit-id="f36ad8c2-0a3e-4074-ae84-00d2749fca97"
                              >
                                {excerpt || description}
                              </p>
                            </div>

                            {/* Read More Link */}
                            <div className="group flex w-fit items-center gap-2 text-sm font-normal text-[#273238] transition-colors hover:text-[#FF985C]">
                              <span herokit-id="aa498f71-75d7-43ed-9aef-c52213bbc8e3">
                                {readMoreTextValue}
                              </span>
                              <ArrowUpRight
                                className="h-4 w-4 text-[#FF985C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 ${gridCols} gap-6`}
                  herokit-id="2ca88c4e-d972-46dd-a1c9-42f98a409a38"
                >
                  {displayArticles.map((article: Article, index: number) => (
                    <Link
                      key={index}
                      href={`/ratgeber/${article.slug}`}
                      className="block"
                    >
                      <Card
                        className={`hover:shadow-medium transition-smooth h-full cursor-pointer overflow-hidden ${cardClassName}`}
                        herokit-id="7823ac45-b89a-4244-81f7-f95f4ec5f4fb"
                      >
                        {/* Article Image */}
                        <div className="relative h-48 w-full">
                          <Image
                            src={
                              article.articleImage ||
                              "/images/gutachten-org/articles/articleImages/article-placeholder.webp"
                            }
                            alt={article.title}
                            width={800}
                            height={450}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                          />
                        </div>

                        <CardHeader>
                          <div
                            className="mb-2 flex items-center justify-between"
                            herokit-id="1c4b9452-309a-4228-8d56-3fc5da690526"
                          >
                            {article.category && (
                              <Badge
                                variant="outline"
                                className="text-xs"
                                herokit-id="2eda25e5-c1c1-43c0-bee2-2813b5cf3d20"
                              >
                                {article.category}
                              </Badge>
                            )}
                            <div
                              className="text-muted-foreground flex items-center text-xs"
                              herokit-id="b89b5e3c-baff-4319-9668-dd0b387bb956"
                            >
                              <Clock className="mr-1 h-3 w-3" />
                              {calculateReadingTime(article.content)} min
                            </div>
                          </div>
                          <CardTitle
                            className="hover:text-accent transition-smooth text-lg leading-tight"
                            herokit-id="e47515b4-48ea-41c7-bbba-dd8ebdcece49"
                          >
                            {article.title}
                          </CardTitle>
                          <CardDescription
                            className="text-sm"
                            herokit-id="a2d4ef38-3785-43bf-99ac-86401d84da66"
                          >
                            {article.metaDescription}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-muted-foreground text-xs"
                              herokit-id="6f851243-a1a1-4d3a-b15b-ba7ac8e1e19d"
                            >
                              {article.datePublished}
                            </span>
                            <div
                              className="text-muted-foreground flex items-center text-xs"
                              herokit-id="ae5cb9a7-052d-4975-84af-a14aa6309e0c"
                            >
                              Lesen <ArrowRight className="ml-1 h-3 w-3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Additional content */}
          {children && (
            <div
              className="mt-12"
              herokit-id="6bd21b0b-b756-4b52-9c34-22b2cb81e981"
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
