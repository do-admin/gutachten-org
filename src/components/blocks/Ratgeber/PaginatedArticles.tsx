"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { Article } from "@/lib/article-loader";
import { Pagination } from "@/components/blocks/Pagination/Pagination";
import { cn } from "@/lib/utils";

interface PaginatedArticlesProps {
  articles: Article[];
  articlesPerPage: number;
  articlesPerRow: 2 | 3 | 4;
  cardClassName?: string;
  variant?: "grid" | "blog-card";
  readMoreText?: string;
}

export const PaginatedArticles: React.FC<PaginatedArticlesProps> = ({
  articles,
  articlesPerPage,
  articlesPerRow,
  cardClassName = "",
  variant = "grid",
  readMoreText = "Mehr lesen",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current page from URL search params on initial load, default to 1
  // This runs once when component mounts to read the initial page from URL
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Handle page change - just update URL params, no scrolling
  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }
      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      // Update URL without scrolling
      router.replace(url, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Validate and cap current page
  const validatedPage = useMemo(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      return totalPages;
    }
    return currentPage;
  }, [currentPage, totalPages]);

  // Redirect to page 1 if current page is out of bounds
  // Only check once on mount/params change, not trigger scrolling
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      handlePageChange(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPages]);

  // Get articles for current page
  const paginatedArticles = useMemo(() => {
    const startIndex = (validatedPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return articles.slice(startIndex, endIndex);
  }, [articles, validatedPage, articlesPerPage]);

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

  return (
    <>
      <div
        className={`grid grid-cols-1 ${gridCols} gap-6`}
        herokit-id="880073ad-0710-4be4-8368-365c306968ce"
      >
        {paginatedArticles.map((article: Article, index: number) => {
          // Blog-card variant
          if (variant === "blog-card") {
            const category = article.category || "Artikel";
            const imageSrc = article.articleImage;
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
              <Link
                key={`${article.slug}-${index}`}
                href={href}
                className="block"
              >
                <div
                  className={cn(
                    "flex flex-col gap-6 overflow-hidden rounded-lg bg-white",
                    cardClassName
                  )}
                  herokit-id="433b761c-e5b5-48ba-91e1-e0d15c4ab159"
                >
                  {/* Featured Image Container */}
                  {imageSrc && (
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
                          herokit-id="a55920a7-5fbe-4b42-aaca-30927830d70c"
                        >
                          {category}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content Container */}
                  <div className="flex flex-col gap-6 pb-4 sm:pb-6">
                    {/* Author Section */}
                    <div
                      className="flex items-center gap-4"
                      herokit-id="98a2cf7e-3cdf-4f4b-b340-19effeb79a73"
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
                          herokit-id="ecae5e5c-4034-4217-8b5b-244610d7d13d"
                        >
                          {authorName}
                        </h3>
                        <p
                          className="text-xs leading-[1.2] font-normal text-[#515A5F] sm:text-sm"
                          herokit-id="c8130aea-662f-4022-b881-f318e47807ea"
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
                        herokit-id="a75fffb1-534b-41ff-952c-1d0dc255511d"
                      >
                        {title}
                      </h2>

                      {/* Description/Excerpt */}
                      <p
                        className="line-clamp-2 text-sm leading-[1.5] font-normal text-[#515A5F] sm:text-base"
                        herokit-id="936a0b46-d261-4581-8851-397628c60c3f"
                      >
                        {excerpt || description}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="group flex w-fit items-center gap-2 text-sm font-normal text-[#273238] transition-colors hover:text-[#FF985C]">
                      <span herokit-id="827eb66a-790f-4494-bd8e-79b8db27085b">
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
          }

          // Grid variant (default)
          return (
            <Link
              key={`${article.slug}-${index}`}
              href={`/ratgeber/${article.slug}`}
              className="block"
            >
              <Card
                className={`hover:shadow-medium transition-smooth h-full cursor-pointer overflow-hidden ${cardClassName}`}
                herokit-id="389088bb-6276-4b53-b204-185c47fce525"
              >
                {/* Article Image */}
                {article.articleImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.articleImage}
                      alt={article.title}
                      width={800}
                      height={450}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                )}

                <CardHeader>
                  <div
                    className="mb-2 flex items-center justify-between"
                    herokit-id="155c3c8f-7faa-4c65-907c-c61b4a840b88"
                  >
                    {article.category && (
                      <Badge
                        variant="outline"
                        className="text-xs"
                        herokit-id="bfe40153-bf0e-4955-a7ef-48a6ac539bc7"
                      >
                        {article.category}
                      </Badge>
                    )}
                    <div
                      className="text-muted-foreground flex items-center text-xs"
                      herokit-id="643ec673-0f4e-424e-9569-1c1866aea0a8"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {calculateReadingTime(article.content)} min
                    </div>
                  </div>
                  <CardTitle
                    className="hover:text-accent transition-smooth text-lg leading-tight"
                    herokit-id="ffbcf926-466a-4169-aac1-f311349a2b8d"
                  >
                    {article.title}
                  </CardTitle>
                  <CardDescription
                    className="text-sm"
                    herokit-id="f0f47e3b-2823-4feb-b4e3-b64ebf033ee7"
                  >
                    {article.metaDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-muted-foreground text-xs"
                      herokit-id="3cbb895a-1cf1-44d2-831f-f211ca2fed1a"
                    >
                      {article.datePublished}
                    </span>
                    <div
                      className="text-muted-foreground flex items-center text-xs"
                      herokit-id="2cbf34b6-6f44-4c65-8f15-f8218cb02f45"
                    >
                      Lesen <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Pagination - only show if enablePagination is true and totalPages > 1 */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center px-2 sm:mt-16 sm:px-4 md:mt-[120px]">
          <div className="w-full max-w-full sm:max-w-none">
            <Pagination
              currentPage={validatedPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
