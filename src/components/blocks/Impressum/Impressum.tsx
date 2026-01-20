import React from "react";
import { Heading } from "@/components/blocks/Heading/Heading";

export interface ImpressumSection {
  id: string;
  title: string;
  content: string;
  subsections?: Array<{
    title: string;
    content: string;
  }>;
}

export interface ImpressumProps {
  title?: string;
  subtitle?: string;
  companyInfo?: {
    name?: string;
    legalForm?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    email?: string;
    website?: string;
    taxId?: string;
    vatId?: string;
    commercialRegister?: string;
    court?: string;
    ceo?: string;
    authorizedRepresentatives?: string[];
  };
  sections?: ImpressumSection[];
  className?: string;
}

const Impressum: React.FC<ImpressumProps> = ({
  title = "Impressum",
  subtitle = "Angaben gemäß § 5 TMG",
  companyInfo = {},
  sections = [],
  className = "",
}) => {
  // Default sections if none provided
  const defaultSections: ImpressumSection[] = [
    {
      id: "verantwortlich",
      title: "Verantwortlich für den Inhalt",
      content: `Verantwortlich für den Inhalt dieser Website ist ${companyInfo.name || "das Unternehmen"}.`,
      subsections: [
        {
          title: "Geschäftsführung",
          content: companyInfo.ceo || "Geschäftsführung",
        },
        ...(companyInfo.authorizedRepresentatives || []).map((rep) => ({
          title: "Bevollmächtigte Vertreter",
          content: rep,
        })),
      ],
    },
    {
      id: "kontakt",
      title: "Kontakt",
      content: "Sie können uns unter folgenden Kontaktdaten erreichen:",
    },
    {
      id: "register",
      title: "Handelsregister",
      content: "Unternehmensdaten aus dem Handelsregister:",
      subsections: [
        ...(companyInfo.commercialRegister
          ? [
              {
                title: "Handelsregister",
                content: companyInfo.commercialRegister,
              },
            ]
          : []),
        ...(companyInfo.court
          ? [
              {
                title: "Registergericht",
                content: companyInfo.court,
              },
            ]
          : []),
      ],
    },
    {
      id: "umsatzsteuer",
      title: "Umsatzsteuer-ID",
      content:
        "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:",
      subsections: companyInfo.vatId
        ? [
            {
              title: "USt-IdNr.",
              content: companyInfo.vatId,
            },
          ]
        : [],
    },
    {
      id: "haftung",
      title: "Haftung für Inhalte",
      content:
        "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
      subsections: [
        {
          title: "Haftungsausschluss",
          content:
            "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.",
        },
        {
          title: "Verlinkung",
          content:
            "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.",
        },
      ],
    },
    {
      id: "urheberrecht",
      title: "Urheberrecht",
      content:
        "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.",
      subsections: [
        {
          title: "Nutzung",
          content:
            "Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
        },
        {
          title: "Downloads",
          content:
            "Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.",
        },
      ],
    },
    {
      id: "streitschlichtung",
      title: "Online-Streitbeilegung",
      content:
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.",
      subsections: [
        {
          title: "Verbraucherstreitbeilegung",
          content:
            "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        },
      ],
    },
  ];

  const sectionsToRender = sections.length > 0 ? sections : defaultSections;

  return (
    <div
      className={`container mx-auto max-w-3xl px-4 py-12 ${className}`}
      herokit-id="aa7360d5-40c4-4159-85b2-a179e04fccac"
    >
      {/* Header */}
      <div className="mb-8" herokit-id="37ff340f-9912-426e-b45f-afc6619d16fb">
        <Heading
          level={1}
          className="mb-2 text-left text-2xl font-bold"
          herokit-id="dc7cc70d-6bdd-49ad-a35d-313dbb6dab26"
        >
          {title}
        </Heading>
        {subtitle && (
          <p
            className="text-muted-foreground text-sm"
            herokit-id="317e4aae-29ce-479d-8a6b-1a6040631bff"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Company Information - Grouped together */}
      <div className="mb-8 space-y-6">
        <section>
          <Heading
            level={2}
            className="mb-4 text-left text-xl font-semibold"
            herokit-id="98e74e58-3b0e-4684-83d3-93e725729fbe"
          >
            Angaben gemäß § 5 TMG
          </Heading>
          <div
            className="space-y-3 pl-0"
            herokit-id="9ab3f45f-5bcc-4f9a-b6f7-56ad14decbeb"
          >
            <div herokit-id="be815ce9-6683-4a73-a7c4-03cb9a3feb48">
              <p
                className="font-medium"
                herokit-id="ea31432f-29aa-48f4-903d-cf41e3c5a347"
              >
                {companyInfo.name || "Unternehmensname"}
                {companyInfo.legalForm && ` ${companyInfo.legalForm}`}
              </p>
              {(companyInfo.address ||
                companyInfo.city ||
                companyInfo.postalCode) && (
                <p
                  className="mt-1"
                  herokit-id="2dbd261a-a1f1-4071-b776-b9518f8d0850"
                >
                  {companyInfo.address && (
                    <>
                      {companyInfo.address}
                      <br />
                    </>
                  )}
                  {companyInfo.postalCode && companyInfo.city && (
                    <>
                      {companyInfo.postalCode} {companyInfo.city}
                      <br />
                    </>
                  )}
                  {companyInfo.country || "Deutschland"}
                </p>
              )}
            </div>

            {/* Contact Information - Grouped */}
            {(companyInfo.phone ||
              companyInfo.email ||
              companyInfo.website) && (
              <div
                className="space-y-1"
                herokit-id="8d6129d0-b5b6-4951-9216-ac3c491840cb"
              >
                {companyInfo.phone && (
                  <p herokit-id="6f436f76-0b3e-405c-8622-c4945f1ce494">
                    <span
                      className="font-medium"
                      herokit-id="15d87bd5-10e4-41ca-978f-5350a3d525ca"
                    >
                      Telefon:
                    </span>{" "}
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="underline"
                      herokit-id="df897dc8-060b-42cf-857b-80f3434d6391"
                    >
                      {companyInfo.phone}
                    </a>
                  </p>
                )}
                {companyInfo.email && (
                  <p herokit-id="bf609c8a-4ba7-4d20-a241-a077aa10ca17">
                    <span
                      className="font-medium"
                      herokit-id="bc201ef2-6e1e-43a9-ba04-4a8bffb8bfee"
                    >
                      E-Mail:
                    </span>{" "}
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="underline"
                      herokit-id="5834e512-d17f-4ab9-a6f6-fc24b8015260"
                    >
                      {companyInfo.email}
                    </a>
                  </p>
                )}
                {companyInfo.website && (
                  <p herokit-id="93c47194-ca70-40c8-8e40-5909738d63cb">
                    <span
                      className="font-medium"
                      herokit-id="77fec2d3-fab1-453c-81f4-fd2203f4db95"
                    >
                      Website:
                    </span>{" "}
                    <a
                      href={companyInfo.website}
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      herokit-id="ce1f68e6-02bc-46f5-9894-dd18774c7ca0"
                    >
                      {companyInfo.website}
                    </a>
                  </p>
                )}
              </div>
            )}

            {/* Legal and Registration Information - Grouped */}
            <div
              className="space-y-1"
              herokit-id="1c83e848-bdf6-4d7b-8395-de61d7145250"
            >
              {companyInfo.commercialRegister && (
                <p herokit-id="dd169f8f-3088-4a91-8daa-4800f0ecc4cc">
                  <span
                    className="font-medium"
                    herokit-id="613b5772-0fd4-4575-8d2d-a2a56bbb3efd"
                  >
                    Handelsregister:
                  </span>{" "}
                  {companyInfo.commercialRegister}
                  {companyInfo.court && `, ${companyInfo.court}`}
                </p>
              )}
              {!companyInfo.commercialRegister && companyInfo.court && (
                <p herokit-id="5da40736-a223-4173-aac9-d787a7b00bb8">
                  <span
                    className="font-medium"
                    herokit-id="066ecd4a-3723-4354-b319-2e5048c183ab"
                  >
                    Registergericht:
                  </span>{" "}
                  {companyInfo.court}
                </p>
              )}
              {companyInfo.vatId && (
                <p herokit-id="d4a4693e-5f2c-415b-b2a7-c4bc4fe3381c">
                  <span
                    className="font-medium"
                    herokit-id="ead1fd09-18dd-4e71-9bf7-af254bb60d34"
                  >
                    Umsatzsteuer-ID:
                  </span>{" "}
                  {companyInfo.vatId}
                </p>
              )}
              {companyInfo.taxId && (
                <p herokit-id="a03a0e40-4d16-4c90-886c-0b47e4bd8355">
                  <span
                    className="font-medium"
                    herokit-id="18551fbc-9df2-49a7-b5fd-bd71628cd7a2"
                  >
                    Steuernummer:
                  </span>{" "}
                  {companyInfo.taxId}
                </p>
              )}
            </div>

            {/* Management Information - Grouped */}
            {(companyInfo.ceo || companyInfo.authorizedRepresentatives) && (
              <div
                className="space-y-1"
                herokit-id="a4eaf6d1-775d-4dd8-b52d-0dd3dc271bec"
              >
                {companyInfo.ceo && (
                  <p herokit-id="9b307888-013c-4c81-911f-6885a466e69b">
                    <span
                      className="font-medium"
                      herokit-id="d55d032f-a015-464e-b572-889dd70b99ac"
                    >
                      Geschäftsführung:
                    </span>{" "}
                    {companyInfo.ceo}
                  </p>
                )}
                {companyInfo.authorizedRepresentatives &&
                  companyInfo.authorizedRepresentatives.length > 0 && (
                    <div>
                      <p
                        className="mb-1 font-medium"
                        herokit-id="7826cec2-f8c5-4fd8-af6c-440a4fb9e7a4"
                      >
                        Bevollmächtigte Vertreter:
                      </p>
                      <ul className="ml-4 list-inside list-disc space-y-1">
                        {companyInfo.authorizedRepresentatives.map(
                          (rep, index) => (
                            <li
                              key={index}
                              herokit-id="2cd0ebdf-23cc-4a07-8ff7-dcf5687d7690"
                            >
                              {rep}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Sections - Grouped content */}
      {sectionsToRender.length > 0 && (
        <div
          className="space-y-8"
          herokit-id="670dc811-8c21-4546-916c-de8ee06d4316"
        >
          {sectionsToRender.map((section) => (
            <section key={section.id} className="space-y-4">
              <Heading
                level={2}
                className="text-left text-xl font-semibold"
                herokit-id="d109b7c5-3207-4f04-ac5b-bf6ec0898ad4"
              >
                {section.title}
              </Heading>
              <div
                className="space-y-3 pl-0"
                herokit-id="152a941c-7def-4364-81e3-a67aea8ea10b"
              >
                {section.content && (
                  <p
                    className="leading-relaxed"
                    herokit-id="c0a664c0-8c53-4f65-bee7-8ff95b2a6be8"
                  >
                    {section.content}
                  </p>
                )}

                {section.subsections && section.subsections.length > 0 && (
                  <div
                    className="space-y-2"
                    herokit-id="0dfe9b57-5f65-4fb0-81cb-dc1b68cd3b57"
                  >
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="space-y-1">
                        <p
                          className="leading-relaxed"
                          herokit-id="7c91195f-7a76-48aa-8ccb-90f7981016dd"
                        >
                          {subsection.title && (
                            <span
                              className="font-medium"
                              herokit-id="f75abb3a-e765-4509-b183-2bdcb68f520b"
                            >
                              {subsection.title}:
                            </span>
                          )}{" "}
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Impressum;
