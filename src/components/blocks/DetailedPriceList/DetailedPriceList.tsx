import React from "react";
import { Section, Container } from "@/components/ui/section";
import { Heading } from "@/components/blocks/Heading/Heading";
import { cn } from "@/lib/utils";

export interface PriceItem {
  sizeRange: string;
  price: string;
  note?: string;
  className?: string;
  sizeRangeClassName?: string;
  priceClassName?: string;
  noteClassName?: string;
}

export interface ExtraService {
  title: string;
  price: string;
  description?: string;
  recommended?: boolean;
  optional?: boolean;
  className?: string;
  titleClassName?: string;
  priceClassName?: string;
  descriptionClassName?: string;
  badgeClassName?: string;
}

export interface VolumeDiscount {
  threshold: string;
  discount: string;
  note?: string;
  className?: string;
  thresholdClassName?: string;
  discountClassName?: string;
}

export interface DetailedPriceListProps {
  sectionId?: string;
  title: string;
  introText?: string;
  basePricesTitle?: string;
  basePrices: PriceItem[];
  basePricesNote?: string;
  basePricesWarningText?: string;
  extrasTitle?: string;
  extras: ExtraService[];
  extrasNote?: string;
  extrasWarningText?: string;
  notesTitle?: string;
  notesText?: string;
  discountsTitle?: string;
  discounts: VolumeDiscount[];
  discountsNote?: string;
  // Section styling
  className?: string;
  sectionClassName?: string;
  containerClassName?: string;
  backgroundClassName?: string;
  // Title section styling
  titleClassName?: string;
  introTextClassName?: string;
  titleContainerClassName?: string;
  // Base prices section styling
  basePricesSectionClassName?: string;
  basePricesTitleClassName?: string;
  basePricesTableClassName?: string;
  basePricesTableHeaderClassName?: string;
  basePricesTableRowClassName?: string;
  basePricesTableCellClassName?: string;
  basePricesNoteClassName?: string;
  basePricesWarningTextClassName?: string;
  // Extras section styling
  extrasSectionClassName?: string;
  extrasTitleClassName?: string;
  extrasListClassName?: string;
  extrasItemClassName?: string;
  extrasNoteClassName?: string;
  extrasWarningTextClassName?: string;
  // Notes section styling
  notesSectionClassName?: string;
  notesTitleClassName?: string;
  notesTextClassName?: string;
  // Discounts section styling
  discountsSectionClassName?: string;
  discountsTitleClassName?: string;
  discountsListClassName?: string;
  discountsItemClassName?: string;
  discountsNoteClassName?: string;
}

export const DetailedPriceList: React.FC<DetailedPriceListProps> = ({
  sectionId = "detailed-price-list",
  title,
  introText,
  basePricesTitle = "Grundpreise je nach Objektgröße (Wohn- und Nutzfläche)",
  basePrices,
  basePricesNote,
  basePricesWarningText,
  extrasTitle = "Zubuchbare Extras",
  extras,
  extrasNote,
  extrasWarningText,
  notesTitle = "Hinweise zur Erstellung",
  notesText,
  discountsTitle = "Mengenrabatte*",
  discounts,
  discountsNote,
  // Section styling
  className,
  sectionClassName,
  containerClassName,
  backgroundClassName = "bg-white",
  // Title section styling
  titleClassName,
  introTextClassName,
  titleContainerClassName,
  // Base prices section styling
  basePricesSectionClassName,
  basePricesTitleClassName,
  basePricesTableClassName,
  basePricesTableHeaderClassName,
  basePricesTableRowClassName,
  basePricesTableCellClassName,
  basePricesNoteClassName,
  basePricesWarningTextClassName,
  // Extras section styling
  extrasSectionClassName,
  extrasTitleClassName,
  extrasListClassName,
  extrasItemClassName,
  extrasNoteClassName,
  extrasWarningTextClassName,
  // Notes section styling
  notesSectionClassName,
  notesTitleClassName,
  notesTextClassName,
  // Discounts section styling
  discountsSectionClassName,
  discountsTitleClassName,
  discountsListClassName,
  discountsItemClassName,
  discountsNoteClassName,
}) => {
  return (
    <Section
      id={sectionId}
      className={cn(
        "py-16 md:py-[120px]",
        backgroundClassName,
        sectionClassName,
        className
      )}
    >
      <Container
        className={cn("mx-auto max-w-7xl", containerClassName)}
        herokit-id="3689a792-fb76-4c66-a0a9-e5f57ecbe369"
      >
        {/* Title Section */}
        <div
          className={cn("mb-12 md:mb-16", titleContainerClassName)}
          herokit-id="c2a1cb1f-0a84-41be-b54f-85d0aa731757"
        >
          <Heading
            level={2}
            className={cn(
              "mb-6 text-2xl leading-[144%] font-medium text-[#273238] md:mb-8 md:text-[32px]",
              titleClassName
            )}
            herokit-id="99810f45-35a0-4495-ba7f-8ecb9d938d28"
          >
            {title}
          </Heading>
          {introText && (
            <p
              className={cn(
                "text-sm leading-[144%] font-normal whitespace-pre-line text-[#515A5F]",
                introTextClassName
              )}
              herokit-id="17b35396-8b96-41de-9f88-648a29be177f"
            >
              {introText}
            </p>
          )}
        </div>

        {/* Base Prices Section */}
        <div
          className={cn("mb-16 md:mb-20", basePricesSectionClassName)}
          herokit-id="3d5571f0-20c9-4074-b270-2423d0e3bb99"
        >
          <Heading
            level={3}
            className={cn(
              "mb-6 text-left text-xl leading-[144%] font-medium text-[#273238] md:text-2xl",
              basePricesTitleClassName
            )}
            herokit-id="eab86f6d-4344-4d36-8a90-2eb057a0fb9e"
          >
            {basePricesTitle}
          </Heading>
          <div className={cn("overflow-x-auto", basePricesTableClassName)}>
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className={cn(
                    "border-b border-[rgba(39,50,56,0.1)]",
                    basePricesTableHeaderClassName
                  )}
                >
                  <th
                    className="px-4 py-4 text-left text-sm font-semibold text-[#273238]"
                    herokit-id="ce20d8c6-65a6-4aba-a7e1-b8d83a646419"
                  >
                    Größe (M²)
                  </th>
                  <th
                    className="px-4 py-4 text-right text-sm font-semibold text-[#273238]"
                    herokit-id="ec5098e5-f6c8-4f36-992f-52b6ec36d0c4"
                  >
                    Preis
                  </th>
                </tr>
              </thead>
              <tbody>
                {basePrices.map((item, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "border-b border-[rgba(39,50,56,0.1)] last:border-b-0",
                      basePricesTableRowClassName,
                      item.className
                    )}
                  >
                    <td
                      className={cn(
                        "px-4 py-4 text-sm font-normal text-[#273238]",
                        basePricesTableCellClassName,
                        item.sizeRangeClassName
                      )}
                      herokit-id="13124e8b-8d60-4aaa-839a-330bc4835078"
                    >
                      {item.sizeRange}
                    </td>
                    <td
                      className={cn(
                        "px-4 py-4 text-right text-sm font-semibold text-[#273238]",
                        basePricesTableCellClassName,
                        item.priceClassName
                      )}
                      herokit-id="110e1185-6bf2-4c6e-9e09-10b46bdb2333"
                    >
                      {item.price}
                      {item.note && (
                        <span
                          className={cn(
                            "ml-1 text-xs font-normal text-[#515A5F]",
                            item.noteClassName
                          )}
                          herokit-id="edffaa4f-1cb4-48e2-9bdf-41f61092110c"
                        >
                          {item.note}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {basePricesNote && (
            <p
              className={cn(
                "mt-4 text-xs leading-[144%] font-normal whitespace-pre-line text-[#515A5F]",
                basePricesNoteClassName
              )}
              herokit-id="2ac07c7d-22b1-4b8e-a310-0dc7c139dff3"
            >
              {basePricesNote}
            </p>
          )}
          {basePricesWarningText && (
            <p
              className={cn(
                "mt-4 text-xs leading-[144%] font-normal whitespace-pre-line text-[#515A5F]",
                basePricesWarningTextClassName
              )}
              herokit-id="3cac1098-cae2-4275-ac8f-0c8819ae4d81"
            >
              {basePricesWarningText}
            </p>
          )}
        </div>

        {/* Extras Section */}
        <div
          className={cn("mb-16 md:mb-20", extrasSectionClassName)}
          herokit-id="e91b32ff-ae7b-40f1-b471-73e210c009e5"
        >
          <Heading
            level={3}
            className={cn(
              "mb-6 text-left text-xl leading-[144%] font-medium text-[#273238] md:text-2xl",
              extrasTitleClassName
            )}
            herokit-id="b090ec5a-d2a9-46dc-bc1d-a138027d5e96"
          >
            {extrasTitle}
          </Heading>
          <div
            className={cn("space-y-6", extrasListClassName)}
            herokit-id="f03024e6-6170-4350-8c99-fa33bbfd825a"
          >
            {extras.map((extra, index) => (
              <div
                key={index}
                className={cn(
                  "border-b border-[rgba(39,50,56,0.1)] pb-6 last:border-b-0 last:pb-0",
                  extrasItemClassName,
                  extra.className
                )}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div
                    className="flex-1"
                    herokit-id="f77f79ac-2cde-447c-8d73-6ee2650daa38"
                  >
                    <div
                      className="mb-2 flex flex-wrap items-start gap-2"
                      herokit-id="21dcf918-4d2a-4a07-bff6-6919c8b9dd84"
                    >
                      <h4
                        className={cn(
                          "text-base leading-[144%] font-medium text-[#273238]",
                          extra.titleClassName
                        )}
                        herokit-id="f5af4684-7c3a-47d0-bd7d-89a1e318216f"
                      >
                        {extra.title}
                      </h4>
                      {extra.recommended && (
                        <span
                          className={cn(
                            "inline-flex h-7 items-center gap-2 rounded-[8px] border border-[#FF985C] px-2",
                            "text-xs leading-[144%] font-semibold text-[#273238] uppercase",
                            "bg-gradient-to-b from-white to-white",
                            "bg-[linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, rgba(255, 152, 92, 0) 0%, rgba(255, 152, 92, 0.1) 100%)]",
                            extra.badgeClassName
                          )}
                          herokit-id="0271dfe9-5190-404f-8cbe-51cf7a7481a9"
                        >
                          EMPFOHLEN
                        </span>
                      )}
                      {extra.optional && (
                        <span
                          className={cn(
                            "inline-flex items-center rounded px-2 py-1 text-xs font-medium text-[#515A5F]",
                            extra.badgeClassName
                          )}
                          herokit-id="acb5ffc0-b5a7-4f37-8a0b-126a882151fb"
                        >
                          Optional
                        </span>
                      )}
                    </div>
                    {extra.description && (
                      <p
                        className={cn(
                          "text-sm leading-[144%] font-normal whitespace-pre-line text-[#515A5F]",
                          extra.descriptionClassName
                        )}
                        herokit-id="591116a0-77a2-4b01-96f4-3c70aa66d4f1"
                      >
                        {extra.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right md:ml-4">
                    <div
                      className={cn(
                        "text-lg leading-[144%] font-semibold text-[#273238]",
                        extra.priceClassName
                      )}
                      herokit-id="399298d6-7d25-4bbd-8b86-8a0b90c1851c"
                    >
                      {extra.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {extrasNote && (
            <p
              className={cn(
                "mt-6 text-xs leading-[144%] font-normal whitespace-pre-line text-[#515A5F]",
                extrasNoteClassName
              )}
              herokit-id="7e933bea-03ae-4ce5-a286-3360a9aceec8"
            >
              {extrasNote}
            </p>
          )}
          {extrasWarningText && (
            <p
              className={cn(
                "mt-4 text-xs leading-[144%] font-normal whitespace-pre-line text-[#515A5F]",
                extrasWarningTextClassName
              )}
              herokit-id="9bc55b6d-ba5f-43a8-bac8-50c05c08fd9c"
            >
              {extrasWarningText}
            </p>
          )}
        </div>

        {/* Notes Section */}
        {notesText && (
          <div className={cn("mb-16 md:mb-20", notesSectionClassName)}>
            <Heading
              level={3}
              className={cn(
                "mb-6 text-left text-xl leading-[144%] font-medium text-[#273238] md:text-2xl",
                notesTitleClassName
              )}
              herokit-id="ddfeebdf-f008-44ed-8789-f01c67dbeb14"
            >
              {notesTitle}
            </Heading>
            <p
              className={cn(
                "text-sm leading-[144%] font-normal whitespace-pre-line text-[#515A5F]",
                notesTextClassName
              )}
              herokit-id="5af6823b-f1f1-4a5a-b4c4-6531cc273aac"
            >
              {notesText}
            </p>
          </div>
        )}

        {/* Volume Discounts Section */}
        {discounts.length > 0 && (
          <div
            className={discountsSectionClassName}
            herokit-id="ee301507-119a-4a8e-8c88-947441948973"
          >
            <Heading
              level={3}
              className={cn(
                "mb-6 text-left text-xl leading-[144%] font-medium text-[#273238] md:text-2xl",
                discountsTitleClassName
              )}
              herokit-id="e1f0929c-46fb-435c-9f89-a5d4f9cad878"
            >
              {discountsTitle}
            </Heading>
            <div
              className={cn("space-y-4", discountsListClassName)}
              herokit-id="36805010-30ce-4828-8d1c-621a68280636"
            >
              {discounts.map((discount, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between border-b border-[rgba(39,50,56,0.1)] py-3 last:border-b-0",
                    discountsItemClassName,
                    discount.className
                  )}
                >
                  <span
                    className={cn(
                      "text-base leading-[144%] font-normal text-[#273238]",
                      discount.thresholdClassName
                    )}
                    herokit-id="74e3d777-550e-45b2-8208-d0fcd5457ef2"
                  >
                    {discount.threshold}
                  </span>
                  <span
                    className={cn(
                      "text-base leading-[144%] font-semibold text-[#273238]",
                      discount.discountClassName
                    )}
                    herokit-id="182d2395-8d23-4b6d-b97f-2f1e85aa6b3a"
                  >
                    {discount.discount}
                  </span>
                </div>
              ))}
            </div>
            {discountsNote && (
              <p
                className={cn(
                  "mt-4 text-xs leading-[144%] font-normal whitespace-pre-line text-[#515A5F]",
                  discountsNoteClassName
                )}
                herokit-id="299762d6-a8c9-4cbd-afaa-b975a27c8873"
              >
                {discountsNote}
              </p>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default DetailedPriceList;
