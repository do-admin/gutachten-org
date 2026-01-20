import { Metadata } from "next";
import { Suspense } from "react";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageDataWithContent, getCurrentSite } from "@/lib/config";
import { getNextJsMetadata } from "@/lib/metadata-loader";
import { StructuredData } from "@/components/StructuredData";
import multiPageConfig from "@/data/multi-page-config.json";

export async function generateMetadata(): Promise<Metadata> {
  return await getNextJsMetadata("home");
}

export default function Home() {
  const pageData = getPageDataWithContent("home");
  const currentSite = getCurrentSite();
  const siteConfig = multiPageConfig.sites[0];

  // Build base URL
  const baseUrl = siteConfig.domain?.startsWith("http")
    ? siteConfig.domain
    : `https://${siteConfig.domain}`;

  // Build social URLs array
  const socialUrls = [];
  if (siteConfig.social?.facebook) socialUrls.push(siteConfig.social.facebook);
  if (siteConfig.social?.instagram)
    socialUrls.push(siteConfig.social.instagram);
  if (siteConfig.social?.linkedin) socialUrls.push(siteConfig.social.linkedin);

  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <BlockRenderer blocks={pageData.components} />
      {/* </Suspense> */}
    </>
  );
}
