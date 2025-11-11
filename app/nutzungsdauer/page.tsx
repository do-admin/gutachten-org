import Image from 'next/image';
import Link from 'next/link';

export default function NutzungsdauerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-light-neutral">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-light-neutral border-b border-dark-neutral/10">
        <div className="container mx-auto px-16 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="171" height="22" viewBox="0 0 171 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 7.45033C2 7.34638 2.05125 7.25166 2.13732 7.19203L12.4359 0.0576242C12.5502 -0.0215528 12.7031 -0.0189131 12.8145 0.0641626L21.1903 6.30869C21.3565 6.43261 21.362 6.67761 21.2016 6.80875L18.7502 8.81208C18.6349 8.90633 18.4691 8.90961 18.3501 8.82L12.8123 4.65164C12.702 4.56862 12.5504 4.56472 12.4359 4.64195L5.68317 9.1967C5.59518 9.25605 5.54254 9.35459 5.54254 9.45994V18.1768C5.54254 18.3528 5.68673 18.4954 5.86459 18.4954H12.8392C12.9108 18.4954 12.9804 18.4718 13.0369 18.4283L17.162 15.2543C17.2588 15.1798 17.2056 15.0263 17.0829 15.0263H13.9158C13.738 15.0263 13.5938 14.8836 13.5938 14.7077V12.1589C13.5938 11.983 13.738 11.8403 13.9158 11.8403H22.6779C22.8558 11.8403 23 11.983 23 12.1589V21.6814C23 21.8574 22.8558 22 22.6779 22H19.7937C19.6158 22 19.4716 21.8574 19.4716 21.6814V17.9932C19.4716 17.8854 19.3448 17.8263 19.2608 17.8949L14.3272 21.927C14.2694 21.9742 14.1969 22 14.122 22H2.32205C2.14419 22 2 21.8631 2 21.6872C2 20.0234 2 12.1138 2 7.45033Z" fill="#273238"/>
              <path d="M38.5219 20.7779C33.0105 20.7779 31 17.2716 31 13.2348C31 9.19799 32.6341 4.79955 38.8371 4.79955C43.5438 4.79955 45.5646 7.60758 45.5646 9.80518H42.5755C42.4178 8.62255 41.6747 7.46513 38.8371 7.46513C34.735 7.46513 33.8013 10.213 33.8013 13.2348C33.8013 16.2566 34.8571 18.1774 38.657 18.1774C41.4044 18.1774 42.2437 16.2195 42.2437 15.595H38.657V13.2039H45.6322V20.6164H43.1385V18.3327C42.2827 19.809 40.909 20.7779 38.5219 20.7779Z" fill="#273238"/>
              <path d="M51.5503 20.7002C47.7444 20.7002 47.0012 18.5549 47.0012 15.2102V8.84872H49.8327V15.3947C49.8327 17.5169 50.6824 18.1459 52.2259 18.1459C53.7243 18.1459 54.7091 17.4246 54.7091 15.2794V8.84872H57.6082V20.5387H55.0443V18.8318C54.6165 19.6853 54.1401 20.7002 51.5503 20.7002Z" fill="#273238"/>
              <path d="M65.9888 20.631C62.1829 20.8617 60.584 19.939 60.584 17.1478V11.1902H58.94V8.84872H60.584V4.78378H63.3929V8.84872H66.9225L65.9888 11.1902H63.4605V17.1478C63.4605 18.2551 64.4228 18.2843 65.9888 18.169V20.631Z" fill="#273238"/>
              <path d="M71.2574 20.7002C68.7802 20.7002 67.1587 19.2042 67.1587 16.7129C67.1587 14.5446 68.3504 13.3919 71.4886 13.3919C73.1461 13.3919 74.754 13.3919 74.754 13.3919C74.6865 11.9325 74.1864 11.2399 72.6926 11.1902C71.6186 11.1545 70.4514 11.479 70.4514 12.4089H67.8759C67.8759 10.4419 69.0834 8.84872 72.6701 8.84872C76.443 8.84872 77.688 10.6428 77.688 13.8261V20.5387H75.1202V18.7625C74.5797 19.6852 73.6445 20.7002 71.2574 20.7002ZM69.7511 16.7129C69.7511 17.7971 70.6433 18.169 71.8654 18.169C73.2512 18.169 74.754 17.7003 74.754 15.6473V15.2782C74.754 15.2782 73.2527 15.2782 71.9555 15.2782C70.4514 15.2782 69.7511 15.7902 69.7511 16.7129Z" fill="#273238"/>
              <path d="M84.7062 20.7002C80.1572 20.7002 79.3732 18.2751 79.1971 15.1117C79.0112 11.774 80.2022 8.84872 84.6612 8.84872C88.1743 8.84872 89.7336 10.4393 89.7336 13.3919H87.1388C86.9812 12.0478 86.1386 11.479 84.6913 11.479C82.6809 11.479 82.1186 12.805 82.1186 15.0886C82.1186 16.8479 83.0277 18.0998 84.6387 18.0998C86.086 18.0998 86.9812 17.6092 87.1388 16.3804H89.7336C89.7336 18.8087 88.2419 20.7002 84.7062 20.7002Z" fill="#273238"/>
              <path d="M91.0459 20.5387V4.78378H93.8774V10.2045C94.3278 9.35102 95.3412 8.84872 97.0812 8.84872C100.842 8.84872 101.608 10.7581 101.608 14.1491V20.5387H98.7538V13.9184C98.7538 12.6604 98.3935 11.121 96.4056 11.121C94.9072 11.121 93.9224 11.6808 93.9224 13.9184L93.8774 20.5387H91.0459Z" fill="#273238"/>
              <path d="M115.858 20.7002C111.219 20.7002 110.071 17.7706 110.071 14.6104C110.071 11.4502 111.845 8.84872 115.505 8.84872C119.295 8.84872 121.038 11.2399 120.571 15.2782H113.037C113.037 17.4568 114.105 18.0998 115.972 18.0998C117.139 18.0998 117.84 17.6959 118.049 16.9172H120.571C120.368 18.924 119.007 20.7002 115.858 20.7002ZM113.06 13.3919H117.84C117.862 12.2554 117.11 11.1902 115.505 11.1902C114.187 11.1902 113.172 11.6618 113.06 13.3919Z" fill="#273238"/>
              <path d="M133.947 20.5387V17.7245H137.238V20.5387H133.947Z" fill="#273238"/>
              <path d="M143.771 20.7002C139.244 20.7002 138.073 17.7706 138.073 14.6335C138.073 11.5194 139.267 8.56672 143.793 8.56672C148.275 8.56672 149.513 11.5194 149.513 14.6335C149.513 17.7937 148.275 20.7002 143.771 20.7002ZM140.995 14.6335C140.995 16.3928 141.58 18.1742 143.771 18.1742C146.006 18.1742 146.592 16.4389 146.592 14.6335C146.592 12.9203 146.051 11.1374 143.793 11.1374C141.58 11.1374 140.995 12.8972 140.995 14.6335Z" fill="#273238"/>
              <path d="M150.961 20.5387V8.56672H153.556V10.366C154.254 8.84353 154.857 8.42832 156.906 8.56672V11.1374C154.49 11.1374 153.837 11.5424 153.837 14.3105V20.5387H150.961Z" fill="#273238"/>
              <path d="M165.462 22C165.462 21.2504 165.161 20.9634 163.127 21.0435C159.027 21.205 157.058 20.9694 157.058 18.4133C157.058 17.3291 157.913 16.2943 159.197 15.9945C157.891 15.3024 157.463 14.1952 157.463 12.8573C157.463 8.7282 161.607 8.56672 163.116 8.56672H168.543V11.1374H166.746C167.213 11.3765 167.845 11.9976 167.845 13.2033C167.845 15.3486 166.899 16.9864 162.8 17.1017C160.413 17.1709 160.009 17.638 160.092 18.1742C160.234 19.0788 162.079 18.5123 163.138 18.4133C165.695 18.1742 168.73 18.567 168.73 22H165.462ZM160.385 13.0187C160.385 13.8554 161.324 14.5875 162.643 14.5875C163.893 14.5875 164.878 13.9015 164.878 12.9495C164.878 12.1591 164.428 11.1374 162.643 11.1374C160.88 11.1374 160.385 12.136 160.385 13.0187Z" fill="#273238"/>
              <path d="M109.436 20.631C105.63 20.8617 104.031 19.939 104.031 17.1478V11.1902H102.387V8.84872H104.031V4.78378H106.84V8.84872H110.37L109.436 11.1902H106.908V17.1478C106.908 18.2551 107.87 18.2843 109.436 18.169V20.631Z" fill="#273238"/>
              <path d="M128.1 8.84872C131.439 8.84872 132.649 10.7283 132.649 14.0731V20.5551H129.817V13.8886C129.817 11.7664 128.967 11.1374 127.424 11.1374C125.926 11.1374 124.941 11.8586 124.941 14.0039V20.5551L122.042 20.5551V8.74452H124.606V10.4515C125.033 9.59802 125.51 8.84872 128.1 8.84872Z" fill="#273238"/>
            </svg>
          </div>

          <nav className="flex items-center gap-6">
            <Link href="/nutzungsdauer" className="px-4 py-2.5 rounded-lg bg-cadetblue text-dark-neutral text-sm font-medium flex items-center gap-2">
              Nutzungsdauer
              <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                <path d="M2.27241 1H10.0504V8.778M9.17041 1.879L2.02441 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </Link>
            <Link href="/" className="px-4 py-2.5 text-dark-neutral text-sm font-medium">
              Immobilienbewertung
            </Link>
            <Link href="/ratgeber" className="px-4 py-2.5 text-dark-neutral text-sm font-medium">
              Ratgeber
            </Link>
            <Link href="/geschaeftskunden" className="px-4 py-2.5 text-dark-neutral text-sm font-medium">
              Für Geschäftskunden
            </Link>
            <button className="px-4.5 py-2 bg-gutachten-accent text-dark-neutral text-sm font-semibold rounded-lg">
              Kostenlose Ersteinschätzung
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-[645px] border-b border-dark-neutral/10">
        <div className="flex-1 px-16 py-16 flex flex-col justify-between border-r border-dark-neutral/10">
          <div className="w-[170px] h-[170px]" />
          
          <div className="flex items-center gap-6">
            <Image src="/company-logos/logo1.svg" alt="Certification" width={79} height={73} className="h-[73px] w-auto" />
            <Image src="/company-logos/logo2.svg" alt="Certification" width={55} height={73} className="h-[73px] w-auto" />
            <Image src="/company-logos/logo3.svg" alt="Certification" width={73} height={73} className="h-[73px] w-auto" />
            <Image src="/company-logos/logo4.svg" alt="Certification" width={73} height={73} className="h-[73px] w-auto" />
          </div>

          <div className="flex flex-col gap-10 max-w-[528px]">
            <div className="text-chocolate text-sm font-semibold uppercase tracking-tight">
              Nutzungsdauer
            </div>
            <h1 className="text-dark-neutral font-sora text-[32px] font-semibold leading-[64px]">
              Nutzungsdauergutachten – jetzt Restnutzungsdauer prüfen und Steuern sparen
            </h1>
            <p className="text-dark-gray text-sm leading-[180%] tracking-tight">
              Kostenfreie Ersteinschätzung für Eigentümer und Investoren
            </p>
          </div>
        </div>

        <div className="flex-1 relative bg-gradient-to-b from-[rgba(143,181,170,0.5)] to-[rgba(143,181,170,0.5)]">
          <div className="absolute inset-0 bg-[url('https://api.builder.io/api/v1/image/assets/TEMP/6f01b4daf53b2b1e694f089be1ab2849322bfe72?width=1440')] bg-cover bg-center mix-blend-multiply" />
          
          <div className="absolute bottom-[133px] right-6 left-[448px] flex justify-center">
            <div className="bg-white rounded-2xl p-4 shadow-lg max-w-[248px] flex flex-col gap-6">
              <Image 
                src="https://api.builder.io/api/v1/image/assets/TEMP/d9e2a0036d1e124833081df515f1700398c45237?width=432"
                alt="Felix Holfert"
                width={216}
                height={184}
                className="rounded-lg w-full"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-dark-neutral font-sora text-xl font-semibold leading-[144%]">
                  Felix Holfert
                </h3>
                <p className="text-dark-gray text-sm leading-[180%] tracking-tight">
                  Gutachter nach <br />DIN EN ISO / IEC 17024
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-16 right-16">
            <div className="text-dark-neutral font-inter text-base font-medium leading-[180%] tracking-tight">
              Scroll
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex flex-col">
        {/* Section 1: Weniger Steuern zahlen */}
        <section className="bg-white px-16 py-30 flex gap-2">
          <div className="flex-1">
            <Image 
              src="https://api.builder.io/api/v1/image/assets/TEMP/ddbc3003a422b39c62ee1aab0c4e6f8856718e35?width=1312"
              alt="Building exterior"
              width={656}
              height={720}
              className="rounded-lg border border-dark-neutral/20 w-full h-auto"
            />
          </div>
          <div className="flex-1 px-16 flex flex-col gap-10">
            <div className="max-w-[516px] flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <h2 className="text-dark-neutral font-sora text-[32px] font-medium leading-[144%]">
                  Weniger Steuern zahlen – mehr Netto pro Jahr sichern
                </h2>
              </div>
              <div className="text-dark-gray text-base leading-[180%] tracking-tight">
                In Deutschland werden die meisten vermieteten Immobilien pauschal über 50 Jahre abgeschrieben - unabhängig von Zustand oder Baujahr. In der Realität haben viele Gebäude jedoch eine <span className="text-[#FC7019]">deutlich kürzere Restnutzungsdauer</span>, besonders ältere oder teilsanierte Objekte.
                <br /><br />
                Genau hier setzt unser <span className="text-[#FC7019]">Nutzungsdauergutachten</span> an. Es zeigt auf, wie lange Ihre Immobilie tatsächlich noch wirtschaftlich genutzt werden kann und dient als fundierte Grundlage gegenüber dem Finanzamt. So können Sie Ihre <span className="text-[#FC7019]">Abschreibung beschleunigen</span>, Ihre Steuerlast senken und Ihre Rendite nachhaltig steigern.
              </div>
              <button className="bg-dark-neutral text-light-neutral px-4.5 py-2 rounded-lg font-semibold text-sm flex items-center gap-6 w-fit">
                Kostenlose Erstberatung
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Steuerliche Abschreibung optimieren */}
        <section className="bg-white px-16 py-30 flex gap-2">
          <div className="flex-1 px-16 flex flex-col gap-10">
            <div className="max-w-[516px] flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <h2 className="text-dark-neutral font-sora text-[32px] font-medium leading-[144%]">
                  Steuerliche Abschreibung optimieren - mit Nachweis der verkürzten Restnutzungsdauer
                </h2>
              </div>
              <div className="text-dark-gray text-base leading-[180%] tracking-tight">
                Viele Eigentümer wissen gar nicht, dass sich durch eine verkürzte Restnutzungsdauer <span className="text-[#FC7019]">erhebliche steuerliche Vorteile</span> ergeben können. Bereits wenige Jahre Unterschied machen einen deutlichen Effekt in der jährlichen Steuerbilanz aus.
                <br /><br />
                Unsere nach <span className="text-[#FC7019]">DIN ISO/IEC 17024 zertifizierten Sachverständigen</span> erstellen die Gutachten so, dass sie <span className="text-[#FC7019]">steuerlich anerkannt</span> sind und reibungslos beim Finanzamt eingebracht werden können. Dabei legen wir größten Wert auf <span className="text-[#FC7019]">Nachvollziehbarkeit, Plausibilität</span> und eine <span className="text-[#FC7019]">transparente Dokumentation</span> aller Einflussfaktoren.
              </div>
              <button className="bg-dark-neutral text-light-neutral px-4.5 py-2 rounded-lg font-semibold text-sm flex items-center gap-6 w-fit">
                Kostenlose Ersteinschätzung
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1">
            <Image 
              src="https://api.builder.io/api/v1/image/assets/TEMP/96ffd8a00c405d3958f77db484ccda21bb792b0c?width=1312"
              alt="Building facade"
              width={656}
              height={720}
              className="rounded-lg border border-dark-neutral/20 w-full h-auto"
            />
          </div>
        </section>

        {/* Section 3: Was ist ein Nutzungsdauergutachten */}
        <section className="px-16 py-30">
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-10">
              <div className="flex flex-col gap-12.5">
                <h2 className="max-w-[488px] text-dark-neutral font-sora text-[32px] font-medium leading-[144%]">
                  Was ist ein Nutzungsdauergutachten – und warum lohnt es sich?
                </h2>
                <button className="bg-dark-neutral text-light-neutral px-4.5 py-2 rounded-lg font-semibold text-sm flex items-center gap-6 w-fit">
                  Kostenlose Ersteinschätzung
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-10">
              <h3 className="text-dark-neutral text-sm font-semibold leading-[144%] tracking-tight uppercase">
                Steuervorteile sichern durch den Nachweis einer kürzeren Restnutzungsdauer
              </h3>
              <div className="text-dark-gray text-base leading-[180%] tracking-tight">
                Ein <span className="text-[#FC7019]">Nutzungsdauergutachten</span> ist ein fachlich fundierter Nachweis über die <span className="text-[#FC7019]">tatsächliche wirtschaftliche Lebensdauer</span> eines Gebäudes. Es wird von einem <span className="text-[#FC7019]">zertifizierten Sachverständigen</span> erstellt und berücksichtigt Baujahr, Modernisierungen, baulichen Zustand und die zu erwartende Instandhaltungsintensität.
                <br /><br />
                Mit diesem Gutachten können Eigentümer gegenüber dem <span className="text-[#FC7019]">Finanzamt</span> belegen, dass die pauschale 50-jährige Nutzungsdauer nicht zutrifft. Dadurch wird eine <span className="text-[#FC7019]">höhere jährliche Abschreibung</span> möglich - <span className="text-[#FC7019]">gesetzeskonform, transparent und nachvollziehbar.</span>
                <br />
                Für Eigentümer bedeutet das: <span className="text-[#FC7019]">geringere Steuerlast, höhere Liquidität und langfristig ein besserer Cashflow</span>.
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-gradient-to-b from-cadetblue to-cadetblue px-16 py-30">
          <div className="flex flex-col gap-16">
            <div className="flex justify-between items-end">
              <h2 className="max-w-[488px] text-dark-neutral font-sora text-[32px] font-medium leading-[144%]">
                Was kostet ein<br />Nutzungsdauergutachten?
              </h2>
              <button className="bg-dark-neutral text-light-neutral px-4.5 py-2 rounded-lg font-semibold text-sm flex items-center gap-6">
                Kostenlose Ersteinschätzung
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-0 border border-dark-neutral/20">
              {/* Option 1 */}
              <div className="flex flex-col border-b border-dark-neutral/20">
                <div className="p-6 flex flex-col gap-10 flex-1">
                  <div className="flex flex-col gap-10">
                    <h3 className="text-dark-neutral font-sora text-base font-medium leading-[144%]">
                      Restnutzungsdauergutachten<br />(ohne Vor-Ort_besichtigung)
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="text-dark-neutral font-sora text-[32px] font-semibold leading-[144%]">
                        950,00€
                      </div>
                      <div className="text-dark-gray font-sora text-sm leading-[144%]">
                        (inkl. MwSt)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <FeatureItem text="Erstellt durch zertifizierte Gutachter (DIN EN ISO/IEC 17024)" />
                    <FeatureItem text="Komplexe Gutachten mit fundierter Berechnung" />
                    <FeatureItem text="Nach geltender Rechtssprechung zur Anerkennung beim Finanzamt" />
                  </div>
                </div>
                <button className="bg-dark-neutral text-light-neutral py-4 px-4.5 font-semibold text-sm">
                  Kostenlose Ersteinschätzung
                </button>
              </div>

              {/* Option 2 - Recommended */}
              <div className="flex flex-col bg-[rgba(255,152,92,0.1)] border-x border-dark-neutral/20 border-b border-dark-neutral/20">
                <div className="p-6 flex flex-col gap-10 flex-1">
                  <div className="flex flex-col gap-10">
                    <div className="flex justify-between items-center">
                      <h3 className="text-dark-neutral font-sora text-base font-medium leading-[144%]">
                        Restnutzungsdauergutachten<br />(mit Vor-Ort-Außenbesichtigung)
                      </h3>
                      <div className="px-2 py-1 rounded-lg border border-gutachten-accent bg-gradient-to-b from-[rgba(255,152,92,0)] to-[rgba(255,152,92,0.1)]">
                        <span className="text-dark-neutral text-xs font-semibold uppercase">EMPFOHLEN</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="text-[#EB6613] font-sora text-[32px] font-semibold leading-[144%]">
                        + 179,00 €
                      </div>
                      <div className="text-dark-gray font-sora text-sm leading-[144%]">
                        (inkl. MwSt)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <FeatureItem text="Außenbesichtigung" />
                    <FeatureItem text="Fotodokumentation" />
                    <FeatureItem text="Erhöhte Wertigkeit des Gutachtens" />
                  </div>
                </div>
                <button className="bg-gutachten-accent text-dark-neutral py-4 px-4.5 font-semibold text-sm">
                  Kostenlose Ersteinschätzung
                </button>
              </div>

              {/* Option 3 */}
              <div className="flex flex-col border-b border-dark-neutral/20">
                <div className="p-6 flex flex-col gap-10 flex-1">
                  <div className="flex flex-col gap-10">
                    <h3 className="text-dark-neutral font-sora text-base font-medium leading-[144%]">
                      Restnutzungsdauergutachten<br />(mit Vor-Ort-Innen-und-Außenbesichtigung)
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="text-dark-neutral font-sora text-[32px] font-semibold leading-[144%]">
                        + 359,00 €
                      </div>
                      <div className="text-dark-gray font-sora text-sm leading-[144%]">
                        (inkl. MwSt)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <FeatureItem text="Außenbesichtigung" />
                    <FeatureItem text="Innenbesichtigung" />
                    <FeatureItem text="Umfangreiche Fotodokumentation" />
                    <FeatureItem text="Maximale Wertigkeit des Gutachtens" />
                  </div>
                </div>
                <button className="bg-dark-neutral text-light-neutral py-4 px-4.5 font-semibold text-sm">
                  Kostenlose Ersteinschätzung
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Factors Section */}
        <section className="bg-white px-16 py-30">
          <div className="flex flex-col gap-16">
            <div className="flex items-end gap-6">
              <div className="flex-1 flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <div className="text-dark-gray text-sm font-semibold uppercase tracking-tight">
                    Bares geld sparen
                  </div>
                  <h2 className="text-dark-neutral font-sora text-[32px] font-medium leading-[144%]">
                    Nutzungsdauergutachten
                  </h2>
                </div>
              </div>
              <button className="bg-dark-neutral text-light-neutral px-4.5 py-2 rounded-lg font-semibold text-sm flex items-center gap-6">
                Kostenlose Ersteinschätzung
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FactorCard
                title="Art der Immobilie - Einfluss auf die Restnutzungsdauer"
                description="Die Art der Immobilie hat erheblichen Einfluss auf die Einschätzung der Restnutzungsdauer. Ob Einfamilienhaus, Eigentumswohnung oder Gewerbeeinheit - jeder Immobilientyp ist unterschiedlichen Nutzungsbelastungen und Abnutzungsfaktoren ausgesetzt. Diese Unterschiede werden im Nutzungsdauergutachten berücksichtigt und fließen direkt in die Bewertung der tatsächlichen Lebensdauer ein."
              />
              <FactorCard
                title="Baujahr - Basis für die technische Lebensdauer Ihrer Immobilie"
                description="Das Baujahr liefert zentrale Hinweise zur Bauweise, zum verwendeten Material und zum typischen Verschleißverhalten einer Immobilie. Je älter das Gebäude, desto relevanter ist eine individuelle Einschätzung der Restnutzungsdauer. Ein professionelles Nutzungsdauergutachten bewertet genau diese Faktoren - und schafft so die Grundlage für eine fundierte steuerliche Optimierung."
              />
              <FactorCard
                title="Modernisierungen - Verlängern sie die Restnutzungsdauer?"
                description="Durchgeführte Modernisierungen beeinflussen die Restnutzungsdauer oft erheblich. Erneuerungen an Dach, Fassade, Fenstern, Heizung oder Bädern können die technische Lebensdauer verlängern und den baulichen Zustand verbessern. Diese Angaben fließen direkt in das Restnutzungsdauergutachten ein - und helfen dabei, eine realistische und steuerlich wirksame Einschätzung vorzunehmen."
              />
              <FactorCard
                title="Baulicher Zustand & Besonderheiten - entscheidend für die Bewertung"
                description="Der bauliche Zustand einer Immobilie ist ein zentraler Faktor im Nutzungsdauergutachten. Schäden, Abnutzung oder Sanierungsbedarf verkürzen die Restnutzungsdauer - während ein gepflegter Zustand diese deutlich verlängern kann. Auch individuelle Besonderheiten wie Ausstattungsqualität oder energetische Sanierungen werden berücksichtigt und beeinflussen das Ergebnis des Gutachtens direkt."
              />
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gradient-to-b from-cadetblue to-cadetblue px-16 py-30">
          <div className="flex gap-6">
            <div className="w-[867px] flex flex-col gap-10">
              <div className="flex justify-between items-center">
                <div className="flex flex-col justify-between h-[171px]">
                  <h2 className="text-dark-neutral font-sora text-[32px] font-medium leading-[144%]">
                    Der Ablauf
                  </h2>
                  <div className="text-dark-gray text-sm font-semibold leading-[144%] tracking-tight uppercase">
                    Einfach<br />transparent<br />unverbindlich
                  </div>
                </div>
                <div className="flex-1 min-w-[571px] flex flex-col gap-10">
                  <p className="text-dark-gray text-base leading-[180%] tracking-tight">
                    Ein Immobiliengutachten muss nicht kompliziert sein. Bei uns starten Sie mit einer kostenfreien Ersteinschätzung - ohne Verpflichtung, aber mit maximaler Transparenz. So wissen Sie von Anfang an, was sinnvoll und wirtschaftlich ist.
                  </p>
                  <button className="bg-dark-neutral text-light-neutral px-4.5 py-2 rounded-lg font-semibold text-sm flex items-center gap-6 w-fit">
                    Kostenlose Ersteinschätzung
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                      <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <ProcessStep
                  number="1"
                  title="Unverbindliche Ersteinschätzung"
                  description="Unsere Sachverständigen prüfen kostenlos, ob sich ein Gutachten für Sie lohnt."
                />
                <ProcessStep
                  number="2"
                  title="Detailliertes Gutachten erhalten"
                  description="Sie bekommen ein individuell erstelltes Gutachten – die verlässliche Grundlage für Ihre nächsten Schritte."
                />
                <ProcessStep
                  number="3"
                  title="Bei Bedarf: Gutachten beauftragen"
                  description="Auf Wunsch erstellen wir das vollständige Gutachten  und erläutern Ablauf und Kosten transparent."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="px-16 py-30">
          <div className="flex gap-16">
            <div className="w-[421px] flex-shrink-0 flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="text-dark-gray text-sm font-semibold uppercase tracking-tight">
                  echte Praxisbeispiele und überzeugende Ergebnisse.
                </div>
                <h2 className="text-dark-neutral font-sora text-[32px] font-medium leading-[144%]">
                  Steuerersparnis mit verkürzter Nutzungsdauer
                </h2>
              </div>
              <div className="flex flex-col gap-10">
                <p className="text-dark-gray text-base leading-[180%] tracking-tight">
                  Unsere Gutachten schaffen messbare Vorteile: Immobilienbesitzer sparen durch die reduzierte Nutzungsdauer jedes Jahr tausende Euro an Steuern. Ob Eigentumswohnung, Einfamilienhaus, Mehrfamilienhaus oder Gewerbeobjekt – wir zeigen Ihnen, wie Sie durch gezielte Abschreibungen Ihre Steuerlast deutlich senken können.
                </p>
                <button className="bg-dark-neutral text-light-neutral px-4.5 py-2 rounded-lg font-semibold text-sm flex items-center gap-6 w-fit">
                  Kostenlose Ersteinschätzung
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-18">
              <div className="grid grid-cols-2 gap-16">
                <CaseStudyCard
                  tag="Eigentumswohnung"
                  image="https://api.builder.io/api/v1/image/assets/TEMP/0321fb67347f1c7ab399df9f2ff5d7e1871ffb7d?width=763"
                  metrics={[
                    { label: 'Objektwert', value: '450.000 €' },
                    { label: 'Steuerersparnis', value: '7.516 € / Jahr' },
                    { label: 'Restnutzungsdauer', value: '24 Jahre' },
                  ]}
                  bullets={['Modernisierung des Innenausbau: 2016']}
                  specs={{ Baujahr: '1965', Einheiten: '6', m2: '134' }}
                />
                <CaseStudyCard
                  tag="Eigentumswohnung"
                  image="https://api.builder.io/api/v1/image/assets/TEMP/ef852896a255e0fd212d09646237356117bb4a42?width=763"
                  metrics={[
                    { label: 'Objektwert', value: '200.000 €' },
                    { label: 'Steuerersparnis', value: '6.000 € / Jahr' },
                    { label: 'Restnutzungsdauer', value: '20 Jahre' },
                  ]}
                  bullets={["Neue Heizung: 2023", 'keine weieteren Modernisierungen in den letzten 20 Jahren']}
                  specs={{ Baujahr: '1904', Einheiten: '4', m2: '98,7' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-16 items-start">
                <CaseStudyCard
                  tag="Mehrfamilienhaus"
                  image="https://api.builder.io/api/v1/image/assets/TEMP/43ba95b6e288932d45a0ca6b035b273d9f076a6e?width=763"
                  metrics={[
                    { label: 'Objektwert', value: '8.413.000 €' },
                    { label: 'Steuerersparnis', value: '186.000 € / Jahr' },
                    { label: 'Restnutzungsdauer', value: '23 Jahre' },
                  ]}
                  bullets={["Modernisierung der Heizungsanlage: 2016", 'keine Außendämmung vorhanden']}
                  specs={{ Baujahr: '1996', Einheiten: '42', m2: '4206,6' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-16 py-30">
          <div className="flex flex-col items-center gap-12">
            <div className="flex justify-between items-start w-full">
              <h2 className="text-dark-neutral font-sora text-[32px] font-medium leading-[144%]">
                Häufig gestellte Fragen
              </h2>
            </div>

            <div className="w-full max-w-[812px] flex flex-col gap-10">
              <FAQItem
                question="Welche Zertifizierungen haben unsere Sachverständigen und Gutachter?"
                answer="Unsere Partner-Sachverständigen sind nach nationalen und internationalen Standards zertifiziert, die höchste Anerkennung und Akzeptanz garantieren. Sie verfügen unter anderem über die Zertifizierung nach DIN EN ISO/IEC 17024, einem international anerkannten Standard zur Personenzertifizierung. Dadurch ist sichergestellt, dass die von uns erstellten Gutachten von Ämtern, Behörden und Gerichten vollumfänglich anerkannt werden."
                defaultOpen
              />
              <FAQItem
                question="Wie lange dauert die Erstellung eines Gutachtens?"
                answer="Die Bearbeitungszeit variiert je nach Umfang und Komplexität des Auftrags. In der Regel können Sie mit einer Bearbeitungszeit von 2-3 Wochen rechnen."
              />
              <FAQItem
                question="Wird das Gutachten vom Finanzamt anerkannt?"
                answer="Ja, unsere Gutachten werden nach den geltenden Standards erstellt und sind steuerlich anerkannt."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark-neutral px-16">
        <div className="py-30 flex gap-18">
          <div className="flex-1 flex flex-col gap-12">
            <svg width="171" height="22" viewBox="0 0 171 22" fill="none" className="w-[171px] h-[22px]">
              <path d="M2 7.45033C2 7.34638 2.05125 7.25166 2.13732 7.19203L12.4359 0.0576242C12.5502 -0.0215528 12.7031 -0.0189131 12.8145 0.0641626L21.1903 6.30869C21.3565 6.43261 21.362 6.67761 21.2016 6.80875L18.7502 8.81208C18.6349 8.90633 18.4691 8.90961 18.3501 8.82L12.8123 4.65164C12.702 4.56862 12.5504 4.56472 12.4359 4.64195L5.68317 9.1967C5.59518 9.25605 5.54254 9.35459 5.54254 9.45994V18.1768C5.54254 18.3528 5.68673 18.4954 5.86459 18.4954H12.8392C12.9108 18.4954 12.9804 18.4718 13.0369 18.4283L17.162 15.2543C17.2588 15.1798 17.2056 15.0263 17.0829 15.0263H13.9158C13.738 15.0263 13.5938 14.8836 13.5938 14.7077V12.1589C13.5938 11.983 13.738 11.8403 13.9158 11.8403H22.6779C22.8558 11.8403 23 11.983 23 12.1589V21.6814C23 21.8574 22.8558 22 22.6779 22H19.7937C19.6158 22 19.4716 21.8574 19.4716 21.6814V17.9932C19.4716 17.8854 19.3448 17.8263 19.2608 17.8949L14.3272 21.927C14.2694 21.9742 14.1969 22 14.122 22H2.32205C2.14419 22 2 21.8631 2 21.6872C2 20.0234 2 12.1138 2 7.45033Z" fill="#F8FAFB"/>
            </svg>
            <p className="text-light-gray font-sora text-base font-medium leading-[210%]">
              Die Gutachten-Komplettlösung für Investoren, Eigentümer und Immobilienprofis.
            </p>
          </div>

          <div className="flex gap-6 flex-1">
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="text-white font-sora text-sm font-medium leading-[164.571%]">Beliebt</h3>
              <div className="flex flex-col gap-1">
                <Link href="#" className="text-gutachten-accent text-sm leading-[194.286%] flex items-center gap-2">
                  Afa-Rechner
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27241 1H10.0504V8.778M9.17041 1.879L2.02441 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </Link>
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">Restnutzungsdauer berechnen</Link>
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">FAQ - Häufig gestellte Fragen</Link>
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">Immobilienlexikon Gutachten und Bewertung</Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <h3 className="text-white font-sora text-sm font-medium leading-[164.571%]">Rechtlich</h3>
              <div className="flex flex-col gap-1">
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">Impressum</Link>
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">AGB</Link>
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">Datenschutz</Link>
              </div>
            </div>
          </div>

          <div className="flex gap-6 flex-1">
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="text-white font-sora text-sm font-medium leading-[164.571%]">Standorte</h3>
              <div className="flex flex-col gap-1">
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">Berlin</Link>
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">Frankfurt am Main</Link>
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">Hamburg</Link>
                <Link href="#" className="text-light-gray text-sm leading-[194.286%]">Köln</Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <h3 className="text-white font-sora text-sm font-medium leading-[164.571%]">Kontakt</h3>
              <div className="flex flex-col gap-1">
                <a href="tel:+493075436481" className="text-light-gray text-sm leading-[194.286%]">+49 30 754 364 81</a>
                <a href="mailto:support@gutachten.org" className="text-light-gray text-sm leading-[194.286%]">support@gutachten.org</a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 flex justify-between items-center border-t border-dark-gray">
          <p className="text-light-gray text-xs leading-[210%]">
            © 2025 Gutachten.org (Evalion GmbH). Alle Rechte vorbehalten.<br />
            Entworfen von Defijn.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="w-9.5 h-9.5 flex items-center justify-center bg-dark-neutral">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.75 6H4.5V9H6.75V18H10.5V9H13.2315L13.5 6H10.5V4.74975C10.5 4.0335 10.644 3.75 11.3362 3.75H13.5V0H10.644C7.947 0 6.75 1.18725 6.75 3.46125V6Z" fill="white"/>
              </svg>
            </Link>
            <Link href="#" className="w-9.5 h-9.5 flex items-center justify-center bg-dark-neutral">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.62225C11.403 1.62225 11.688 1.63125 12.6375 1.67475C15.0765 1.78575 16.2157 2.943 16.3267 5.364C16.3702 6.31275 16.3785 6.59775 16.3785 9.00075C16.3785 11.4045 16.3695 11.6888 16.3267 12.6375C16.215 15.0563 15.0788 16.2157 12.6375 16.3267C11.688 16.3702 11.4045 16.3793 9 16.3793C6.597 16.3793 6.312 16.3702 5.36325 16.3267C2.91825 16.215 1.785 15.0525 1.674 12.6368C1.6305 11.688 1.6215 11.4037 1.6215 9C1.6215 6.597 1.63125 6.31275 1.674 5.36325C1.78575 2.943 2.922 1.785 5.36325 1.674C6.31275 1.63125 6.597 1.62225 9 1.62225ZM9 0C6.55575 0 6.24975 0.0105 5.28975 0.054C2.02125 0.204 0.20475 2.0175 0.05475 5.289C0.0105 6.24975 0 6.55575 0 9C0 11.4443 0.0105 11.751 0.054 12.711C0.204 15.9795 2.0175 17.796 5.289 17.946C6.24975 17.9895 6.55575 18 9 18C11.4443 18 11.751 17.9895 12.711 17.946C15.9765 17.796 17.7975 15.9825 17.9453 12.711C17.9895 11.751 18 11.4443 18 9C18 6.55575 17.9895 6.24975 17.946 5.28975C17.799 2.02425 15.9832 0.20475 12.7117 0.05475C11.751 0.0105 11.4443 0 9 0ZM9 4.3785C6.44775 4.3785 4.3785 6.44775 4.3785 9C4.3785 11.5523 6.44775 13.6223 9 13.6223C11.5523 13.6223 13.6215 11.553 13.6215 9C13.6215 6.44775 11.5523 4.3785 9 4.3785ZM9 12C7.34325 12 6 10.6575 6 9C6 7.34325 7.34325 6 9 6C10.6568 6 12 7.34325 12 9C12 10.6575 10.6568 12 9 12ZM13.8045 3.11625C13.2075 3.11625 12.7238 3.6 12.7238 4.19625C12.7238 4.7925 13.2075 5.27625 13.8045 5.27625C14.4008 5.27625 14.8837 4.7925 14.8837 4.19625C14.8837 3.6 14.4008 3.11625 13.8045 3.11625Z" fill="white"/>
              </svg>
            </Link>
            <Link href="#" className="w-9.5 h-9.5 flex items-center justify-center bg-dark-neutral">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5.05125 3.09375C5.05125 3.87056 4.42688 4.5 3.65625 4.5C2.88562 4.5 2.26125 3.87056 2.26125 3.09375C2.26125 2.3175 2.88562 1.6875 3.65625 1.6875C4.42688 1.6875 5.05125 2.3175 5.05125 3.09375ZM5.0625 5.625H2.25V14.625H5.0625V5.625ZM9.55238 5.625H6.75787V14.625H9.55294V9.90056C9.55294 7.27369 12.9442 7.05881 12.9442 9.90056V14.625H15.75V8.92631C15.75 4.49381 10.7314 4.65525 9.55238 6.83719V5.625Z" fill="white"/>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M20.5568 7.52466C20.3729 7.23085 20.102 7.00167 19.7817 6.86904C19.4615 6.7364 19.1079 6.70691 18.7701 6.78466L16.3728 7.33533C16.1271 7.3918 15.8718 7.3918 15.6261 7.33533L13.2288 6.78466C12.891 6.70691 12.5374 6.7364 12.2171 6.86904C11.8969 7.00167 11.626 7.23085 11.4421 7.52466L10.1354 9.61C10.0021 9.82333 9.82209 10.0033 9.60875 10.138L7.52342 11.4447C7.23011 11.6284 7.00127 11.8989 6.86866 12.2185C6.73606 12.5382 6.70627 12.8913 6.78342 13.2287L7.33409 15.6287C7.39035 15.8739 7.39035 16.1287 7.33409 16.374L6.78342 18.7727C6.70597 19.1102 6.73561 19.4636 6.86823 19.7835C7.00085 20.1035 7.22986 20.3742 7.52342 20.558L9.60875 21.8647C9.82209 21.998 10.0021 22.178 10.1368 22.3913L11.4434 24.4767C11.8194 25.078 12.5368 25.3753 13.2288 25.2167L15.6261 24.666C15.8718 24.6095 16.1271 24.6095 16.3728 24.666L18.7714 25.2167C19.109 25.2941 19.4623 25.2645 19.7823 25.1319C20.1023 24.9992 20.373 24.7702 20.5568 24.4767L21.8634 22.3913C21.9968 22.178 22.1768 21.998 22.3901 21.8647L24.4768 20.558C24.7703 20.3739 24.9992 20.1029 25.1316 19.7827C25.264 19.4625 25.2933 19.109 25.2154 18.7713L24.6661 16.374C24.6096 16.1283 24.6096 15.873 24.6661 15.6273L25.2168 13.2287C25.2943 12.8912 25.2649 12.538 25.1325 12.218C25.0001 11.8981 24.7714 11.6273 24.4781 11.4433L22.3914 10.1367C22.1784 10.0031 21.9983 9.82303 21.8648 9.61L20.5568 7.52466ZM19.8861 13.0273C19.9686 12.8757 19.989 12.698 19.9431 12.5316C19.8972 12.3652 19.7885 12.223 19.64 12.1351C19.4914 12.0472 19.3146 12.0203 19.1466 12.0602C18.9786 12.1 18.8327 12.2034 18.7394 12.3487L15.2528 18.25L13.1474 16.234C13.085 16.1699 13.0102 16.119 12.9277 16.0843C12.8451 16.0497 12.7564 16.0321 12.6669 16.0325C12.5774 16.0329 12.4889 16.0513 12.4066 16.0866C12.3244 16.122 12.2501 16.1735 12.1882 16.2382C12.1263 16.3029 12.0781 16.3793 12.0464 16.463C12.0147 16.5468 12.0001 16.636 12.0037 16.7255C12.0072 16.8149 12.0287 16.9027 12.0669 16.9837C12.1052 17.0646 12.1593 17.1371 12.2261 17.1967L14.9381 19.7953C15.0107 19.8647 15.098 19.9168 15.1935 19.9478C15.2891 19.9787 15.3904 19.9876 15.4899 19.9739C15.5894 19.9602 15.6845 19.9242 15.7681 19.8685C15.8517 19.8129 15.9217 19.7391 15.9728 19.6527L19.8861 13.0273Z" fill="#00A36F"/>
      </svg>
      <span className="text-dark-gray text-sm">{text}</span>
    </div>
  );
}

function FactorCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 flex flex-col gap-2 rounded-lg border border-dark-neutral/20">
      <div className="flex flex-col gap-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M21 8H16V22H22V9C22 8.448 21.552 8 21 8ZM20 20H18V18H20V20ZM20 16H18V14H20V16ZM20 12H18V10H20V12Z" fill="#B9BEC1"/>
          <path d="M8 8H3C2.448 8 2 8.448 2 9V22H8V8ZM6 20H4V18H6V20ZM6 16H4V14H6V16ZM4 12V10H6V12H4Z" fill="#B9BEC1"/>
          <path d="M16 3C16 2.448 15.552 2 15 2H9C8.448 2 8 2.448 8 3V22H11V19C11 18.448 11.448 18 12 18C12.552 18 13 18.448 13 19V22H16V3ZM13 15H11V13H13V15ZM13 11H11V9H13V11ZM13 7H11V5H13V7Z" fill="#365954"/>
        </svg>
        <h3 className="text-dark-neutral font-sora text-xl leading-[144%]">{title}</h3>
        <p className="text-dark-gray text-sm leading-[180%] tracking-tight">{description}</p>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex-1 p-6 flex flex-col justify-between rounded-lg border border-dark-neutral/20">
      <div className="text-gutachten-accent font-sora text-xl font-bold leading-[144%] flex-1">
        {number}
      </div>
      <div className="w-[230px] flex flex-col gap-10">
        <h3 className="text-dark-neutral font-sora text-xl leading-[144%]">
          {title}
        </h3>
        <p className="text-dark-gray text-base leading-[180%] tracking-tight">
          {description}
        </p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  return (
    <div className="pb-10 border-b border-dark-neutral/20">
      <div className="flex justify-between items-center">
        <h3 className="flex-1 text-dark-neutral font-sora text-lg leading-[144%]">{question}</h3>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {defaultOpen ? (
            <>
              <path d="M12 19V5" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12L12 5L5 12" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          ) : (
            <>
              <path d="M12 5V19" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12L12 19L5 12" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}
        </svg>
      </div>
      {defaultOpen && (
        <p className="mt-10 text-dark-gray text-sm leading-[240%] tracking-tight">
          {answer}
        </p>
      )}
    </div>
  );
}

function CaseStudyCard({
  tag,
  image,
  metrics,
  bullets,
  specs,
}: {
  tag: string;
  image: string;
  metrics: { label: string; value: string }[];
  bullets: string[];
  specs: { Baujahr: string; Einheiten: string; m2: string };
}) {
  return (
    <div className="flex flex-col gap-6">
      <div
        className="h-[424px] rounded-lg bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute top-4 left-4 rounded-num-99 border border-dark-neutral/20 bg-light-neutral px-3 py-1.5 text-dark-neutral text-sm">
          {tag}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-4">
            <div className="flex-1 text-dark-gray text-sm">{m.label}</div>
            <div className="flex-1 text-dark-neutral text-sm font-semibold">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {bullets.map((b) => (
          <div key={b} className="flex items-center gap-2 text-dark-neutral text-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.938 8.84H1.874a.25.25 0 0 0-.25.25v2.049a.25.25 0 0 0 .25.25h6.041a.25.25 0 0 0 .156-.054l3.759-2.932c.064-.05.161-.007.161.071v2.682c0 .128.11.232.245.232h2.197a.233.233 0 0 0 .245-.232V4.232A.232.232 0 0 0 14.434 4H7.758a.232.232 0 0 0-.245.232v1.853c0 .128.11.232.245.232h2.413c.094 0 .134.112.06.166L7.089 8.791a.25.25 0 0 1-.151.049z" fill="#FF985C"/>
            </svg>
            <span className="leading-[180%] tracking-tight">{b}</span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-6">
        <div className="w-26">
          <div className="text-dark-neutral text-sm font-semibold">Baujahr</div>
          <div className="text-dark-gray text-sm">{specs.Baujahr}</div>
        </div>
        <div className="w-26">
          <div className="text-dark-neutral text-sm font-semibold">Einheiten</div>
          <div className="text-dark-gray text-sm">{specs.Einheiten}</div>
        </div>
        <div className="w-26">
          <div className="text-dark-neutral text-sm font-semibold">m2</div>
          <div className="text-dark-gray text-sm">{specs.m2}</div>
        </div>
      </div>
    </div>
  );
}
