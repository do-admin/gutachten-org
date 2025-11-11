import Image from 'next/image';
import Link from 'next/link';

export default function NutzungsdauerCityPage() {
  return (
    <div className="min-h-screen bg-light-neutral">
      {/* Header */}
      <header className="border-b border-darkslategray-100">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
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

          <nav className="hidden lg:flex items-center gap-6">
            <Link href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cadetblue">
              <span className="font-inter text-sm font-semibold text-dark-neutral">Useful Life</span>
              <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                <path d="M2.27193 1H10.0499V8.778M9.16993 1.879L2.02393 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </Link>
            <Link href="#" className="px-4 py-2.5 font-inter text-sm font-medium text-dark-neutral hover:bg-gray-50 rounded-lg transition">
              Property Valuation
            </Link>
            <Link href="#" className="px-4 py-2.5 font-inter text-sm font-medium text-dark-neutral hover:bg-gray-50 rounded-lg transition">
              Counselor
            </Link>
            <Link href="#" className="px-4 py-2.5 font-inter text-sm font-medium text-dark-neutral hover:bg-gray-50 rounded-lg transition">
              For Business Customers
            </Link>
          </nav>

          <button className="hidden lg:flex items-center gap-6 px-4 py-2 rounded-lg bg-gutachten-accent">
            <span className="font-inter text-sm font-semibold text-dark-neutral">Free Initial Assesment</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Content */}
          <div className="px-8 lg:px-16 py-16 lg:py-24 flex flex-col justify-between border-r border-darkslategray-100">
            <div className="flex items-center gap-6 mb-10">
              <Image src="https://api.builder.io/api/v1/image/assets/TEMP/c11ec9f58cc878305f3f22646a9ba66da5ff661a?width=157" alt="" width={79} height={73} />
              <Image src="https://api.builder.io/api/v1/image/assets/TEMP/86d56761c9789dda1518e2d373d46fdc1b639da4?width=110" alt="" width={55} height={73} />
              <Image src="https://api.builder.io/api/v1/image/assets/TEMP/8e4f28f97d7807a598c4c025678fd7871bb18dcf?width=146" alt="" width={73} height={73} />
              <Image src="https://api.builder.io/api/v1/image/assets/TEMP/3110bc248455db3c4bfe8a87a878e7cea7990f6b?width=145" alt="" width={73} height={73} />
            </div>

            <div className="space-y-10">
              <p className="text-sm font-semibold text-chocolate uppercase tracking-tight font-inter">
                Nutzungsdauer - Berlin
              </p>

              <h1 className="text-3xl lg:text-4xl font-semibold text-dark-neutral leading-tight font-sora max-w-lg">
                Restnutzungsdauer Gutachten in Berlin - kostenlose Ersteinschätzung
              </h1>

              <p className="text-sm text-dark-gray leading-relaxed font-inter">
                Ein Restnutzungsdauergutachten in Berlin ermöglicht es Eigentümern, die Abschreibungsdauer (AfA) ihrer vermieteten Immobilie realistisch zu verkürzen – und dadurch jährlich Steuern zu sparen. Statt der pauschalen 50 Jahre kann ein fachlich begründetes Gutachten z. B. eine Restnutzungsdauer von nur 30 oder 25 Jahren ansetzen. Unsere Sachverständigen erstellen rechtssichere Gutachten nach § 7 Abs. 4 EStG – anerkannt vom Finanzamt.
                <br /><br />
                Jetzt kostenlose Ersteinschätzung sichern und individuelles Sparpotenzial prüfen lassen!
              </p>

              <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral">
                <span className="font-inter text-sm font-semibold text-light-neutral">Free Initial Assesment</span>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content - Hero Image with Card */}
          <div 
            className="relative bg-cover bg-center min-h-[500px] lg:min-h-full flex items-end justify-center px-6 py-12"
            style={{
              backgroundImage: "linear-gradient(0deg, rgba(143, 181, 170, 0.50) 0%, rgba(143, 181, 170, 0.50) 100%), url('https://api.builder.io/api/v1/image/assets/TEMP/80cf5d9d7b9cf51488b6fb0c7f1a13bca2df582f?width=1440')",
              backgroundBlendMode: "multiply, normal"
            }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 max-w-xs w-full mb-8">
              <Image 
                src="https://api.builder.io/api/v1/image/assets/TEMP/d9e2a0036d1e124833081df515f1700398c45237?width=432" 
                alt="Felix Holfert" 
                width={216}
                height={216}
                className="w-full rounded-lg mb-6"
              />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-dark-neutral font-sora">Felix Holfert</h3>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Real estate appraiser according to DIN ISO 17 0 24
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16 space-y-32">
          {/* Section 1 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <Image 
              src="https://api.builder.io/api/v1/image/assets/TEMP/224e92485a5ab46b7f1e569da993c7e92cd5a22d?width=1312" 
              alt="" 
              width={656}
              height={720}
              className="w-full rounded-lg border border-darkslategray-200"
            />
            
            <div className="space-y-10">
              <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora">
                Steuervorteile sichern durch verkürzte Abschreibung in Berlin
              </h2>
              
              <p className="text-base text-dark-gray leading-relaxed font-inter">
                Ein Restnutzungsdauergutachten für Ihre Immobilie in Berlin kann Ihre steuerliche Abschreibung spürbar verkürzen – oft auf 30 oder 15 Jahre. Das senkt Ihre Steuerlast und steigert Ihre jährliche Nachsteuerrendite. Besonders bei vermieteten Bestandsimmobilien ist das ein einfacher Hebel für mehr Netto vom Brutto.
                <br /><br />
                Unsere Gutachten sind fundiert, finanzamttauglich und schnell erstellt. Jetzt kostenlose Ersteinschätzung erhalten!
              </p>
              
              <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral">
                <span className="font-inter text-sm font-semibold text-light-neutral">Free Initial Assesment</span>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Section 2 - Reverse Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-10 lg:order-1 order-2">
              <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora">
                Steuersparpotenzial nutzen – mit verkürzter Abschreibungsdauer in Berlin
              </h2>
              
              <p className="text-base text-dark-gray leading-relaxed font-inter">
                Als Vermieter in Berlin können Sie Ihre Immobilie deutlich schneller abschreiben – und dadurch jedes Jahr bares Geld sparen. Anstelle der pauschalen 50 Jahre Nutzungsdauer erlaubt der Gesetzgeber eine verkürzte AfA, wenn Sie diese durch ein qualifiziertes Restnutzungsdauergutachten belegen.
                <br /><br />
                Gerade bei älteren Immobilien – insbesondere mit Baujahr vor 2000 – ist eine reale Restnutzungsdauer von 25 bis 35 Jahren oft plausibel. Das Gutachten dient als offizieller Nachweis gegenüber dem Finanzamt und ermöglicht höhere Abschreibungen und spürbare Steuervorteile.
                <br /><br />
                Jetzt kostenlose Ersteinschätzung für Ihre Immobilie in Berlin anfordern!
              </p>
              
              <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral">
                <span className="font-inter text-sm font-semibold text-light-neutral">Free Initial Assesment</span>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>

            <Image 
              src="https://api.builder.io/api/v1/image/assets/TEMP/1f4595af0b12d871641bb1362bd6915a4dbfa8dd?width=1312" 
              alt="" 
              width={656}
              height={720}
              className="w-full rounded-lg border border-darkslategray-200 lg:order-2 order-1"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora max-w-md">
              Die Vorteile von Nutzungsdauer-Gutachten
            </h2>
            
            <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral">
              <span className="font-inter text-sm font-semibold text-light-neutral">Free Initial Assesment</span>
              <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 border border-darkslategray-200 rounded-lg space-y-10">
              <h3 className="text-xl font-normal text-dark-neutral font-sora">Höhere Abschreibungen</h3>
              <p className="text-sm text-dark-gray leading-relaxed font-inter">
                Ein Nutzungsdauergutachten ermöglicht höhere jährliche Abschreibungen – und senkt dadurch steuerpflichtigen Gewinn spürbar.
              </p>
            </div>

            <div className="p-6 border border-darkslategray-200 rounded-lg space-y-10">
              <h3 className="text-xl font-normal text-dark-neutral font-sora">Steuervorteile für Vermieter nutzen</h3>
              <p className="text-sm text-dark-gray leading-relaxed font-inter">
                Durch die verkürzte AfA-Dauer zahlen Sie deutlich weniger Einkommensteuer auf Ihre Mieteinnahmen – und steigern so Ihre Nachsteuerrendite.
              </p>
            </div>

            <div className="p-6 border border-darkslategray-200 rounded-lg space-y-10">
              <h3 className="text-xl font-normal text-dark-neutral font-sora">Mehr Netto aus der Vermietung</h3>
              <p className="text-sm text-dark-gray leading-relaxed font-inter">
                Die geringere Steuerbelastung verbessert Ihren monatlichen Cashflow – für mehr Liquidität und eine bessere Gesamtrendite Ihrer Immobilie.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex flex-col items-center gap-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10 2H14" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14L15 11" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-base text-dark-neutral text-center font-sora">Verkürzte Nutzungsdauer</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V21" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 14V21" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 10V21" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 3L13.354 11.646C13.3076 11.6926 13.2524 11.7295 13.1916 11.7547C13.1309 11.7799 13.0658 11.7929 13 11.7929C12.9342 11.7929 12.8691 11.7799 12.8084 11.7547C12.7476 11.7295 12.6924 11.6926 12.646 11.646L9.354 8.354C9.26024 8.26026 9.13308 8.20761 9.0005 8.20761C8.86792 8.20761 8.74076 8.26026 8.647 8.354L2 15" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 18V21" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14V21" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-base text-dark-neutral text-center font-sora">Hohere Abschreibungen</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 9L9 15" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9H9.01" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 15H15.01" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-base text-dark-neutral text-center font-sora">Hohere Einsparung</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 6L12 11L17 6" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 13L12 18L17 13" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-base text-dark-neutral text-center font-sora">Niedrigere Steuerlast</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 18L12 13L17 18" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11L12 6L17 11" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-base text-dark-neutral text-center font-sora">Hohere Rendite</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
          <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora mb-16 max-w-3xl">
            Erhalten Sie von uns problemlos weitere Gutachten und Dokumente für Ihre Immobilien
          </h2>

          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-darkslategray-200 rounded-lg bg-gradient-to-b from-darkslategray-100 to-transparent space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-normal text-dark-neutral font-sora">Restnutzungsdauergutachten</h3>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27193 1H10.0499V8.778M9.16993 1.879L2.02393 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.
                </p>
              </div>

              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-normal text-dark-neutral font-sora">Kaufpreisteilungsberechnung</h3>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27193 1H10.0499V8.778M9.16993 1.879L2.02393 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Transparente Aufteilung des Kaufpreises – für steuerliche und finanzielle Klarheit.
                </p>
              </div>

              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-normal text-dark-neutral font-sora">Verkehrswergutachten</h3>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27193 1H10.0499V8.778M9.16993 1.879L2.02393 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Ein Gutachten für die Restnutzungsdauer Ihrer Immobilie hat mehrere Vorteile für Sie:
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-normal text-dark-neutral font-sora">(Technische) Kaufberatungs</h3>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27193 1H10.0499V8.778M9.16993 1.879L2.02393 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.
                </p>
              </div>

              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-normal text-dark-neutral font-sora">Energieausweis: Bedarf</h3>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27193 1H10.0499V8.778M9.16993 1.879L2.02393 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Transparente Aufteilung des Kaufpreises – für steuerliche und finanzielle Klarheit.
                </p>
              </div>

              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-normal text-dark-neutral font-sora">Energieausweis: Verbrauch</h3>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27193 1H10.0499V8.778M9.16993 1.879L2.02393 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Fundierte Wertgutachten vom Experten - für Kauf, Verkauf oder Erbschaftssteuer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gradient-to-b from-cadetblue to-white py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 mb-10">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora">
                  Der Ablauf
                </h2>
                <p className="text-sm font-semibold text-dark-gray uppercase tracking-tight font-inter">
                  Einfach<br />transparent<br />unverbindlich
                </p>
              </div>

              <p className="text-base text-dark-gray leading-relaxed font-inter">
                Ein Immobiliengutachten muss nicht kompliziert sein. Bei uns starten Sie mit einer kostenfreien Ersteinschätzung – ohne Verpflichtung, aber mit maximaler Transparenz. So wissen Sie von Anfang an, was sinnvoll und wirtschaftlich ist.
              </p>

              <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral">
                <span className="font-inter text-sm font-semibold text-light-neutral">Free Initial Assesment</span>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>

            <div 
              className="rounded-lg bg-gutachten-accent bg-blend-multiply p-16 flex items-center justify-center min-h-[400px]"
              style={{
                backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/58dc846344777a6cd6a104b9ff3ab5c7c6d0677c?width=842')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <svg width="286" height="300" viewBox="0 0 286 300" fill="none">
                <path d="M68 243.595C68 242.178 68.698 240.886 69.8702 240.073L210.128 142.786C211.684 141.706 213.766 141.742 215.283 142.875L329.354 228.028C331.617 229.717 331.692 233.058 329.507 234.847L296.122 262.165C294.551 263.45 292.294 263.495 290.673 262.273L215.253 205.431C213.751 204.299 211.686 204.246 210.127 205.299L118.161 267.41C116.963 268.219 116.246 269.563 116.246 270.999V389.866C116.246 392.265 118.21 394.211 120.632 394.211H215.619C216.595 394.211 217.542 393.889 218.312 393.295L274.492 350.013C275.811 348.998 275.085 346.904 273.415 346.904H230.282C227.86 346.904 225.896 344.959 225.896 342.559V307.803C225.896 305.404 227.86 303.459 230.282 303.459H349.614C352.036 303.459 354 305.404 354 307.803V437.655C354 440.055 352.036 442 349.614 442H310.333C307.911 442 305.947 440.055 305.947 437.655V387.361C305.947 385.891 304.219 385.085 303.075 386.022L235.884 441.005C235.098 441.648 234.11 442 233.091 442H72.386C69.9637 442 68 440.134 68 437.734C68 415.047 68 307.189 68 243.595Z" fill="white"/>
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 border border-darkslategray-200 rounded-lg bg-white space-y-6">
              <span className="text-xl font-bold text-gutachten-accent font-sora">1</span>
              <div className="space-y-10">
                <h3 className="text-xl font-normal text-dark-neutral font-sora">
                  Unverbindliche<br />Ersteinschätzung
                </h3>
                <p className="text-base text-dark-gray leading-relaxed font-inter">
                  Senden Sie uns die Eckdaten Ihrer Immobilie. Unsere Sachverständigen prüfen kostenlos und ehrlich, ob sich ein Gutachten für Sie lohnt.
                </p>
              </div>
            </div>

            <div className="p-6 border border-darkslategray-200 rounded-lg bg-white space-y-6">
              <span className="text-xl font-bold text-gutachten-accent font-sora">2</span>
              <div className="space-y-10">
                <h3 className="text-xl font-normal text-dark-neutral font-sora">
                  Detailliertes<br />Gutachten erhalten
                </h3>
                <p className="text-base text-dark-gray leading-relaxed font-inter">
                  Sie erhalten ein professionelles, individuelles und plausibiliertes Gutachten, als verlässliche Grundlage für Ihre nächsten Schritte.
                </p>
              </div>
            </div>

            <div className="p-6 border border-darkslategray-200 rounded-lg bg-white space-y-6">
              <span className="text-xl font-bold text-gutachten-accent font-sora">3</span>
              <div className="space-y-10">
                <h3 className="text-xl font-normal text-dark-neutral font-sora">
                  Bei Bedarf: Gutachten beauftragen
                </h3>
                <p className="text-base text-dark-gray leading-relaxed font-inter">
                  Auf Wunsch erstellen wir ein vollumfängliches Gutachten und erklären Ablauf, Aufwand und Kosten – transparent und planbar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <p className="text-sm font-semibold text-dark-gray uppercase tracking-tight font-inter">
                echte Praxisbeispiele und überzeugende Ergebnisse.
              </p>
              
              <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora">
                Steuerersparnis mit verkürzter Nutzungsdauer
              </h2>

              <p className="text-base text-dark-gray leading-relaxed font-inter">
                Unsere Gutachten schaffen messbare Vorteile: Immobilienbesitzer sparen durch die reduzierte Nutzungsdauer jedes Jahr tausende Euro an Steuern. Ob Eigentumswohnung, Einfamilienhaus, Mehrfamilienhaus oder Gewerbeobjekt – wir zeigen Ihnen, wie Sie durch gezielte Abschreibungen Ihre Steuerlast deutlich senken können.
              </p>

              <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral">
                <span className="font-inter text-sm font-semibold text-light-neutral">Steuerersparnis berechnen</span>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>

            <div className="space-y-16">
              {[1, 2, 3].map((item) => (
                <div key={item} className="grid md:grid-cols-2 gap-8">
                  <div 
                    className="bg-gray-200 rounded-lg h-64 bg-cover bg-center p-4"
                    style={{
                      backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/${item === 1 ? 'df033ba44eef8ecb23bc979f1ad1c89ae5d2f44e' : item === 2 ? '2f092116308596194100ee748e016058200f45af' : '43ba95b6e288932d45a0ca6b035b273d9f076a6e'}?width=763')`
                    }}
                  >
                    <span className="inline-block px-3 py-2 bg-light-neutral border border-darkslategray-200 rounded-full text-sm text-dark-neutral font-inter">
                      Mehrfamilienhaus
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-dark-gray font-inter">Gebäudewert</span>
                        <span className="text-sm font-semibold text-dark-neutral font-inter">8.413.000 €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-dark-gray font-inter">Steuerersparnis</span>
                        <span className="text-sm font-semibold text-dark-neutral font-inter">3.350 € / Jahr</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-dark-gray font-inter">Restnutzungsdauer</span>
                        <span className="text-sm font-semibold text-dark-neutral font-inter">23 Jahre</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.93799 8.84009H1.87402C1.73595 8.84009 1.62402 8.95202 1.62402 9.09009V11.1389C1.62402 11.2769 1.73595 11.3889 1.87402 11.3889H7.91542C7.97246 11.3889 8.02772 11.3701 8.07169 11.3358L11.8306 8.40335C11.8946 8.35342 11.9913 8.3964 11.9913 8.4748V11.1572C11.9913 11.2851 12.1012 11.3889 12.2367 11.3889H14.4342C14.5697 11.3889 14.6796 11.2851 14.6796 11.1572V4.23171C14.6796 4.10374 14.5697 4 14.4342 4H7.75829C7.62278 4 7.51292 4.10374 7.51292 4.23171V6.08536C7.51292 6.21333 7.62278 6.31706 7.75829 6.31706H10.1713C10.2648 6.31706 10.3053 6.42873 10.2316 6.48291L7.08863 8.79128C7.04556 8.82292 6.99256 8.84009 6.93799 8.84009Z" fill="#FF985C"/>
                        </svg>
                        <span className="text-sm text-dark-neutral font-inter">Modernisierung der Heizungsanlage: 2016</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.93799 8.84009H1.87402C1.73595 8.84009 1.62402 8.95202 1.62402 9.09009V11.1389C1.62402 11.2769 1.73595 11.3889 1.87402 11.3889H7.91542C7.97246 11.3889 8.02772 11.3701 8.07169 11.3358L11.8306 8.40335C11.8946 8.35342 11.9913 8.3964 11.9913 8.4748V11.1572C11.9913 11.2851 12.1012 11.3889 12.2367 11.3889H14.4342C14.5697 11.3889 14.6796 11.2851 14.6796 11.1572V4.23171C14.6796 4.10374 14.5697 4 14.4342 4H7.75829C7.62278 4 7.51292 4.10374 7.51292 4.23171V6.08536C7.51292 6.21333 7.62278 6.31706 7.75829 6.31706H10.1713C10.2648 6.31706 10.3053 6.42873 10.2316 6.48291L7.08863 8.79128C7.04556 8.82292 6.99256 8.84009 6.93799 8.84009Z" fill="#FF985C"/>
                        </svg>
                        <span className="text-sm text-dark-neutral font-inter">keine Außendämmung vorhanden</span>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="space-y-4">
                        <p className="text-sm font-semibold text-dark-neutral font-inter">Bj. 1996</p>
                        <p className="text-sm text-dark-gray font-inter">1904</p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-semibold text-dark-neutral font-inter">Einheiten</p>
                        <p className="text-sm text-dark-gray font-inter">42</p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-semibold text-dark-neutral font-inter">m2</p>
                        <p className="text-sm text-dark-gray font-inter">4206,6</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expert Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Image 
              src="https://api.builder.io/api/v1/image/assets/TEMP/7d0a426eebd673d55680b3fdbfae1f2b82821039?width=1312" 
              alt="Felix Holfert" 
              width={656}
              height={600}
              className="w-full"
            />

            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora">
                  Felix Holfert
                </h2>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Real estate appraiser according to DIN ISO 17 0 24
                </p>
              </div>

              <p className="text-sm text-dark-gray leading-relaxed font-inter">
                Find out whether a remaining useful life appraisal is worthwhile for your property—and how much tax you could save as a result. The initial assessment is free, non-binding, and available digitally.
                <br /><br />
                Simply click on the button and discover your personal depreciation potential – with no obligations and no hidden costs.
              </p>

              <div className="flex flex-wrap gap-6">
                <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral">
                  <span className="font-inter text-sm font-semibold text-light-neutral">Steuerersparnis berechnen</span>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </button>

                <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral">
                  <span className="font-inter text-sm font-semibold text-light-neutral">Steuerersparnis berechnen</span>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factors Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora max-w-2xl">
              Restnutzungsdauergutachten in Berlin - einfach, schnell und steuerwirksam
            </h2>
            
            <button className="flex items-center gap-6 px-4 py-2 rounded-lg bg-dark-neutral whitespace-nowrap">
              <span className="font-inter text-sm font-semibold text-light-neutral">Free Initial Assesment</span>
              <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                <path d="M2.27144 1H10.0494V8.778M9.16944 1.879L2.02344 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 8H16V22H22V9C22 8.448 21.552 8 21 8ZM20 20H18V18H20V20ZM20 16H18V14H20V16ZM20 12H18V10H20V12Z" fill="#B9BEC1"/>
                  <path d="M8 8H3C2.448 8 2 8.448 2 9V22H8V8ZM6 20H4V18H6V20ZM6 16H4V14H6V16ZM4 12V10H6V12H4Z" fill="#B9BEC1"/>
                  <path d="M16 3C16 2.448 15.552 2 15 2H9C8.448 2 8 2.448 8 3V22H11V19C11 18.448 11.448 18 12 18C12.552 18 13 18.448 13 19V22H16V3ZM13 15H11V13H13V15ZM13 11H11V9H13V11ZM13 7H11V5H13V7Z" fill="#365954"/>
                </svg>
                <h3 className="text-xl font-normal text-dark-neutral font-sora">
                  Art der Immobilie - Einfluss auf die Restnutzungsdauer
                </h3>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Die Art der Immobilie hat erheblichen Einfluss auf die Einschätzung der Restnutzungsdauer. Ob Einfamilienhaus, Eigentumswohnung oder Gewerbeeinheit – jeder Immobilientyp ist unterschiedlichen Nutzungsbelastungen und Abnutzungsfaktoren ausgesetzt. Diese Unterschiede werden im Nutzungsdauergutachten berücksichtigt und fließen direkt in die Bewertung der tatsächlichen Lebensdauer ein.
                </p>
              </div>

              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10.921 9.83387C10.24 9.64487 9.655 9.29987 9.184 8.83887L9.185 8.83987L6.166 14.0169C6.109 14.0139 6.057 13.9999 6 13.9999C6.79 14.0019 7.526 14.2339 8.144 14.6329L8.128 14.6239L10.921 9.83387Z" fill="#B9BEC1"/>
                  <path d="M14.817 8.83789C14.347 9.29989 13.763 9.64689 13.11 9.83089L13.082 9.83789L15.882 14.6239C16.481 14.2359 17.213 14.0029 17.999 13.9999C17.946 13.9999 17.9 14.0139 17.845 14.0159L14.817 8.83789Z" fill="#B9BEC1"/>
                  <path d="M14 18.0002C14.005 17.6422 14.056 17.2992 14.148 16.9722L14.141 17.0002H9.85903C9.94803 17.3002 10 17.6442 10 18.0002C10 18.3562 9.94903 18.7002 9.85303 19.0262L9.85903 19.0002H14.141C14.056 18.7012 14.005 18.3582 14 18.0032V18.0002Z" fill="#B9BEC1"/>
                  <path d="M22 18C22 20.209 20.209 22 18 22C15.791 22 14 20.209 14 18C14 15.791 15.791 14 18 14C20.209 14 22 15.791 22 18Z" fill="#5B4566"/>
                  <path d="M10 18C10 20.209 8.209 22 6 22C3.791 22 2 20.209 2 18C2 15.791 3.791 14 6 14C8.209 14 10 15.791 10 18Z" fill="#5B4566"/>
                  <path d="M16 6C16 8.209 14.209 10 12 10C9.791 10 8 8.209 8 6C8 3.791 9.791 2 12 2C14.209 2 16 3.791 16 6Z" fill="#5B4566"/>
                </svg>
                <h3 className="text-xl font-normal text-dark-neutral font-sora">
                  Baujahr - Basis für die technische Lebensdauer Ihrer Immobilie
                </h3>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Das Baujahr liefert zentrale Hinweise zur Bauweise, zum verwendeten Material und zum typischen Verschleißverhalten einer Immobilie. Je älter das Gebäude, desto relevanter ist eine individuelle Einschätzung der Restnutzungsdauer. Ein professionelles Nutzungsdauergutachten bewertet genau diese Faktoren – und schafft so die Grundlage für eine fundierte steuerliche Optimierung.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 3C19 2.448 18.552 2 18 2C17.448 2 17 2.448 17 3V6L12 2L2 10H22L19 7.6V3Z" fill="#B9BEC1"/>
                  <path d="M4 22H10V18C10 16.895 10.895 16 12 16C13.105 16 14 16.895 14 18V22H20V10H4V22ZM16 12H18V14H16V12ZM16 16H18V18H16V16ZM10 12H14V14H10V12ZM6 12H8V14H6V12ZM6 16H8V18H6V16Z" fill="#70484F"/>
                </svg>
                <h3 className="text-xl font-normal text-dark-neutral font-sora">
                  Modernisierungen - Verlängern sie die Restnutzungsdauer?
                </h3>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Durchgeführte Modernisierungen beeinflussen die Restnutzungsdauer oft erheblich. Erneuerungen an Dach, Fassade, Fenstern, Heizung oder Bädern können die technische Lebensdauer verlängern und den baulichen Zustand verbessern. Diese Angaben fließen direkt in das Restnutzungsdauergutachten ein – und helfen dabei, eine realistische und steuerlich wirksame Einschätzung vorzunehmen.
                </p>
              </div>

              <div className="p-6 border border-darkslategray-200 rounded-lg space-y-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 2.66504H15.5859C15.6745 2.66508 15.7595 2.70016 15.8223 2.7627L19.2373 6.17773C19.2998 6.24048 19.3349 6.32546 19.335 6.41406V21C19.335 21.0888 19.3001 21.1745 19.2373 21.2373C19.1745 21.3001 19.0888 21.335 19 21.335H5C4.91115 21.335 4.82552 21.3001 4.7627 21.2373C4.69987 21.1745 4.66504 21.0888 4.66504 21V3C4.66504 2.91115 4.69987 2.82552 4.7627 2.7627C4.82552 2.69987 4.91115 2.66504 5 2.66504Z" stroke="#B9BEC1" strokeWidth="1.33"/>
                  <path d="M13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17V16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15C12.2652 15 12.5196 15.1054 12.7071 15.2929C12.8946 15.4804 13 15.7348 13 16V17Z" fill="#57543D"/>
                  <path d="M10.127 5.68185C10.4585 5.40473 10.8472 5.20443 11.2653 5.09533C11.6833 4.98624 12.1204 4.97105 12.545 5.05085C13.1539 5.17887 13.7098 5.48806 14.1397 5.9378C14.5697 6.38755 14.8535 6.95683 14.954 7.57085C15.0789 8.25896 14.9707 8.96908 14.6465 9.58874C14.3222 10.2084 13.8005 10.7022 13.164 10.9919C13.1084 11.0329 13.0643 11.0873 13.0356 11.1501C13.0069 11.2129 12.9946 11.282 13 11.3509V11.9999C13 12.2651 12.8946 12.5194 12.7071 12.707C12.5196 12.8945 12.2652 12.9999 12 12.9999C11.7348 12.9999 11.4804 12.8945 11.2929 12.707C11.1053 12.5194 11 12.2651 11 11.9999V11.3509C10.9898 10.8927 11.1133 10.4416 11.3554 10.0525C11.5974 9.66338 11.9476 9.35321 12.363 9.15985C12.5913 9.0483 12.776 8.8639 12.8879 8.63575C12.9998 8.4076 13.0326 8.14868 12.981 7.89985C12.9499 7.69052 12.8572 7.49517 12.7147 7.33865C12.5723 7.18213 12.3865 7.07151 12.181 7.02085C12.0451 6.99314 11.9047 6.99675 11.7704 7.0314C11.6361 7.06606 11.5115 7.13085 11.406 7.22085C11.2771 7.33211 11.1744 7.47049 11.1053 7.62608C11.0361 7.78167 11.0022 7.95063 11.006 8.12085C11.006 8.38607 10.9006 8.64042 10.7131 8.82796C10.5256 9.0155 10.2712 9.12085 10.006 9.12085C9.74078 9.12085 9.48642 9.0155 9.29889 8.82796C9.11135 8.64042 9.00599 8.38607 9.00599 8.12085C9.00173 7.65685 9.1 7.19763 9.29379 6.77601C9.48757 6.35439 9.77208 5.98078 10.127 5.68185Z" fill="#57543D"/>
                </svg>
                <h3 className="text-xl font-normal text-dark-neutral font-sora">
                  Baulicher Zustand & Besonderheiten - entscheidend für die Bewertung
                </h3>
                <p className="text-sm text-dark-gray leading-relaxed font-inter">
                  Der bauliche Zustand einer Immobilie ist ein zentraler Faktor im Nutzungsdauergutachten. Schäden, Abnutzung oder Sanierungsbedarf verkürzen die Restnutzungsdauer – während ein gepflegter Zustand diese deutlich verlängern kann. Auch individuelle Besonderheiten wie Ausstattungsqualität oder energetische Sanierungen werden berücksichtigt und beeinflussen das Ergebnis des Gutachtens direkt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-light-neutral py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            <h2 className="text-3xl lg:text-4xl font-medium text-dark-neutral leading-tight font-sora">
              Häufig gestellte Fragen
            </h2>

            <div className="flex-1 max-w-3xl space-y-10">
              <div className="space-y-10">
                <h3 className="text-2xl font-medium text-dark-gray font-sora">Category Title</h3>
                
                <div className="space-y-10">
                  <div className="pb-10 border-b border-darkslategray-200 space-y-10">
                    <div className="flex justify-between items-center gap-4">
                      <h4 className="text-lg font-normal text-dark-neutral font-sora flex-1">
                        Welche Zertifizierungen haben unsere Sachverständigen und Gutachter?
                      </h4>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 19V5" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 12L12 5L5 12" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-dark-gray leading-loose font-inter">
                      Unsere Partner-Sachverständigen sind nach nationalen und internationalen Standards zertifiziert, die höchste Anerkennung und Akzeptanz garantieren. Sie verfügen unter anderem über die Zertifizierung nach DIN EN ISO/IEC 17024, einem international anerkannten Standard zur Personenzertifizierung. Dadurch ist sichergestellt, dass die von uns erstellten Gutachten von Ämtern, Behörden und Gerichten vollumfänglich anerkannt werden.
                    </p>
                  </div>

                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="pb-10 border-b border-darkslategray-200">
                      <div className="flex justify-between items-center gap-4">
                        <h4 className="text-lg font-normal text-dark-neutral font-sora flex-1">
                          Welche Zertifizierungen haben unsere Sachverständigen und Gutachter?
                        </h4>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5V19" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 12L12 19L5 12" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-10">
                <h3 className="text-2xl font-medium text-dark-gray font-sora">Category Title</h3>
                
                <div className="space-y-10">
                  <div className="pb-10 border-b border-darkslategray-200 space-y-10">
                    <div className="flex justify-between items-center gap-4">
                      <h4 className="text-lg font-normal text-dark-neutral font-sora flex-1">
                        Welche Zertifizierungen haben unsere Sachverständigen und Gutachter?
                      </h4>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 19V5" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 12L12 5L5 12" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-dark-gray leading-loose font-inter">
                      Unsere Partner-Sachverständigen sind nach nationalen und internationalen Standards zertifiziert, die höchste Anerkennung und Akzeptanz garantieren. Sie verfügen unter anderem über die Zertifizierung nach DIN EN ISO/IEC 17024, einem international anerkannten Standard zur Personenzertifizierung. Dadurch ist sichergestellt, dass die von uns erstellten Gutachten von Ämtern, Behörden und Gerichten vollumfänglich anerkannt werden.
                    </p>
                  </div>

                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="pb-10 border-b border-darkslategray-200">
                      <div className="flex justify-between items-center gap-4">
                        <h4 className="text-lg font-normal text-dark-neutral font-sora flex-1">
                          Welche Zertifizierungen haben unsere Sachverständigen und Gutachter?
                        </h4>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5V19" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 12L12 19L5 12" stroke="#FF985C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-neutral py-32">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-16 space-y-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              <svg width="171" height="22" viewBox="0 0 171 22" fill="none">
                <path d="M2 7.45033C2 7.34638 2.05125 7.25166 2.13732 7.19203L12.4359 0.0576242C12.5502 -0.0215528 12.7031 -0.0189131 12.8145 0.0641626L21.1903 6.30869C21.3565 6.43261 21.362 6.67761 21.2016 6.80875L18.7502 8.81208C18.6349 8.90633 18.4691 8.90961 18.3501 8.82L12.8123 4.65164C12.702 4.56862 12.5504 4.56472 12.4359 4.64195L5.68317 9.1967C5.59518 9.25605 5.54254 9.35459 5.54254 9.45994V18.1768C5.54254 18.3528 5.68673 18.4954 5.86459 18.4954H12.8392C12.9108 18.4954 12.9804 18.4718 13.0369 18.4283L17.162 15.2543C17.2588 15.1798 17.2056 15.0263 17.0829 15.0263H13.9158C13.738 15.0263 13.5938 14.8836 13.5938 14.7077V12.1589C13.5938 11.983 13.738 11.8403 13.9158 11.8403H22.6779C22.8558 11.8403 23 11.983 23 12.1589V21.6814C23 21.8574 22.8558 22 22.6779 22H19.7937C19.6158 22 19.4716 21.8574 19.4716 21.6814V17.9932C19.4716 17.8854 19.3448 17.8263 19.2608 17.8949L14.3272 21.927C14.2694 21.9742 14.1969 22 14.122 22H2.32205C2.14419 22 2 21.8631 2 21.6872C2 20.0234 2 12.1138 2 7.45033Z" fill="#F8FAFB"/>
                <path d="M38.5219 20.7779C33.0105 20.7779 31 17.2716 31 13.2348C31 9.19799 32.6341 4.79955 38.8371 4.79955C43.5438 4.79955 45.5646 7.60758 45.5646 9.80518H42.5755C42.4178 8.62255 41.6747 7.46513 38.8371 7.46513C34.735 7.46513 33.8013 10.213 33.8013 13.2348C33.8013 16.2566 34.8571 18.1774 38.657 18.1774C41.4044 18.1774 42.2437 16.2195 42.2437 15.595H38.657V13.2039H45.6322V20.6164H43.1385V18.3327C42.2827 19.809 40.909 20.7779 38.5219 20.7779Z" fill="#F8FAFB"/>
                <path d="M51.5503 20.7002C47.7444 20.7002 47.0012 18.5549 47.0012 15.2102V8.84872H49.8327V15.3947C49.8327 17.5169 50.6824 18.1459 52.2259 18.1459C53.7243 18.1459 54.7091 17.4246 54.7091 15.2794V8.84872H57.6082V20.5387H55.0443V18.8318C54.6165 19.6853 54.1401 20.7002 51.5503 20.7002Z" fill="#F8FAFB"/>
                <path d="M65.9888 20.631C62.1829 20.8617 60.584 19.939 60.584 17.1478V11.1902H58.94V8.84872H60.584V4.78378H63.3929V8.84872H66.9225L65.9888 11.1902H63.4605V17.1478C63.4605 18.2551 64.4228 18.2843 65.9888 18.169V20.631Z" fill="#F8FAFB"/>
                <path d="M71.2574 20.7002C68.7802 20.7002 67.1587 19.2042 67.1587 16.7129C67.1587 14.5446 68.3504 13.3919 71.4886 13.3919C73.1461 13.3919 74.754 13.3919 74.754 13.3919C74.6865 11.9325 74.1864 11.2399 72.6926 11.1902C71.6186 11.1545 70.4514 11.479 70.4514 12.4089H67.8759C67.8759 10.4419 69.0834 8.84872 72.6701 8.84872C76.443 8.84872 77.688 10.6428 77.688 13.8261V20.5387H75.1202V18.7625C74.5797 19.6852 73.6445 20.7002 71.2574 20.7002ZM69.7511 16.7129C69.7511 17.7971 70.6433 18.169 71.8654 18.169C73.2512 18.169 74.754 17.7003 74.754 15.6473V15.2782C74.754 15.2782 73.2527 15.2782 71.9555 15.2782C70.4514 15.2782 69.7511 15.7902 69.7511 16.7129Z" fill="#F8FAFB"/>
                <path d="M84.7062 20.7002C80.1572 20.7002 79.3732 18.2751 79.1971 15.1117C79.0112 11.774 80.2022 8.84872 84.6612 8.84872C88.1743 8.84872 89.7336 10.4393 89.7336 13.3919H87.1388C86.9812 12.0478 86.1386 11.479 84.6913 11.479C82.6809 11.479 82.1186 12.805 82.1186 15.0886C82.1186 16.8479 83.0277 18.0998 84.6387 18.0998C86.086 18.0998 86.9812 17.6092 87.1388 16.3804H89.7336C89.7336 18.8087 88.2419 20.7002 84.7062 20.7002Z" fill="#F8FAFB"/>
                <path d="M91.0459 20.5387V4.78378H93.8774V10.2045C94.3278 9.35102 95.3412 8.84872 97.0812 8.84872C100.842 8.84872 101.608 10.7581 101.608 14.1491V20.5387H98.7538V13.9184C98.7538 12.6604 98.3935 11.121 96.4056 11.121C94.9072 11.121 93.9224 11.6808 93.9224 13.9184L93.8774 20.5387H91.0459Z" fill="#F8FAFB"/>
                <path d="M115.858 20.7002C111.219 20.7002 110.071 17.7706 110.071 14.6104C110.071 11.4502 111.845 8.84872 115.505 8.84872C119.295 8.84872 121.038 11.2399 120.571 15.2782H113.037C113.037 17.4568 114.105 18.0998 115.972 18.0998C117.139 18.0998 117.84 17.6959 118.049 16.9172H120.571C120.368 18.924 119.007 20.7002 115.858 20.7002ZM113.06 13.3919H117.84C117.862 12.2554 117.11 11.1902 115.505 11.1902C114.187 11.1902 113.172 11.6618 113.06 13.3919Z" fill="#F8FAFB"/>
                <path d="M133.947 20.5387V17.7245H137.238V20.5387H133.947Z" fill="#F8FAFB"/>
                <path d="M143.771 20.7002C139.244 20.7002 138.073 17.7706 138.073 14.6335C138.073 11.5194 139.267 8.56672 143.793 8.56672C148.275 8.56672 149.513 11.5194 149.513 14.6335C149.513 17.7937 148.275 20.7002 143.771 20.7002ZM140.995 14.6335C140.995 16.3928 141.58 18.1742 143.771 18.1742C146.006 18.1742 146.592 16.4389 146.592 14.6335C146.592 12.9203 146.051 11.1374 143.793 11.1374C141.58 11.1374 140.995 12.8972 140.995 14.6335Z" fill="#F8FAFB"/>
                <path d="M150.961 20.5387V8.56672H153.556V10.366C154.254 8.84353 154.857 8.42832 156.906 8.56672V11.1374C154.49 11.1374 153.837 11.5424 153.837 14.3105V20.5387H150.961Z" fill="#F8FAFB"/>
                <path d="M165.462 22C165.462 21.2504 165.161 20.9634 163.127 21.0435C159.027 21.205 157.058 20.9694 157.058 18.4133C157.058 17.3291 157.913 16.2943 159.197 15.9945C157.891 15.3024 157.463 14.1952 157.463 12.8573C157.463 8.7282 161.607 8.56672 163.116 8.56672H168.543V11.1374H166.746C167.213 11.3765 167.845 11.9976 167.845 13.2033C167.845 15.3486 166.899 16.9864 162.8 17.1017C160.413 17.1709 160.009 17.638 160.092 18.1742C160.234 19.0788 162.079 18.5123 163.138 18.4133C165.695 18.1742 168.73 18.567 168.73 22H165.462ZM160.385 13.0187C160.385 13.8554 161.324 14.5875 162.643 14.5875C163.893 14.5875 164.878 13.9015 164.878 12.9495C164.878 12.1591 164.428 11.1374 162.643 11.1374C160.88 11.1374 160.385 12.136 160.385 13.0187Z" fill="#F8FAFB"/>
                <path d="M109.436 20.631C105.63 20.8617 104.031 19.939 104.031 17.1478V11.1902H102.387V8.84872H104.031V4.78378H106.84V8.84872H110.37L109.436 11.1902H106.908V17.1478C106.908 18.2551 107.87 18.2843 109.436 18.169V20.631Z" fill="#F8FAFB"/>
                <path d="M128.1 8.84872C131.439 8.84872 132.649 10.7283 132.649 14.0731V20.5551H129.817V13.8886C129.817 11.7664 128.967 11.1374 127.424 11.1374C125.926 11.1374 124.941 11.8586 124.941 14.0039V20.5551L122.042 20.5551V8.74452H124.606V10.4515C125.033 9.59802 125.51 8.84872 128.1 8.84872Z" fill="#F8FAFB"/>
              </svg>

              <p className="text-base font-medium text-light-gray leading-relaxed font-sora max-w-md">
                Die Gutachten-Komplettlösung für Investoren, Eigentümer und Immobilienprofis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white font-sora mb-4">Beliebt</h3>
                <div className="space-y-1">
                  <Link href="#" className="flex items-center gap-2 text-sm text-gutachten-accent font-inter hover:underline">
                    <span>Afa-Rechner</span>
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                      <path d="M2.27193 1H10.0499V8.778M9.16993 1.879L2.02393 9.026" stroke="#FF985C" strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                  </Link>
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    Restnutzungsdauer berechnen
                  </Link>
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    FAQ - Häufig gestellte Fragen
                  </Link>
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    Immobilienlexikon Gutachten und Bewertung
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white font-sora mb-4">Seiten</h3>
                <div className="space-y-1">
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    Impressum
                  </Link>
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    AGB
                  </Link>
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    Datenschutz
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white font-sora mb-4">Standorte</h3>
                <div className="space-y-1">
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    Berlin
                  </Link>
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    Frankfurt am Main
                  </Link>
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    Hamburg
                  </Link>
                  <Link href="#" className="block text-sm text-light-gray font-inter hover:text-white">
                    Köln
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white font-sora mb-4">Kontakt</h3>
                <div className="space-y-1">
                  <Link href="tel:04216485648 5" className="block text-sm text-light-gray font-inter hover:text-white">
                    0421 6485 6485
                  </Link>
                  <Link href="mailto:support@gutachten.org" className="block text-sm text-light-gray font-inter hover:text-white">
                    support@gutachten.org
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-dark-gray flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-light-gray font-inter leading-relaxed">
              © 2025 Gutachten.org (Evalion GmbH). Alle Rechte vorbehalten.<br />
              Entworfen von Defijn.
            </p>

            <div className="flex items-center gap-6">
              <Link href="#" className="w-10 h-10 flex items-center justify-center bg-dark-neutral hover:bg-gray-700 transition">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6.75 6H4.5V9H6.75V18H10.5V9H13.2315L13.5 6H10.5V4.74975C10.5 4.0335 10.644 3.75 11.3362 3.75H13.5V0H10.644C7.947 0 6.75 1.18725 6.75 3.46125V6Z" fill="white"/>
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center bg-dark-neutral hover:bg-gray-700 transition">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.62225C11.403 1.62225 11.688 1.63125 12.6375 1.67475C15.0765 1.78575 16.2157 2.943 16.3267 5.364C16.3702 6.31275 16.3785 6.59775 16.3785 9.00075C16.3785 11.4045 16.3695 11.6888 16.3267 12.6375C16.215 15.0563 15.0788 16.2157 12.6375 16.3267C11.688 16.3702 11.4045 16.3793 9 16.3793C6.597 16.3793 6.312 16.3702 5.36325 16.3267C2.91825 16.215 1.785 15.0525 1.674 12.6368C1.6305 11.688 1.6215 11.4037 1.6215 9C1.6215 6.597 1.63125 6.31275 1.674 5.36325C1.78575 2.943 2.922 1.785 5.36325 1.674C6.31275 1.63125 6.597 1.62225 9 1.62225ZM9 0C6.55575 0 6.24975 0.0105 5.28975 0.054C2.02125 0.204 0.20475 2.0175 0.05475 5.289C0.0105 6.24975 0 6.55575 0 9C0 11.4443 0.0105 11.751 0.054 12.711C0.204 15.9795 2.0175 17.796 5.289 17.946C6.24975 17.9895 6.55575 18 9 18C11.4443 18 11.751 17.9895 12.711 17.946C15.9765 17.796 17.7975 15.9825 17.9453 12.711C17.9895 11.751 18 11.4443 18 9C18 6.55575 17.9895 6.24975 17.946 5.28975C17.799 2.02425 15.9832 0.20475 12.7117 0.05475C11.751 0.0105 11.4443 0 9 0ZM9 4.3785C6.44775 4.3785 4.3785 6.44775 4.3785 9C4.3785 11.5523 6.44775 13.6223 9 13.6223C11.5523 13.6223 13.6215 11.553 13.6215 9C13.6215 6.44775 11.5523 4.3785 9 4.3785ZM9 12C7.34325 12 6 10.6575 6 9C6 7.34325 7.34325 6 9 6C10.6568 6 12 7.34325 12 9C12 10.6575 10.6568 12 9 12ZM13.8045 3.11625C13.2075 3.11625 12.7238 3.6 12.7238 4.19625C12.7238 4.7925 13.2075 5.27625 13.8045 5.27625C14.4008 5.27625 14.8837 4.7925 14.8837 4.19625C14.8837 3.6 14.4008 3.11625 13.8045 3.11625Z" fill="white"/>
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center bg-dark-neutral hover:bg-gray-700 transition">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5.05125 3.09375C5.05125 3.87056 4.42688 4.5 3.65625 4.5C2.88562 4.5 2.26125 3.87056 2.26125 3.09375C2.26125 2.3175 2.88562 1.6875 3.65625 1.6875C4.42688 1.6875 5.05125 2.3175 5.05125 3.09375ZM5.0625 5.625H2.25V14.625H5.0625V5.625ZM9.55238 5.625H6.75787V14.625H9.55294V9.90056C9.55294 7.27369 12.9442 7.05881 12.9442 9.90056V14.625H15.75V8.92631C15.75 4.49381 10.7314 4.65525 9.55238 6.83719V5.625Z" fill="white"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
