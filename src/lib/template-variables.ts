// Centralized template variable definitions and processing
// This is the single source of truth for all template variable functionality
//
// VARIABLE SEPARATION:
// - SITE_TEMPLATE_VARIABLES: Variables extracted from multi-page-config.json (siteName, contactEmail, etc.)
// - PROGRAMMATIC_INSTANCE_TEMPLATE_VARIABLES: Variables specific to programmatic pages (programmaticInstance, programmaticInstanceSlug, etc.)
// - TEMPLATE_VARIABLES: Combined list of all template variables
//
// USAGE:
// - For site-only content: use createSiteTemplateContext()

import logger from "./logger";
// - For programmatic pages: use createTemplateContext(siteConfig, programmaticInstance, programmaticInstanceSlug)
// - For validation: use validateSiteTemplate() or validateProgrammaticInstanceTemplate()

export interface TemplateVariableDefinition {
  key: string;
  description: string;
  extractor: (siteConfig: any) => any;
  fallback?: any;
}

/**
 * Site configuration template variables
 * These variables are extracted from the multi-page-config.json site configuration
 */
export const SITE_TEMPLATE_VARIABLES: TemplateVariableDefinition[] = [
  {
    key: "siteId",
    description: "The id of the site from multi-page-config.json",
    extractor: (config) => config.id,
    fallback: "service-1",
  },
  {
    key: "siteName",
    description: "The name of the site from multi-page-config.json",
    extractor: (config) => config.name,
    fallback: "Our Service",
  },
  {
    key: "siteDescription",
    description: "The description of the site",
    extractor: (config) => config.description,
    fallback: "Professional service solutions",
  },
  {
    key: "contactEmail",
    description: "Contact email address",
    extractor: (config) => config.contact?.email,
    fallback: "contact@example.com",
  },
  {
    key: "contactPhone",
    description: "Contact phone number",
    extractor: (config) => config.contact?.phone,
    fallback: "+49 123 456 789",
  },
  {
    key: "domain",
    description: "Site domain",
    extractor: (config) => config.domain,
    fallback: "example.com",
  },
  {
    key: "address.street",
    description: "Street address",
    extractor: (config) => config.contact?.address?.street,
    fallback: "Service Street 123",
  },
  {
    key: "address.location",
    description: "Location",
    extractor: (config) => config.contact?.address?.location,
    fallback: "Berlin",
  },
  {
    key: "address.postalCode",
    description: "Postal code",
    extractor: (config) => config.contact?.address?.postalCode,
    fallback: "10115",
  },
  {
    key: "address.country",
    description: "Country",
    extractor: (config) => config.contact?.address?.country,
    fallback: "Germany",
  },
  {
    key: "social.facebook",
    description: "Facebook URL",
    extractor: (config) => config.social?.facebook,
    fallback: undefined,
  },
  {
    key: "social.twitter",
    description: "Twitter URL",
    extractor: (config) => config.social?.twitter,
    fallback: undefined,
  },
  {
    key: "social.instagram",
    description: "Instagram URL",
    extractor: (config) => config.social?.instagram,
    fallback: undefined,
  },
  {
    key: "social.linkedin",
    description: "LinkedIn URL",
    extractor: (config) => config.social?.linkedin,
    fallback: undefined,
  },
];

/**
 * City-specific address mappings for Google Maps
 * Add custom addresses for specific cities here
 */
const CITY_ADDRESS_MAPPINGS: Record<string, string> = {
  Berlin: "Brunnenstraße 178, 10119 Berlin, Deutschland",
  Bremen: "Schwarmer Weg 4, 28277 Bremen, Deutschland",
  Dresden: "Plauenscher Ring 31, 01187 Dresden, Deutschland",
};

/**
 * City-specific data for districts and surrounding cities
 */
interface CityData {
  districts: string;
  surroundingCities: string;
}

/**
 * City-specific data mapping for districts and surrounding cities
 * Add city-specific districts and surrounding cities here
 * Cities without specific data will use fallback values from getCityData()
 */
const CITY_DATA_MAP: Record<string, CityData> = {
  Berlin: {
    districts:
      "Alt-Hohenschönhausen, Alt-Treptow, Baumschulenweg, Biesdorf, Blankenburg, Blankenfelde, Borsigwalde, Britz, Buch, Buckow, Charlottenburg, Charlottenburg-Nord, Dahlem, Falkenberg, Falkenhagener Feld, Fennpfuhl, Französisch Buchholz, Friedenau, Friedrichsfelde, Friedrichshagen, Friedrichshain, Frohnau, Gatow, Gesundbrunnen, Gropiusstadt, Grünau, Grunewald, Hakenfelde, Halensee, Hansaviertel, Haselhorst, Heiligensee, Heinersdorf, Hellersdorf, Hermsdorf, Johannisthal, Karlshorst, Karow, Kaulsdorf, Kladow, Konradshöhe, Köpenick, Kreuzberg, Lankwitz, Lichtenberg, Lichtenrade, Lichterfelde, Lübars, Mahlsdorf, Malchow, Mariendorf, Marienfelde, Märkisches Viertel, Marzahn, Mitte, Moabit, Müggelheim, Neu-Hohenschönhausen, Neukölln, Niederschöneweide, Oberschöneweide, Niederschönhausen, Nikolassee, Pankow, Plänterwald, Prenzlauer Berg, Rahnsdorf, Reinickendorf, Rosenthal, Rudow, Rummelsburg, Schmargendorf, Schmöckwitz, Schöneberg, Siemensstadt, Spandau, Staaken, Stadtrandsiedlung Malchow, Steglitz, Tegel, Tegelort, Tempelhof, Tiergarten, Treptow, Waidmannslust, Wannsee, Wartenberg, Wedding, Weißensee, Westend, Wilhelmsruh, Wilmersdorf, Wittenau, Zehlendorf",
    surroundingCities:
      "Bernau bei Berlin, Blankenfelde‑Mahlow, Eberswalde, Königs Wusterhausen, Ludwigsfelde, Oranienburg, Strausberg, Potsdam und viele mehr",
  },
  Hamburg: {
    districts:
      "Alsterdorf, Altengamme, Altenwerder, Altona-Altstadt, Altona-Nord, Bahrenfeld, Barmbek-Nord, Barmbek-Süd, Bergedorf, Bergstedt, Billbrook, Billstedt, Blankenese, Borgfelde, Bramfeld, Cranz, Curslack, Duvenstedt, Eidelstedt, Eilbek, Eimsbüttel, Eißendorf, Eppendorf, Farmsen-Berne, Finkenwerder, Francop, Fuhlsbüttel, Georgswerder, Groß Borstel, Groß Flottbek, Gut Moor, HafenCity, Hamm, Hammerbrook, Harburg, Harvestehude, Heimfeld, Hoheluft-West, Hohenfelde, Horn, Hummelsbüttel, Iserbrook, Jenfeld, Kirchwerder, Kleiner Grasbrook, Langenbek, Langenhorn, Lemsahl-Mellingstedt, Lohbrügge, Lokstedt, Lurup, Marienthal, Marmstorf, Moorburg, Moorfleet, Mümmelmannsberg, Nettelnburg, Neuallermöhe, Neuenfelde, Neuengamme, Neugraben-Fischbek, Neuland, Neustadt, Niendorf, Nienstedten, Ochsenwerder, Osdorf, Othmarschen, Ottensen, Poppenbüttel, Rahlstedt, Reitbrook, Rissen, Rönneburg, Rothenburgsort, Rotherbaum, Sasel, Schnelsen, Spadenland, St. Georg, St. Pauli, Steilshoop, Steinwerder, Stellingen, Sülldorf, Tatenberg, Tonndorf, Uhlenhorst, Veddel, Volksdorf, Waltershof, Wandsbek, Wellingsbüttel, Wilhelmsburg, Wilstorf, Winterhude, Wohldorf-Ohlstedt",
    surroundingCities:
      "Ahrensburg, Bad Oldesloe, Buxtehude, Elmshorn, Henstedt-Ulzburg, Norderstedt, Pinneberg, Reinbek, Seevetal, Wedel",
  },
  München: {
    districts:
      "Allach-Untermenzing, Altaubing, Altstadt, Am Hart, Am Luitpoldpark, Am Moosfeld, Am Riesenfeld, Angerviertel, Arabellapark, Arnulfpark, Au, Aubing-Ost, Aubing, Barbaraviertel, Baumkirchen Mitte, Berg am Laim, Biederstein, Birkenleiten, Blumenau, Bogenhausen, Cosimapark, Daglfing, Denninger Kolonie, Dom Pedro, Dorniersiedlung, Dornier-Siedlung, Echarding, Englischer Garten Süd, Englschalking, Erich-Kästner-Viertel, Fasangarten, Feldmoching, Feldmüllersiedlung, Freiham, Freimann, Freimanner Heide, Fröttmaning, Fürstenried-Ost, Fürstenried-West, Gärtnerplatzviertel, Gartenstadt Bogenhausen, Gartenstadt Johanneskirchen, Gartenstadt Trudering, Georgenschwaige, Giesing, Graggenauviertel, Glockenbachviertel, Großhadern, Großlappen, Hackenviertel, Harlaching, Harthof, Hausteinviertel, Hochfelder, Hohenberg, Holzapfelkreuth, Isoldenviertel, Johanneskirchen, Josephsburg, Kieferngarten, Kleinhadern, Kleinhesselohe, Kolonie Daglfing, Kolonie Waldfrieden, Konradshof, Kulturheim, Kreuzviertel, Langwied, Lehel, Lerchenau-Ost, Lerchenau-West, Lichtental, Ludwigsvorstadt, Ludwigsvorstadt-Kliniken, Ludwigsfeld, Marsfeld, Maxvorstadt, Messestadt Riem, Milbertshofen, Moosach, Neuhadern, Neuharlaching, Neufreimann, Neupasing, Neuschwabing, Neuhausen, Neuperlach, Neuried, Nymphenburg, Obersendling, Obergiesing, Oberföhring, Obermenzing, Obere Au, Obere Isarau (unten), Oberwiesenfeld, Österreicher Viertel, Parkstadt Bogenhausen, Parkstadt Schwabing, Parkstadt Solln, Perlach, Pipping, Prinzenpark, Ramersdorf, Riem, Schlachthofviertel, Schwanthalerhöhe, Sendlinger Feld, Sendling, Sendling-Westpark, Solln, St.-Benno-Viertel, Steinhausen, Stuck, Studentenstadt, Thalkirchen, Tucherpark, Untergiesing, Untermenzing, Universitätsviertel, Ursulaviertel, Viktoriaviertel, Villenkolonie Prinz-Ludwigs-Höhe, Waldperlach, Waldtrudering, Werksviertel, Westpark, Wiesenviertel, Zamdorf",
    surroundingCities:
      "Dachau, Ebersberg, Erding, Fürstenfeldbruck, Freising, Garching bei München, Haar, Landsberg am Lech, Ottobrunn, Starnberg, Unterschleißheim, Unterhaching, Wolfratshausen",
  },
  Köln: {
    districts:
      "Bayenthal, Bickendorf, Bilderstöckchen, Blumenberg, Bocklemünd/Mengenich, Brück, Buchforst, Buchheim, Chorweiler, Deutz, Dünnwald, Ehrenfeld, Eil, Elsdorf, Ensen, Esch/Auweiler, Finkenberg, Flittard, Fühlingen, Gremberghoven, Grengel, Hahnwald, Heimersdorf, Höhenberg, Höhenhaus, Holweide, Humboldt/Gremberg, Immendorf, Junkersdorf, Kalk, Klettenberg, Lind, Lindenthal, Longerich, Lövenich, Marienburg, Mauenheim, Merheim, Merkenich, Meschenich, Mülheim, Müngersdorf, Neuehrenfeld, Neubrück, Niehl, Nippes, Ossendorf, Ostheim, Pesch, Poll, Porz, Raderberg, Raderthal, Rath/Heumar, Rodenkirchen, Roggendorf/Thenhoven, Rondorf, Seeberg, Sinnersdorf, Stammheim, Sülz, Südstadt, Urbach, Vingst, Vogelsang, Volkhoven/Weiler, Wahn, Wahnheide, Weiden, Weidenpesch, Weiß, Westhoven, Widdersdorf, Worringen, Zollstock, Zündorf",
    surroundingCities:
      "Dormagen, Düren, Euskirchen, Frechen, Grevenbroich, Hilden, Hürth, Kaarst, Kerpen, Pulheim, Sankt Augustin, Siegburg, Troisdorf",
  },
  Frankfurt: {
    districts:
      "Altstadt, Innenstadt, Bahnhofsviertel, Westend, Nordend, Sachsenhausen, Bergen-Enkheim, Berkersheim, Bockenheim, Bonames, Bornheim, Dornbusch, Eckenheim, Eschersheim, Fechenheim, Flughafen, Frankfurter Berg, Gallus, Ginnheim, Griesheim, Gutleutviertel, Harheim, Hausen, Heddernheim, Höchst, Kalbach-Riedberg, Nied, Nieder-Erlenbach, Nieder-Eschbach, Niederrad, Niederursel, Oberrad, Ostend, Praunheim, Preungesheim, Riederwald, Rödelheim, Schwanheim, Seckbach, Sindlingen, Sossenheim, Unterliederbach, Zeilsheim, Bankenviertel (Finanzdistrikt), Europaviertel (neues Stadtquartier im Gallus) und Nordweststadt",
    surroundingCities:
      "Hanau, Gießen, Marburg, Fulda, Rüsselsheim, Bad Homburg vor der Höhe, Wetzlar, Oberursel, Rodgau, Dreieich, Bensheim, Hofheim am Taunus, Maintal, Langen, Neu‑Isenburg, Limburg an der Lahn, Bad Vilbel, Dietzenbach, Viernheim, Mörfelden‑Walldorf, Bad Nauheim, Lampertheim, Bad Hersfeld, Taunusstein, Friedberg (Hessen), Griesheim, Mühlheim am Main, Rödermark, Hattersheim am Main, Kelkheim (Taunus), Heppenheim, Baunatal, Butzbach, Weiterstadt, Friedrichsdorf, Idstein, Pfungstadt, Obertshausen, Groß‑Gerau, Riedstadt, Gelnhausen, Bad Soden am Taunus, Dillenburg, Karben, Eschborn, Büdingen, Stadtallendorf, Flörsheim am Main, Groß‑Umstadt, Seligenstadt, Bruchköbel, Herborn und Nidderau",
  },
  // Additional cities from multi-page-config.json - using generic data
  // These can be updated with specific districts and surrounding cities as needed
  Stuttgart: {
    districts:
      "Stuttgart-Mitte, Stuttgart-Nord, Stuttgart-Ost, Stuttgart-Süd, Stuttgart-West, Bad Cannstatt, Birkach, Botnang, Degerloch, Feuerbach, Hedelfingen, Möhringen, Mühlhausen, Münster, Obertürkheim, Plieningen, Sillenbuch, Stammheim, Untertürkheim, Vaihingen, Wangen, Weilimdorf, Zuffenhausen, Bohnenviertel (Altstadtquartier) und Heusteigviertel (gründerzeitliches Wohnviertel)",
    surroundingCities:
      "Ludwigsburg, Esslingen am Neckar, Sindelfingen, Waiblingen, Böblingen, Leonberg, Fellbach, Filderstadt, Bietigheim‑Bissingen, Kirchheim unter Teck, Nürtingen, Schorndorf, Ostfildern, Backnang, Kornwestheim, Herrenberg, Vaihingen an der Enz, Winnenden, Geislingen an der Steige, Weinstadt, Ditzingen, Göppingen, Pforzheim, Tübingen, Reutlingen, Rottenburg am Neckar, Neckarsulm, Mühlacker, Horb am Neckar, Schwäbisch Gmünd, Aalen, Eislingen/Fils, Metzingen, Mössingen und Remseck am Neckar",
  },
  Düsseldorf: {
    districts:
      "Altstadt, Carlstadt, Stadtmitte, Pempelfort, Derendorf, Golzheim, Flingern-Nord, Flingern-Süd, Düsseltal, Oberbilk, Unterbilk, Bilk, Friedrichstadt, Hafen, Hamm, Flehe, Volmerswerth, Oberkassel, Heerdt, Lörick, Niederkassel, Stockum, Lohausen, Kaiserswerth, Wittlaer, Kalkum, Angermund, Lichtenbroich, Unterrath, Rath, Mörsenbroich, Gerresheim, Grafenberg, Ludenberg, Hubbelrath, Knittkuhl, Eller, Lierenfeld, Vennhausen, Unterbach, Wersten, Holthausen, Reisholz, Benrath, Urdenbach, Hassels, Itter, Himmelgeist, Garath, Hellerhof, Medienhafen (neues Szeneviertel am Hafen), Japanisches Viertel (Little Tokyo die Immermannstraße) und Zooviertel (gehobenes Wohngebiet in Düsseltal)",
    surroundingCities:
      "Neuss, Ratingen, Mettmann, Hilden, Meerbusch, Langenfeld (Rheinland), Monheim am Rhein, Hilden, Kaarst, Grevenbroich, Korschenbroich, Tönisvorst, Rheinfelden, Haan, Erkrath, Wülfrath, Langenfeld, Hilden, Dormagen, Kleve, Kempen, Straelen",
  },
  Dortmund: {
    districts:
      "Innenstadt-West, Innenstadt-Nord, Innenstadt-Ost (Innenstadtbereiche), Eving, Scharnhorst, Brackel, Aplerbeck, Hörde, Hombruch, Lütgendortmund, Huckarde, Mengede, Nordstadt (zentraler Nordstadtbezirk um Borsigplatz), Kreuzviertel (beliebtes Gründerzeitviertel westlich der City), Kaiserviertel (Ausgehviertel östlich der City) und Unionviertel (kreatives Quartier im Westen der Innenstadt)",
    surroundingCities:
      "Witten, Castrop‑Rauxel, Schwerte, Lünen, Waltrop, Unna, Bergkamen, Kamen, Hattingen, Gevelsberg, Herten, Ennepetal, Datteln, Recklinghausen, Nordkirchen, sowie etwas weiter Velbert, Hilden, Solingen, Mülheim an der Ruhr, Ratingen, Oberhausen, Bottrop, Gladbeck, Gelsenkirchen, Essen, Remscheid, Wuppertal, Hattingen, Dinslaken",
  },
  Essen: {
    districts:
      "Stadtkern (Innenstadt), Nordviertel, Ostviertel, Westviertel, Südviertel, Südostviertel, Frillendorf, Huttrop, Rüttenscheid, Bergerhausen, Rellinghausen, Stadtwald, Altendorf, Frohnhausen, Holsterhausen, Fulerum, Haarzopf, Margarethenhöhe, Bedingrade, Bergeborbeck, Bochold, Borbeck-Mitte, Dellwig, Frintrop, Gerschede, Altenessen (gemeint sind Altenessen-Nord und -Süd), Karnap, Vogelheim, Katernberg, Schonnebeck, Stoppenberg, Freisenbruch, Horst, Kray, Leithe, Steele, Burgaltendorf, Byfang, Heisingen, Kupferdreh, Überruhr (mit Hinsel und Holthausen), Bredeney, Fischlaken, Heidhausen, Kettwig, Schuir und Werden",
    surroundingCities:
      "Mülheim an der Ruhr, Oberhausen, Bottrop, Gelsenkirchen, Gladbeck, Velbert, Hattingen, Heiligenhaus, Wülfrath, Ratingen, Hilden, Langenfeld, Mettmann, Wülfrath, Erkrath",
  },
  Leipzig: {
    districts:
      "Zentrum (Innenstadt), Zentrum-Ost, Zentrum-Südost, Zentrum-Süd, Zentrum-West, Zentrum-Nordwest, Zentrum-Nord, Schönefeld-Abtnaundorf, Schönefeld-Ost, Mockau-Nord, Mockau-Süd, Thekla, Plaußig-Portitz, Neustadt-Neuschönefeld, Volkmarsdorf, Anger-Crottendorf, Sellerhausen-Stünz, Paunsdorf, Heiterblick, Mölkau, Engelsdorf, Baalsdorf, Althen-Kleinpösna, Reudnitz-Thonberg, Stötteritz, Probstheida, Meusdorf, Liebertwolkwitz, Holzhausen, Südvorstadt, Connewitz, Marienbrunn, Lößnig, Dölitz-Dösen, Schleußig, Plagwitz, Kleinzschocher, Großzschocher, Knautkleeberg-Knauthain, Hartmannsdorf-Knautnaundorf, Schönau, Grünau-Ost, Grünau-Mitte, Grünau-Siedlung, Lausen-Grünau, Grünau-Nord, Miltitz, Lindenau, Altlindenau, Neulindenau, Leutzsch, Böhlitz-Ehrenberg, Burghausen-Rückmarsdorf, Möckern, Wahren, Lützschena-Stahmeln, Lindenthal, Gohlis-Süd, Gohlis-Mitte, Gohlis-Nord, Eutritzsch, Seehausen, Wiederitzsch, Waldstraßenviertel (historisches Gründerzeitviertel) und Musikviertel (elegantes Viertel am Innenstadt-Rand)",
    surroundingCities:
      "Grimma, Borna, Delitzsch, Taucha, Markranstädt, Brandis, Wurzen, Eilenburg, Taucha, Lunzenau",
  },
  Bremen: {
    districts:
      "Mitte (Altstadt), Häfen, Neustadt, Huchting, Obervieland, Woltmershausen, Seehausen, Strom, Hemelingen, Vahr, Osterholz, Oberneuland, Östliche Vorstadt, Schwachhausen, Findorff, Walle, Gröpelingen, Burglesum, Vegesack, Blumenthal, Horn-Lehe, Borgfeld, Schnoor (mittelalterliches Altstadtviertel), Das Viertel (Szenequartier aus Ostertor und Steintor) und Überseestadt (neues Hafenquartier)",
    surroundingCities:
      "Delmenhorst, Achim, Verden (Aller), Rotenburg (Wümme), Syke, Weyhe, Stuhr, Osterholz-Scharmbeck, Bassum, Bruchhausen-Vilsen, Lilienthal, Oyten",
  },
  Dresden: {
    districts:
      "Altstadt, Innere Neustadt, Äußere Neustadt, Pieschen, Klotzsche, Loschwitz, Blasewitz, Leuben, Prohlis, Plauen, Cotta, Gruna, Striesen, Johannstadt, Löbtau, Gorbitz, Weißer Hirsch, Hellerau, Kaditz, Cossebaude, Bühlau/Weißig, Langebrück, Waldschlößchenviertel (Neustadtgebiet am Waldschlösschen) und Hechtviertel (jugendliches Gründerzeitviertel in der Neustadt)",
    surroundingCities:
      "Freital, Radebeul, Pirna, Radeberg, Coswig, Meißen, Riesa, Großenhain, Dippoldiswalde, Bischofswerda, Heidenau, Dohna",
  },
  Hannover: {
    districts:
      "Mitte, Vahrenwald, List, Bothfeld, Vahrenheide, Buchholz, Kleefeld, Misburg, Anderten, Groß-Buchholz, Kirchrode, Bemerode, Wülferode, Döhren, Wülfel, Ricklingen, Oberricklingen, Wettbergen, Mühlenberg, Linden-Nord, Linden-Mitte, Linden-Süd, Limmer, Ahlem, Badenstedt, Davenstedt, Herrenhausen, Stöcken, Leinhausen, Nordstadt, Hainholz, Vinnhorst, Ledeburg, Burg, Südstadt (südliches Innenstadtgebiet), Calenberger Neustadt (zentrales Altstadtviertel) und List (begehrtes Jugendstilquartier)",
    surroundingCities:
      "Garbsen, Laatzen, Langenhagen, Seelze, Wunstorf, Lehrte, Burgdorf, Barsinghausen, Isernhagen, Burgwedel, Hemmingen, Pattensen, Springe, Gehrden, Sehnde, Wennigsen",
  },
  Nürnberg: {
    districts:
      "Altstadt (St. Lorenz und St. Sebald), Gostenhof, St. Johannis, Tafelhof, Marienvorstadt, Wöhrd, Maxfeld, Glockenhof, Galgenhof, Steinbühl, Gibitzenhof, Gleißhammer, Zerzabelshof, Mögeldorf, Thon, Großgründlach, Eibach, Katzwang, Kornburg, Südstadt (Innenstadtgürtel Süd), Langwasser (Großwohnsiedlung im Südosten) und Knoblauchsland (ländlicher Stadtteil im Norden)",
    surroundingCities:
      "Fürth, Zirndorf, Oberasbach, Erlangen, Schwabach, Cadolzburg, Roßtal, Seukendorf, Veitsbronn, Ammerndorf, Rückersdorf, Dormitz, Lauf an der Pegnitz, Hirschaid",
  },
  Duisburg: {
    districts:
      "Altstadt, Dellviertel, Neudorf, Hochfeld, Ruhrort, Kaßlerfeld, Homberg, Rheinhausen, Hüttenheim, Buchholz, Wanheimerort, Meiderich, Beeck, Hamborn, Marxloh, Walsum, Vierlinden, Huckingen, Wedau, Innenhafen (revitalisiertes Hafenquartier in der Innenstadt) und Bruckhausen (Arbeiterviertel im Norden der Stadt)",
    surroundingCities:
      "Dinslaken, Wesel, Moers, Krefeld, Neukirchen-Vluyn, Kamp-Lintfort, Rheinberg, Hünxe, Voerde, Xanten, Dinslaken, Moers - aber einige über 100 000, relevante mittlere Orte: Neukirchen-Vluyn, Kamp-Lintfort, Rheinberg, Voerde, Xanten",
  },
  Bochum: {
    districts:
      "Innenstadt, Ehrenfeld, Wiemelhausen, Grumme, Hamme, Hordel, Günnigfeld, Wattenscheid, Langendreer, Werne, Harpen, Gerthe, Hofstede, Weitmar, Linden, Dahlhausen, Höntrop, Querenburg (Ruhr-Universität), Bermudadreieck (Ausgehviertel in der Innenstadt), Hustadt (Wohnsiedlung in Querenburg)",
    surroundingCities:
      "Essen, Dortmund, Gelsenkirchen, Herne, Witten, Hattingen, Castrop-Rauxel, Recklinghausen, Herdecke, Wetter (Ruhr), Witten, Iserlohn, Gladbeck, Unna, Velbert, Lünen, Dinslaken, Hattingen, Schwelm, Ennepetal, Gevelsberg, Herdecke, Sprockhövel, Wetter (Ruhr), Holzwickede, Fröndenberg",
  },
  Wuppertal: {
    districts:
      "Elberfeld, Elberfeld-West, Uellendahl-Katernberg, Vohwinkel, Cronenberg, Barmen, Oberbarmen, Heckinghausen, Langerfeld-Beyenburg, Ronsdorf, Luisenviertel (Ausgehviertel in Elberfeld) und Werth (Zentrum von Barmen)",
    surroundingCities:
      "Solingen, Remscheid, Velbert, Haan, Mettmann, Wülfrath, Hilden, Erkrath, Heiligenhaus, Hilden, Ratingen, Mettmann, Velbert",
  },
  Bielefeld: {
    districts:
      "Mitte, Stieghorst, Heepen, Brackwede, Senne, Sennestadt, Jöllenbeck, Dornberg, Gadderbaum, Schildesche, Bethel (Diakonie-Stadtteil in Gadderbaum) und Altstadt (historisches Stadtkerngebiet)",
    surroundingCities:
      "Herford, Gütersloh, Minden, Paderborn, Detmold, Lübbecke, Bad Salzuflen - geprüft via NRW-Listen",
  },
  Bonn: {
    districts:
      "Zentrum, Bundesviertel (Regierungsviertel), Castell, Auerberg, Tannenbusch, Endenich, Bad Godesberg, Friesdorf, Mehlem, Beuel, Oberkassel, Hardtberg, Duisdorf, Brüser Berg, Ippendorf, Venusberg und Poppelsdorf",
    surroundingCities:
      "Sankt Augustin, Troisdorf, Siegburg, Hennef, Bornheim, Niederkassel, Königswinter, Bad Honnef, Meckenheim, Rheinbach, Alfter, Wesseling, Lohmar, Euskirchen",
  },
  Münster: {
    districts:
      "Aaseestadt, Aaseemarkt, Albachten, Amelsbüren, Angelmodde, Angelmodde-West, Berg Fidel, Blitzdorf, Coerde, Dorbaum, Dyckburg, Düesbergviertel, Erphoviertel, Geistviertel, Gelmer, Gievenbeck, Gittrup, Gremmendorf, Häger, Handorf, Hansaviertel, Herz-Jesu-Viertel, Hiltrup, Kinderhaus, Kreuzviertel, Kuhviertel, Mariendorf, Martiniviertel, Mauritz-Ost, Mauritzviertel, Mecklenbeck, Nienberge, Oberort, Pluggendorf, Roxel, Rumphorst, Sandrup, Schonebeck, Sentrup, Sprakel, St. Mauritz, Sudmühle, Südviertel, Uhlenbrock, Uppenberg, Vennheide, Wolbeck, Zentrum Nord und Überwasser",
    surroundingCities:
      "Warendorf, Greven, Telgte, Emsdetten, Senden, Dülmen, Lüdinghausen, Coesfeld, Beckum, Ahlen, Hamm (teilweise über 100k), Ennigerloh, Oelde",
  },
  Karlsruhe: {
    districts:
      "Beiertheim-Bulach, Daxlanden, Durlach, Grötzingen, Grünwettersbach, Grünwinkel, Hagsfeld, Hohenwettersbach, Innenstadt-Ost, Innenstadt-West, Knielingen, Mühlburg, Neureut, Nordstadt, Nordweststadt, Oberreut, Oststadt, Palmbach, Rintheim, Rüppurr, Stupferich, Südweststadt, Südstadt, Waldstadt, Weiherfeld-Dammerstock, Weststadt und Wolfartsweier",
    surroundingCities:
      "Ettlingen, Bruchsal, Rastatt, Baden-Baden, Waghäusel, Bretten, Stutensee, Philippsburg, Gaggenau, Bühl, Malsch, Östringen, Rheinstetten",
  },
  Mannheim: {
    districts:
      "Almenhof, Blumenau, Casterfeld, Feudenheim, Franklin, Friedrichsfeld, Herzogenried, Innenstadt, Jungbusch, Käfertal, Käfertal-Mitte, Käfertal-Süd, Kirschgartshausen, Lindenhof, Neckarau, Neckarstadt-Nordost, Neckarstadt-Ost, Neckarstadt-West, Neuhermsheim, Neuostheim, Niederfeld, Oststadt, Pfingstberg, Quadratestadt, Rheinau, Rheinau-Mitte, Rheinau-Süd, Sandhofen, Sandhofen-Nord, Sandtorf, Schönau, Schönau-Nord, Schönau-Süd, Schwetzingerstadt, Seckenheim, Sonnenschein, Speckweggebiet, Straßenheim, Vogelstang, Waldhof, Waldhof-Ost, Waldhof-West, Wallstadt und Wohlgelegen",
    surroundingCities:
      "Ludwigshafen, Speyer, Schwetzingen, Viernheim, Weinheim, Hockenheim, Wiesloch, Leimen, Brühl, Lampertheim, Frankenthal, Bensheim, Heidelberg (über 100k, ausgeschlossen), Ladenburg, Schriesheim",
  },
  Augsburg: {
    districts:
      "Lechviertel, östliches Ulrichsviertel, Innenstadt, St. Ulrich-Dom, Bahnhofs- und Bismarckviertel, Georgs- und Kreuzviertel, Stadtjägerviertel, Bleich und Pfärrle, Jakobervorstadt - Nord, Jakobervorstadt - Süd, Am Schäfflerbach, Rechts der Wertach, Links der Wertach - Süd, Links der Wertach - Nord, Oberhausen - Süd, Oberhausen - Nord, Bärenkeller, Firnhaberau, Hammerschmiede, Lechhausen - Süd, Lechhausen - Ost, Lechhausen - West, Kriegshaber, Rosenau- und Thelottviertel, Pfersee - Süd, Pfersee - Nord, Hochfeld, Antonsviertel, Spickel, Wolfram- und Herrenbachviertel, Hochzoll - Nord, Hochzoll - Süd, Haunstetten - Nord, Haunstetten - West, Haunstetten - Ost, Siebenbrunn, Haunstetten - Süd, Göggingen - Nordwest, Göggingen - Nordost, Göggingen - Ost, Göggingen - Süd, Inningen, Bergheim und Universitätsviertel",
    surroundingCities:
      "Friedberg, Neusäß, Gersthofen, Königsbrunn, Aichach, Bobingen, Schwabmünchen, Stadtbergen, Meitingen, Diedorf, Kissing",
  },
  Wiesbaden: {
    districts:
      "Auringen, Biebrich, Bierstadt, Breckenheim, Delkenheim, Dotzheim, Erbenheim, Frauenstein, Heßloch, Igstadt, Klarenthal, Kloppenheim, Mainz-Amöneburg, Mainz-Kastel, Mainz-Kostheim, Medenbach, Mitte, Naurod, Nordenstadt, Nordost, Rambach, Rheingauviertel, Hollerborn, Schierstein, Sonnenberg, Südost, Westend und Bleichstraße",
    surroundingCities:
      "Rüsselsheim, Hofheim am Taunus, Flörsheim am Main, Hattersheim am Main, Hochheim am Main, Taunusstein, Eppstein, Idstein, Bad Schwalbach, Niedernhausen, Bischofsheim, Ginsheim-Gustavsburg, Kelsterbach, Groß-Gerau, Raunheim, Ingelheim am Rhein, Bingen am Rhein",
  },
  Gelsenkirchen: {
    districts:
      "Altstadt, Beckhausen, Bismarck, Bulmke-Hüllen, Erle, Hassel, Heßler, Horst, Neustadt, Resse, Resser-Mark, Rotthausen, Schalke, Schalke-Nord, Scholven, Buer, Ückendorf",
    surroundingCities:
      "Gladbeck, Bottrop, Herne, Marl, Herten, Recklinghausen, Castrop-Rauxel, Wanne-Eickel, Oer-Erkenschwick, Waltrop, Datteln",
  },
  Mönchengladbach: {
    districts:
      "Am Wasserturm, Bettrath-Hoven, Bonnenbroich-Geneicken, Bungt, Dahl, Eicken, Flughafen, Geistenbeck, Giesenkirchen-Mitte, Giesenkirchen-Nord, Gladbach, Grenzlandstadion, Hardt-Mitte, Hardter Wald, Hardterbroich-Pesch, Hauptquartier, Hehn, Heyden, Hockstein, Holt, Lürrip, Mülfort, Neuwerk-Mitte, Odenkirchen-Mitte, Odenkirchen-West, Ohler, Pongs, Rheindahlen-Mitte, Rheindahlen-Land, Rheydt, Sasserath, Schelsen, Schloss Rheydt, Schmölderpark, Schrievers, Uedding, Venn, Waldhausen, Wanlo, Westend, Wickrath-Mitte, Wickrathberg, Wickrath-West und Windberg",
    surroundingCities:
      "Viersen, Korschenbroich, Willich, Kaarst, Grevenbroich, Jüchen, Erkelenz, Tönisvorst, Nettetal, Rommerskirchen, Hückelhoven, Wegberg",
  },
  Braunschweig: {
    districts:
      "Bebelhof, Bevenrode, Bienrode, Broitzem, Dibbesdorf, Gartenstadt, Geitelde, Gliesmarode, Harxbüttel, Heidberg, Hondelage, Jägersruh, Kanzlerfeld, Kralenriede, Lamme, Lehndorf, Leiferde, Lindenberg, Mascherode, Melverode, Ölper, Querum, Rautheim, Riddagshausen, Rühme, Rüningen, Schapen, Schuntersiedlung, Schwarzer Berg, Stiddien, Stöckheim, Südstadt, Thune, Timmerlah, Veltenhof, Völkenrode, Volkmarode, Waggum, Watenbüttel, Wenden, Westliches Ringgebiet und Innenstadt",
    surroundingCities:
      "Salzgitter, Wolfenbüttel, Peine, Gifhorn, Helmstedt, Königslutter am Elm, Cremlingen, Vechelde, Meine, Wendeburg, Lehre",
  },
  Chemnitz: {
    districts:
      "Adelsberg, Altchemnitz, Altendorf, Bernsdorf, Borna-Heinersdorf, Ebersdorf, Einsiedel, Erfenschlag, Euba, Furth, Gablenz, Glösa-Draisdorf, Grüna, Harthau, Helbersdorf, Hilbersdorf, Hutholz, Kapellenberg, Kappel, Kaßberg, Klaffenbach, Kleinolbersdorf-Altenhain, Lutherviertel, Markersdorf, Mittelbach, Morgenleite, Rabenstein, Reichenbrand, Reichenhain, Röhrsdorf, Rottluff, Schloßchemnitz, Schönau, Siegmar, Sonnenberg, Stelzendorf, Wittgensdorf, Yorckgebiet und Zentrum",
    surroundingCities:
      "Zwickau, Glauchau, Limbach-Oberfrohna, Stollberg, Annaberg-Buchholz, Freiberg, Burgstädt, Hohenstein-Ernstthal, Mittweida, Flöha, Frankenberg, Oelsnitz/Erzgeb., Aue-Bad Schlema",
  },
  Kiel: {
    districts:
      "Altstadt, Brunswik, Damperhof, Düsternbrook, Ellerbek, Elmschenhagen, Friedrichsort, Gaarden-Ost, Gaarden-Süd (mit Kronsburg), Hassee, Hasseldieksdamm, Holtenau, Blücherplatz, Exerzierplatz, Südfriedhof, Wellsee, Wik, Meimersdorf, Mettenhof, Moorsee, Neumühlen-Dietrichsdorf, Pries, Ravensberg, Rönne, Russee, Schilksee, Schreventeich, Suchsdorf, Vorstadt und Wellingdorf",
    surroundingCities:
      "Neumünster, Eckernförde, Rendsburg, Plön, Preetz, Schwentinental, Bordesholm, Heikendorf, Kronshagen, Schönkirchen, Gettorf, Altenholz",
  },
  Aachen: {
    districts:
      "Altstadt, Beverau, Bildchen, Brand, Campus Melaten, Deliusviertel, Eilendorf, Forst, Frankenberger Viertel, Freund, Friesenrath, Haaren, Hahn, Hanbruch, Horbach, Hörn, In den Heimgärten, Kornelimünster, Krauthausen, Königshügel, Köpfchen, Laurensberg, Lemiers, Lichtenbusch, Nirm, Nordviertel, Nütheim, Oberforstbach, Orsbach, Ostviertel, Preuswald, Richterich, Rothe Erde, Schleckheim, Schmithof, Seffent, Sief, Soers, Steffensviertel, Steinebrück, Steppenberg, Vaalserquartier, Verlautenheide, Vetschau, Viktoriaviertel und Walheim",
    surroundingCities:
      "Eschweiler, Stolberg, Alsdorf, Würselen, Herzogenrath, Baesweiler, Übach-Palenberg, Geilenkirchen, Jülich, Monschau, Linnich, Aldenhoven",
  },
  Halle: {
    districts:
      "Altstadt, Am Wasserturm/Thaerviertel, Ammendorf/Beesen, Böllberg/Wörmlitz, Büschdorf, Damaschkestraße, Dautzsch, Diemitz, Dieselstraße, Dölau, Dölauer Heide, Freiimfelde/Kanenaer Weg, Frohe Zukunft, Gebiet der Deutschen Bahn, Gesundbrunnen, Gewerbegebiet Neustadt, Giebichenstein, Gottfried-Keller-Siedlung, Heide-Nord/Blumenau, Heide-Süd, Industriegebiet Nord, Kanena/Bruckdorf, Kröllwitz, Landrain, Lettin, Lutherplatz/Thüringer Bahnhof, Mötzlich, Nietleben, Nördliche Neustadt, Nördliche Innenstadt, Paulusviertel, Planena, Radewell/Osendorf, Reideburg, Saaleaue, Seeben, Silberhöhe, Südliche Innenstadt, Südliche Neustadt, Südstadt, Tornau, Trotha, Westliche Neustadt und Neustadt (Halle-Neustadt)",
    surroundingCities:
      "Merseburg, Leuna, Weißenfels, Naumburg, Schkopau, Bad Dürrenberg, Querfurt, Landsberg, Teutschenthal, Bad Lauchstädt, Hohenmölsen",
  },
  Magdeburg: {
    districts:
      'Altstadt, Alte Neustadt, Neue Neustadt, Neustädter See, Neustädter Feld, Alt Olvenstedt, Neu Olvenstedt, Stadtfeld Ost, Stadtfeld West, Diesdorf, Sudenburg, Ottersleben, Lemsdorf, Buckau, Fermersleben, Salbke, Westerhüsen, Cracau, Prester, Zipkeleben, Kreuzhorst, Herrenkrug, Rothensee, Werder, Reform, Hopfengarten, Pechau, Randau-Calenberge, Beyendorf-Sohlen, Kannenstieg, Berliner Chaussee, Sülzegrund, Nordwest ("Texas"), Leipziger Straße, Brückfeld, Beyendorfer Grund, Großer Silberberg, Barleber See, Gewerbegebiet Nord, Industriehafen',
    surroundingCities:
      "Burg (bei Magdeburg), Schönebeck, Wolmirstedt, Haldensleben, Barleben, Möckern, Oschersleben, Calbe, Wanzleben-Börde, Eilsleben",
  },
  Freiburg: {
    districts:
      "Altstadt, Benzhausen, Betzenhausen, Brühl, Dietenbach, Ebnet, Günterstal, Haslach, Herdern, Hochdorf, Kappel, Landwasser, Lehen, Littenweiler, Mooswald, Mundenhof, Munzingen, Neuburg, Oberau, Opfingen, Rieselfeld, Sankt Georgen, Stühlinger, Tiengen, Vauban, Waldsee, Waltershofen, Weingarten, Wiehre, Zähringen",
    surroundingCities:
      "Emmendingen, Waldkirch, Bad Krozingen, Breisach am Rhein, Müllheim, Titisee-Neustadt, Neustadt im Schwarzwald, Staufen im Breisgau, Gundelfingen, Denzlingen",
  },
  Krefeld: {
    districts:
      "Stadtmitte, Kempener Feld/Baackeshof, Inrath/Kliedbruch, Cracau, Dießem/Lehmheide, Benrad-Nord, Benrad-Süd, Forstwald, Gartenstadt, Bockum, Traar, Verberg, Oppum, Linn, Gellep-Stratum, Uerdingen, Hohenbudberg, Elfrath, Hüls, Fischeln, Hafen",
    surroundingCities:
      "Viersen, Willich, Tönisvorst, Meerbusch, Kempen, Grefrath, Korschenbroich, Moers, Neukirchen-Vluyn, Rommerskirchen",
  },
  Lübeck: {
    districts:
      "Innenstadt (Altstadt), St. Jürgen, St. Gertrud, St. Lorenz Nord, St. Lorenz Süd, Moisling, Buntekuh, Kücknitz, Travemünde, Schlutup",
    surroundingCities: "Bad Oldesloe, Reinfeld",
  },
  Oberhausen: {
    districts:
      "Alt-Oberhausen, Neue Mitte, Lirich, Alstaden, Barmingholten, Buschhausen, Schwarze Heide, Sterkrade-Mitte, Sterkrade-Nord, Alsfeld, Königshardt, Tackenberg, Schmachtendorf, Osterfeld-Mitte, Klosterhardt, Vondern, Rothebusch, Borbeck und Osterfeld-Ost",
    surroundingCities:
      "Dorsten, Dinslaken, Gladbeck, Hattingen, Kamp-Lintfort, Marl, Ratingen, Velbert, Wesel",
  },
  Erfurt: {
    districts:
      "Altstadt, Andreasvorstadt, Brühlervorstadt, Daberstedt, Berliner Platz, Johannesvorstadt, Ilversgehofen, Herrenberg, Löbervorstadt, Melchendorf, Moskauer Platz, Rieth, Daberstedt, Krämpfervorstadt, Sulzer Siedlung, Thüringenhalle, Wiesenhügel, Hochheim, Marbach, Gispersleben, Kühnhausen, Vieselbach, Alach, Azmannsdorf, Bindersleben, Dittelstedt, Egstedt, Ermstedt, Frienstedt, Hochstedt, Linderbach, Molsdorf, Niedernissa, Rhoda, Salomonsborn, Schmira, Schwerborn, Stotternheim, Töttelstädt, Töttleben, Urbich, Waltersleben, Windischholzhausen und Wallichen",
    surroundingCities: "Apolda, Arnstadt, Eisenach, Gotha, Weimar",
  },
  Mainz: {
    districts:
      "Altstadt, Neustadt, Oberstadt, Hartenberg-Münchfeld, Mombach, Gonsenheim, Finthen, Drais, Lerchenberg, Marienborn, Bretzenheim, Zahlbach, Hechtsheim, Ebersheim, Weisenau, Laubenheim, Bodenheim (Mainz-Amöneburg), Kastel (Mainz-Kastel) und Kostheim (Mainz-Kostheim)",
    surroundingCities:
      "Ingelheim am Rhein, Bingen am Rhein, Nieder-Olm, Bodenheim, Nackenheim, Ginsheim-Gustavsburg, Bischofsheim, Hochheim am Main, Flörsheim am Main, Rüsselsheim, Groß-Gerau",
  },
  Rostock: {
    districts:
      "Stadtmitte, Kröpeliner-Tor-Vorstadt, Steintor-Vorstadt, Südstadt, Brinckmansdorf, Toitenwinkel, Dierkow, Gehlsdorf, Groß Klein, Lütten Klein, Evershagen, Lichtenhagen, Reutershagen, Hansaviertel, Komponistenviertel, Gartenstadt, Schmarl, Markgrafenheide, Warnemünde, Hohe Düne, Wiethagen, Hinrichshagen",
    surroundingCities:
      "Graal-Müritz, Güstrow, Kühlungsborn, Ribnitz-Damgarten, Stralsund",
  },
  Kassel: {
    districts:
      "Bad Wilhelmshöhe, Bettenhausen, Brasselsberg, Fasanenhof, Forstfeld, Harleshausen, Jungfernkopf, Kirchditmold, Mitte, Niederzwehren, Nord-Holland, Nordshausen, Oberzwehren, Philippinenhof-Warteberg, Rothenditmold, Südstadt, Süsterfeld-Helleböhn, Unterneustadt, Vorderer Westen, Waldau, Wehlheiden, Wesertor, Wolfsanger-Hasenhecke (u.a. mit Schillerviertel, Blücherviertel und weiteren als Vierteln bekannten Siedlungsnamen)",
    surroundingCities: "Baunatal, Hann. Münden, Korbach",
  },
  Hagen: {
    districts:
      "Altenhagen, Ambrock, Bathey, Berchum, Boele, Boelerheide, Dahl, Delstern, Eilpe, Eppenhausen, Eckesey, Emst, Halden, Haspe, Helfe, Hestert, Hohenlimburg, Holthausen, Hochschulviertel, Henkhausen, Herbeck, Hohenlimburg-Zentrum, Elsey, Oege, Nahmer, Priorei, Rummenohl, Selbecke, Geweke, Tücking, Westerbauer (die ehemals selbständigen Orte und heutigen Viertel der fünf Stadtbezirke Hagen-Mitte, -Nord, -Haspe, -Eilpe/Dahl und -Hohenlimburg)",
    surroundingCities:
      "Gevelsberg, Iserlohn, Lüdenscheid, Menden (Sauerland), Schwerte, Schwelm, Unna, Witten",
  },
  Hamm: {
    districts:
      "Hamm-Mitte, Hamm-Uentrop, Hamm-Rhynern, Hamm-Pelkum, Hamm-Herringen, Hamm-Bockum-Hövel, Hamm-Heessen (die sieben Stadtbezirke, bekannte Unter-Viertel sind u.a. Lohauserholz und Wiescherhöfen in Pelkum sowie Daberg, Westenfeldmark u.a. in der Kernstadt)",
    surroundingCities: "Ahlen, Bergkamen, Kamen, Lünen, Soest, Unna, Werl",
  },
  Saarbrücken: {
    districts:
      "Alt-Saarbrücken, Malstatt, St. Johann, Eschberg, St. Arnual, Gersweiler, Klarenthal, Altenkessel, Burbach, Dudweiler, Jägersfreude, Herrensohr, Scheidt, Schafbrücke, Bischmisheim, Ensheim, Brebach-Fechingen, Eschringen, Güdingen, Bübingen",
    surroundingCities:
      "Homburg, Merzig, Neunkirchen (Saar), Saarlouis, Sankt Ingbert, Völklingen und Zweibrücken",
  },
  Mülheim: {
    districts:
      "Altstadt, Stadtmitte, Eppinghofen, Styrum, Dümpten, Heißen, Holthausen, Menden, Raadt, Saarn, Selbeck, Mintard, Broich, Speldorf",
    surroundingCities:
      "Dinslaken, Gladbeck, Hattingen, Heiligenhaus, Hilden, Langenfeld (Rheinland), Mettmann, Monheim am Rhein, Ratingen, Velbert",
  },
  Potsdam: {
    districts:
      "Bornim, Nedlitz, Bornstedt, Sacrow, Eiche, Grube, Golm, Nauener Vorstadt, Jägervorstadt, Berliner Vorstadt, Brandenburger Vorstadt, Potsdam-West, Historische Innenstadt, Zentrum Ost (Nuthepark), Hauptbahnhof (Brauhausberg Nord), Klein Glienicke, Babelsberg Nord, Babelsberg Süd, Templiner Vorstadt, Teltower Vorstadt, Schlaatz, Waldstadt I, Waldstadt II, Stern, Drewitz, Kirchsteigfeld, Uetz-Paaren, Marquardt, Satzkorn, Fahrland, Neu Fahrland, Groß Glienicke (außerdem bekannt: Holländisches Viertel in der Innenstadt)",
    surroundingCities:
      "Brandenburg an der Havel, Falkensee, Hennigsdorf, Kleinmachnow, Ludwigsfelde, Teltow, Werder (Havel)",
  },
  Ludwigshafen: {
    districts:
      "Mitte, Süd, Nord/Hemshof, West, Friesenheim, Oppau, Edigheim, Pfingstweide, Gartenstadt, Mundenheim, Oggersheim, Rheingönheim, Maudach, Ruchheim",
    surroundingCities:
      "Bensheim, Frankenthal (Pfalz), Germersheim, Landau in der Pfalz, Neustadt an der Weinstraße, Speyer, Worms",
  },
  Oldenburg: {
    districts:
      "Zentrum, Dobben, Haarenesch, Bahnhofsviertel, Gerichtsviertel, Ziegelhof, Ehnern, Bürgeresch, Donnerschwee, Osternburg, Drielake, Eversten, Hundsmühler Höhe, Thomasburg, Bloherfelde, Haarentor, Wechloy, Bürgerfelde, Rauhehorst (Vahlenhorst), Dietrichsfeld, Alexandersfeld, Flugplatz, Ofenerdiek, Nadorst, Etzhorn, Ohmstede, Bornhorst, Neuenwege, Kloster Blankenburg, Kreyenbrück, Bümmerstede, Tweelbäke West, Krusenbusch, Drielaker Moor",
    surroundingCities: "Delmenhorst, Wilhelmshaven",
  },
  Leverkusen: {
    districts:
      "Alkenrath, Bergisch Neukirchen, Bürrig, Hitdorf, Küppersteg, Lützenkirchen, Manfort, Opladen, Quettingen, Rheindorf, Schlebusch, Steinbüchel, Wiesdorf",
    surroundingCities:
      "Bergheim, Dormagen, Frechen, Hilden, Hürth, Kerpen, Langenfeld (Rheinland), Siegburg, Troisdorf",
  },
  Osnabrück: {
    districts:
      "Innenstadt, Weststadt, Westerberg, Eversburg, Hafen, Sonnenhügel, Haste, Dodesheide, Gartlage, Schinkel, Widukindland, Schinkel-Ost, Fledder, Schölerberg, Kalkhügel, Wüste, Sutthausen, Hellern, Atter, Pye, Darum, Gretesch, Lüstringen, Voxtrup, Nahne",
    surroundingCities:
      "Bramsche, Emsdetten, Georgsmarienhütte, Ibbenbüren, Melle, Rheine",
  },
  Solingen: {
    districts:
      "Solingen-Mitte (Innenstadt), Gräfrath, Ohligs, Wald, Aufderhöhe, Merscheid, Höhscheid, Burg",
    surroundingCities:
      "Dormagen, Grevenbroich, Hilden, Langenfeld (Rheinland), Ratingen, Siegburg, Troisdorf",
  },
  Heidelberg: {
    districts:
      "Schlierbach, Altstadt, Bergheim, Weststadt, Südstadt, Rohrbach, Kirchheim, Pfaffengrund, Wieblingen, Handschuhsheim, Neuenheim, Boxberg, Emmertsgrund, Ziegelhausen, Bahnstadt",
    surroundingCities:
      "Bruchsal, Landau in der Pfalz, Mosbach, Schwetzingen, Sinsheim, Speyer, Weinheim, Worms",
  },
  Herne: {
    districts:
      "Holsterhausen, Baukau-Ost, Herne-Mitte, Herne-Süd, Horsthausen, Sodingen, Börnig, Holthausen, Crange, Unser Fritz, Baukau-West, Wanne, Wanne-Süd, Eickel, Röhlinghausen",
    surroundingCities:
      "Castrop-Rauxel, Datteln, Dorsten, Gladbeck, Hattingen, Lünen, Marl, Witten",
  },
  Neuss: {
    districts:
      "Innenstadt, Dreikönigenviertel, Hafengebiet, Hammfeld, Augustinusviertel, Gnadental, Grimlinghausen, Uedesheim, Weckhoven, Erfttal, Selikum, Reuschenberg, Pomona, Stadionviertel, Westfeld, Morgensternsheide, Furth-Süd, Furth-Mitte, Furth-Nord, Weißenberg, Vogelsang, Barbaraviertel, Holzheim, Grefrath, Hoisten, Speck, Wehl, Helpenstein, Norf, Rosellen, Rosellerheide, Neuenbaum, Allerheiligen",
    surroundingCities:
      "Bergheim, Dormagen, Grevenbroich, Hilden, Kerpen, Langenfeld (Rheinland), Ratingen, Viersen",
  },
  Darmstadt: {
    districts:
      "Darmstadt-Mitte (Innenstadt), Darmstadt-Nord, Darmstadt-Ost, Darmstadt-West, Bessungen, Arheilgen, Eberstadt, Wixhausen, Kranichstein (zudem bekannte Viertel: Martinsviertel, Johannesviertel, Waldkolonie u.a. im Stadtzentrum)",
    surroundingCities:
      "Aschaffenburg, Bad Homburg vor der Höhe, Bensheim, Hanau, Rüsselsheim am Main",
  },
  Paderborn: {
    districts:
      "Paderborn (Stadtzentrum), Benhausen, Dahl, Elsen, Marienloh, Neuenbeken, Sande, Sennelager, Schloß Neuhaus, Wewer",
    surroundingCities:
      "Brilon, Detmold, Gütersloh, Höxter, Lemgo, Lippstadt, Rheda-Wiedenbrück, Warendorf",
  },
  Regensburg: {
    districts:
      "Innenstadt, Stadtamhof, Steinweg-Pfaffenstein, Sallern-Gallingkofen, Konradsiedlung-Wutzlhofen, Brandlberg-Keilberg, Reinhausen, Weichs, Schwabelweis, Ostenviertel, Kasernenviertel, Galgenberg, Kumpfmühl-Ziegetsdorf-Neuprüll, Großprüfening-Dechbetten-Königswiesen, Westenviertel, Ober- und Niederwinzer-Kager, Oberisling-Leoprechting-Graß, Burgweinting-Harting",
    surroundingCities: "Amberg, Schwandorf, Straubing",
  },
  Ingolstadt: {
    districts:
      "Dünzlau, Etting, Feldkirchen, Friedrichshofen, Gerolfing, Hagau, Haunwöhr, Hundszell, Irgertsheim, Kothau, Mailing, Mühlhausen, Niederfeld, Oberbrunnenreuth, Oberhaunstadt, Pettenhofen, Seehof, Spitalhof, Unsernherrn, Unterbrunnenreuth, Unterhaunstadt, Winden, Zuchering",
    surroundingCities:
      "Freising, Neuburg an der Donau und Pfaffenhofen an der Ilm",
  },
  Würzburg: {
    districts:
      "Altstadt, Zellerau, Mainviertel, Steinbachtal, Frauenland, Sanderau, Grombühl, Dürrbachtal (Ober- und Unterdürrbach), Heidingsfeld, Heuchelhof, Lengfeld, Versbach, Rottenbauer",
    surroundingCities: "Bad Kissingen, Kitzingen und Schweinfurt",
  },
  Fürth: {
    districts:
      "Nordstadt, Südstadt, Oststadt, Weststadt, Altstadt, Innenstadt, Atzenhof, Bislohe, Braunsbach, Burgfarrnbach, Dambach, Eigenes Heim, Eschenau, Espan, Flexdorf, Hardhöhe, Herboldshof, Kalbsiedlung, Kronach, Mannhof, Oberfürberg, Poppenreuth, Ritzmannshof, Ronhof, Ronwaldsiedlung, Sack, Schwand, Stadeln, Steinach, Unterfarrnbach, Unterfürberg, Vach, Weikershof",
    surroundingCities:
      "Ansbach, Bamberg, Forchheim, Neumarkt in der Oberpfalz, Roth, Schwabach",
  },
  Wolfsburg: {
    districts:
      "Allerpark, Almke/Neindorf, Brackstedt/Velstove/Warmenau, Detmerode, Eichelkamp, Fallersleben, Vorsfelde, Hellwinkel, Hohenstein, Kästorf, Heiligendorf, Innenstadt (Stadtmitte), Kreuzheide, Laagberg, Mitte-West, Nordstadt, Reislingen, Sandkamp, Steimker Berg, Sülfeld, Wendschott, Westhagen, Barnstorf, Hehlingen, Mörse, Neuhaus, Nordsteimke, Barnstorf, Üfingen (u.a. die 40 Ortsteile der 16 Stadtbezirke)",
    surroundingCities: "Celle, Gifhorn, Helmstedt, Wolfenbüttel",
  },
  Ulm: {
    districts:
      "Böfingen, Donaustetten, Eggingen, Einsingen, Eselsberg, Gögglingen, Grimmelfingen, Jungingen, Lehr, Mitte (Innenstadt), Mähringen, Oststadt, Söflingen, Unterweiler, Weststadt, Wiblingen (inkl. Talfingen), Einsingen, Lehr (die insgesamt 18 Stadtteile Ulms, u.a. bekannt: Safranberg und Dichterviertel als Quartiere in der Oststadt)",
    surroundingCities:
      "Biberach an der Riß, Göppingen, Heidenheim an der Brenz, Memmingen, Neu-Ulm",
  },
  Heilbronn: {
    districts:
      "Innenstadt, Böckingen, Neckargartach, Frankenbach, Biberach, Kirchhausen, Sontheim, Horkheim, Klingenberg (sowie die Heilbronner Wartberg-, Kreuzgrund- und Südstadt-Viertel)",
    surroundingCities:
      "Esslingen am Neckar, Ludwigsburg, Schwäbisch Gmünd, Schwäbisch Hall, Sindelfingen",
  },
  Pforzheim: {
    districts:
      "Brötzingen (mit Arlinger), Nordstadt (mit Maihälden), Oststadt, Südoststadt, Südweststadt, Weststadt, Büchenbronn, Eutingen, Hohenwart, Huchenfeld, Würm, Dillweißenstein, Buckenberg-Haidach, Altgefäll",
    surroundingCities:
      "Baden-Baden, Bruchsal, Calw, Ettlingen, Esslingen am Neckar, Ludwigsburg, Sindelfingen, Tübingen",
  },
  Göttingen: {
    districts:
      "Innenstadt, Ostviertel, Weststadt, Südstadt, Nordstadt, Weende, Grone, Geismar, Nikolausberg, Weende/Deppoldshausen, Elliehausen/Esebeck, Holtensen, Groß Ellershausen/Hetjershausen/Knutbühren, Herberhausen, Roringen, Geismar, Nikolausberg, ehem. Leineberg",
    surroundingCities: "Einbeck, Hann. Münden, Mühlhausen",
  },
  Bottrop: {
    districts:
      "Stadtmitte, Batenbrock, Boy, Fuhlenbrock, Welheim, Eigen, Ebel, Vonderort, Lehmkuhle, Grafenwald, Kirchhellen, Feldhausen, Hardt, Ekel",
    surroundingCities:
      "Dorsten, Dinslaken, Gladbeck, Hattingen, Kamp-Lintfort und Marl",
  },
  Trier: {
    districts:
      "Mitte/Gartenfeld, Nord, Süd, Ehrang/Quint, Euren, Feyen/Weismark, Heiligkreuz, Pallien, Pfalzel, Ruwer/Eitelsbach, Tarforst, Trier-West/Pallien, Zewen",
    surroundingCities: "Idar-Oberstein, Merzig, Saarlouis",
  },
  Recklinghausen: {
    districts:
      "Altstadt, Grullbad, Hillerheide, Hochlarmark, König Ludwig, Ost, Suderwich, Essel, Speckhorn/Bockholt, Stuckenbusch, Hillen, Berghausen, Röllinghausen",
    surroundingCities:
      "Castrop-Rauxel, Datteln, Dorsten, Gladbeck, Haltern am See, Herten, Lünen, Marl, Oer-Erkenschwick, Waltrop",
  },
  Reutlingen: {
    districts:
      "Innenstadt, Nordstadt, Oststadt, Weststadt, Südstadt, Mittelstadt, Oferdingen, Altenburg, Sickenhausen, Degerschlacht, Sondelfingen, Betzingen, Gönningen, Ohmenhausen, Bronnweiler, Reicheneck, Rommelsbach, Orschel-Hagen",
    surroundingCities:
      "Esslingen am Neckar, Göppingen, Ludwigsburg, Sindelfingen, Tübingen, Waiblingen",
  },
  Bremerhaven: {
    districts:
      "Geestemünde, Lehe, Mitte (Innenstadt), Leherheide, Wulsdorf, Surheide, Weddewarden, Schiffdorferdamm, Eckernfeld, Schierholz, Speckenbüttel, Fischereihafen, Grünhöfe, Buschkämpen",
    surroundingCities: "Cuxhaven, Nordenham, Osterholz-Scharmbeck, Varel",
  },
  Koblenz: {
    districts:
      "Altstadt, Mitte, Süd, Karthause, Goldgrube, Moselweiß, Lützel, Neuendorf, Metternich, Rübenach, Güls, Lay, Asterstein, Pfaffendorf, Ehrenbreitstein, Horchheim, Niederberg, Arzheim, Arenberg, Immendorf",
    surroundingCities:
      "Andernach, Bad Neuenahr-Ahrweiler, Bingen am Rhein, Limburg an der Lahn, Neuwied",
  },
  "Bergisch Gladbach": {
    districts:
      "Stadtmitte (Gladbach), Bensberg, Refrath, Hand, Paffrath, Schildgen, Katterbach, Hebborn, Herkenrath, Frankenforst, Sand, Romaney, Herrenstrunden",
    surroundingCities:
      "Erftstadt, Frechen, Hürth, Kerpen, Langenfeld (Rheinland), Siegburg, Troisdorf, Wermelskirchen",
  },
  Jena: {
    districts:
      "Zentrum, Nord, West, Ost, Süd, Lobeda, Wenigenjena, Zwätzen, Winzerla, Göschwitz, Drackendorf, Ilmnitz, Ammerbach, Kunitz, Krippendorf, Isserstedt",
    surroundingCities:
      "Altenburg, Apolda, Naumburg (Saale), Rudolstadt, Saalfeld/Saale, Weimar",
  },
  Remscheid: {
    districts:
      "Alt-Remscheid, Stadtpark, Hasten, Kremenholl, Lennep, Lüttringhausen, Vieringhausen, Güldenwerth, Ehringhausen, Westhausen, Bergisch Born, Hackenberg, Engelsburg",
    surroundingCities:
      "Erkrath, Gevelsberg, Hilden, Langenfeld (Rheinland), Ratingen, Schwelm, Siegburg, Troisdorf",
  },
  Erlangen: {
    districts:
      "Innenstadt, Röthelheimpark, Anger, Bruck, Büchenbach, Dechsendorf, Eltersdorf, Frauenaurach, Hüttendorf, Kosbach, Kriegenbrunn, Kriegenbrunn, Alterlangen, Sieglitzhof, Tennenlohe",
    surroundingCities:
      "Bamberg, Forchheim, Herzogenaurach, Neumarkt in der Oberpfalz, Schwabach",
  },
  Moers: {
    districts:
      "Altstadt, Asberg, Meerbeck, Utfort, Hülsdonk, Schwafheim, Kapellen, Holderberg, Repelen, Vinn, Rheinkamp",
    surroundingCities:
      "Dinslaken, Geldern, Kamp-Lintfort, Meerbusch, Neukirchen-Vluyn, Wesel, Willich, Xanten",
  },
  Siegen: {
    districts:
      "Siegen-Mitte, Weidenau, Geisweid, Eiserfeld, Seelbach, Trupbach, Niederschelden, Klafeld, Weidenau, Bürbach, Dreis-Tiefenbach, Langenholdinghausen, Volnsberg",
    surroundingCities: "Kreuztal, Lennestadt, Netphen, Olpe, Wilnsdorf",
  },
  Hildesheim: {
    districts:
      "Stadtmitte, Oststadt, Nordstadt, Weststadt, Moritzberg, Galgenberg, Marienburger Höhe, Itzum, Bavenstedt, Einum, Drispenstedt, Achtum-Uppen, Neuhof, Sorsum, Himmelsthür",
    surroundingCities:
      "Garbsen, Hameln, Laatzen, Langenhagen, Lehrte, Peine, Wolfenbüttel",
  },
  Salzgitter: {
    districts:
      "Lebenstedt, Salzgitter-Bad, Thiede, Gebhardshagen, Hallendorf, Engelnstedt, Lichtenberg, Bruchmachtersen, Flachstöckheim, Immendorf, Bad Lehbenstadt, Watenstedt, Barum, Lobmachtersen, Calbecht, Ringelheim",
    surroundingCities: "Gifhorn, Goslar, Hildesheim, Peine, Wolfenbüttel",
  },
};

/**
 * Get city-specific data for a given city name
 * Extracts city name from programmatic instance (e.g., "nutzungsdauer-Berlin" -> "Berlin")
 * Returns default values if city data is not found
 */
function getCityData(cityName: string): CityData {
  // Try to find exact match first
  if (CITY_DATA_MAP[cityName]) {
    return CITY_DATA_MAP[cityName];
  }

  // Try to find match by extracting city name from programmatic instance
  // e.g., "nutzungsdauer-Berlin" -> "Berlin"
  const cityMatch = Object.keys(CITY_DATA_MAP).find((key) =>
    cityName.includes(key)
  );
  if (cityMatch) {
    return CITY_DATA_MAP[cityMatch];
  }

  // Return default values if no match found
  return {
    districts: "verschiedenen Stadtteilen",
    surroundingCities: "umliegenden Regionen",
  };
}

/**
 * Generates a Google Maps embed URL for a given city
 * Uses custom address if mapped, otherwise uses city center
 */
function generateCityMapUrl(cityName: string): string {
  const address = CITY_ADDRESS_MAPPINGS[cityName] || `${cityName}, Deutschland`;
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps?q=${encodedAddress}&output=embed&hl=de&z=13`;
}

/**
 * Programmatic instance-specific template variables
 * These variables are specific to programmatic pages and are not part of the site configuration
 */
export const PROGRAMMATIC_INSTANCE_TEMPLATE_VARIABLES: TemplateVariableDefinition[] =
  [
    {
      key: "programmaticInstanceName",
      description:
        "Current programmatic instance name for programmatic pages (e.g., location, product, service, event)",
      extractor: (config) => config.programmaticInstanceName,
      fallback: undefined,
    },
    {
      key: "programmaticInstanceSlug",
      description: "URL-friendly version of the programmatic instance name",
      extractor: (config) => config.programmaticInstanceSlug,
      fallback: undefined,
    },
    {
      key: "cityMapUrl",
      description:
        "Google Maps embed URL for the city (uses custom address if mapped, otherwise city center)",
      extractor: (config) =>
        config.programmaticInstanceName
          ? generateCityMapUrl(config.programmaticInstanceName as string)
          : undefined,
      fallback: undefined,
    },
    {
      key: "listOfCityDistricts",
      description:
        "Comma-separated list of city districts for the programmatic instance",
      extractor: (config) =>
        config.programmaticInstanceName
          ? getCityData(config.programmaticInstanceName as string).districts
          : undefined,
      fallback: "verschiedenen Stadtteilen",
    },
    {
      key: "listOfSurroundingCities",
      description:
        "Comma-separated list of surrounding cities/regions for the programmatic instance",
      extractor: (config) =>
        config.programmaticInstanceName
          ? getCityData(config.programmaticInstanceName as string)
              .surroundingCities
          : undefined,
      fallback: "umliegenden Regionen",
    },
  ];

/**
 * Combined template variables
 */
export const TEMPLATE_VARIABLES: TemplateVariableDefinition[] = [
  ...SITE_TEMPLATE_VARIABLES,
  ...PROGRAMMATIC_INSTANCE_TEMPLATE_VARIABLES,
];

/**
 * Creates a template context from site configuration using site-specific variables
 */
export function createSiteTemplateContext(
  siteConfig: any
): Record<string, any> {
  const context: Record<string, any> = {};

  // Process each site template variable definition
  for (const variable of SITE_TEMPLATE_VARIABLES) {
    const value = variable.extractor(siteConfig);
    setNestedValue(
      context,
      variable.key,
      value !== undefined ? value : variable.fallback
    );
  }

  // Add only non-template properties from the site config to avoid recursive loops
  // Skip properties that might contain template variables that could cause recursion
  const safeProperties = [
    "id",
    "name",
    "description",
    "domain",
    "contact",
    "social",
    "analytics",
    "seo",
    "fonts",
    "colors",
    "navigation",
    "subpages",
  ];

  for (const key of safeProperties) {
    if (siteConfig[key] !== undefined) {
      context[key] = siteConfig[key];
    }
  }

  return context;
}

/**
 * Creates a template context for programmatic instance-specific variables
 */
export function createProgrammaticInstanceTemplateContext(
  programmaticInstance: string,
  programmaticInstanceSlug?: string
): Record<string, any> {
  const context: Record<string, any> = {};

  // Process each programmatic instance template variable definition
  for (const variable of PROGRAMMATIC_INSTANCE_TEMPLATE_VARIABLES) {
    const value = variable.extractor({
      programmaticInstanceName: programmaticInstance,
      programmaticInstanceSlug,
    });
    setNestedValue(
      context,
      variable.key,
      value !== undefined ? value : variable.fallback
    );
  }

  return context;
}

/**
 * Creates a combined template context from site configuration and programmatic instance information
 */
export function createTemplateContext(
  siteConfig: any,
  programmaticInstance?: string,
  programmaticInstanceSlug?: string
): Record<string, any> {
  const siteContext = createSiteTemplateContext(siteConfig);
  const programmaticInstanceContext = programmaticInstance
    ? createProgrammaticInstanceTemplateContext(
        programmaticInstance,
        programmaticInstanceSlug
      )
    : {};

  return {
    ...siteContext,
    ...programmaticInstanceContext,
  };
}

/**
 * Sets a nested value in an object using dot notation
 * Example: setNestedValue(obj, 'address.city', 'Berlin')
 */
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

/**
 * Gets a nested value from an object using dot notation
 * Example: getNestedValue(obj, 'address.city') returns obj.address.city
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Processes a string template with variable substitution
 * Supports nested object access with dot notation (e.g., {address.city})
 * Includes safeguard against recursive replacement
 * Automatically adds city context to titles and descriptions when city is available
 */
export function processTemplate(
  template: string,
  context: Record<string, any>
): string {
  if (typeof template !== "string") {
    return template;
  }

  // Support both single braces {variable} and double braces {{variable}}
  // Prioritize double braces to avoid conflicts with other uses of single braces
  let processed = template.replace(
    /\{\{([^}]+)\}\}/g,
    (match, variablePath) => {
      const value = getNestedValue(context, variablePath.trim());

      // Safeguard against recursive replacement
      if (value !== undefined && typeof value === "string") {
        // If the replacement value contains template variables, don't replace
        // This prevents recursive loops like {{siteId}} -> "nutzungsdauer/images/{{siteId}}/..." -> infinite loop
        if (value.includes("{{") && value.includes("}}")) {
          logger.warn(
            `Preventing recursive template replacement for ${variablePath}: ${value}`
          );
          return match; // Return original template variable
        }
        return value;
      }

      // If variable not found, return empty string for programmatic variables to avoid showing {{variable}}
      if (variablePath.includes("programmaticInstance")) {
        return "";
      }

      return match; // Return original template variable if not found
    }
  );

  // Also support single braces for backwards compatibility
  processed = processed.replace(/\{([^}]+)\}/g, (match, variablePath) => {
    // Skip if already processed as double brace
    if (match.startsWith("{{")) {
      return match;
    }

    const value = getNestedValue(context, variablePath.trim());

    if (value !== undefined && typeof value === "string") {
      if (value.includes("{") && value.includes("}")) {
        logger.warn(
          `Preventing recursive template replacement for ${variablePath}: ${value}`
        );
        return match;
      }
      return value;
    }

    // If variable not found, return empty string for programmatic variables
    if (variablePath.includes("programmaticInstance")) {
      return "";
    }

    return match;
  });

  // Add programmatic instance context to titles and descriptions if available
  if (
    context.programmaticInstanceName &&
    typeof context.programmaticInstanceName === "string"
  ) {
    const programmaticInstance = context.programmaticInstanceName;

    // Add programmatic instance to titles (but not if already contains it)
    if (
      template.includes("title") &&
      !processed.toLowerCase().includes(programmaticInstance.toLowerCase())
    ) {
      // This is a simple heuristic - in practice, you might want more sophisticated logic
      if (processed.length < 100 && !processed.includes(" in ")) {
        processed = `${processed} in ${programmaticInstance}`;
      }
    }

    // Add programmatic instance to descriptions (but not if already contains it)
    if (
      template.includes("description") &&
      !processed.toLowerCase().includes(programmaticInstance.toLowerCase())
    ) {
      if (processed.length > 50 && !processed.includes(" in ")) {
        processed = `${processed} in ${programmaticInstance}. Lokale Expertise und professionelle Beratung.`;
      }
    }
  }

  return processed;
}

/**
 * Processes an object recursively, applying template variables to all string values
 */
export function processTemplateObject(
  obj: any,
  context: Record<string, any>
): any {
  if (typeof obj === "string") {
    return processTemplate(obj, context);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => processTemplateObject(item, context));
  }

  if (obj && typeof obj === "object") {
    const processed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      processed[key] = processTemplateObject(value, context);
    }
    return processed;
  }

  return obj;
}

/**
 * Validates that all template variables in a string are available
 */
export function validateTemplate(
  template: string,
  context: Record<string, any>
): {
  isValid: boolean;
  missingVariables: string[];
  availableVariables: string[];
} {
  const variableMatches = template.match(/\{([^}]+)\}/g);
  const missingVariables: string[] = [];
  const availableVariables = TEMPLATE_VARIABLES.map((v) => v.key);

  if (variableMatches) {
    for (const match of variableMatches) {
      const variable = match.slice(1, -1).trim();
      const value = getNestedValue(context, variable);
      if (value === undefined) {
        missingVariables.push(variable);
      }
    }
  }

  return {
    isValid: missingVariables.length === 0,
    missingVariables,
    availableVariables,
  };
}

/**
 * Validates site-specific template variables
 */
export function validateSiteTemplate(
  template: string,
  context: Record<string, any>
): {
  isValid: boolean;
  missingVariables: string[];
  availableVariables: string[];
} {
  const variableMatches = template.match(/\{([^}]+)\}/g);
  const missingVariables: string[] = [];
  const availableVariables = SITE_TEMPLATE_VARIABLES.map((v) => v.key);

  if (variableMatches) {
    for (const match of variableMatches) {
      const variable = match.slice(1, -1).trim();
      const value = getNestedValue(context, variable);
      if (value === undefined) {
        missingVariables.push(variable);
      }
    }
  }

  return {
    isValid: missingVariables.length === 0,
    missingVariables,
    availableVariables,
  };
}

/**
 * Validates programmatic instance-specific template variables
 */
export function validateProgrammaticInstanceTemplate(
  template: string,
  context: Record<string, any>
): {
  isValid: boolean;
  missingVariables: string[];
  availableVariables: string[];
} {
  const variableMatches = template.match(/\{([^}]+)\}/g);
  const missingVariables: string[] = [];
  const availableVariables = PROGRAMMATIC_INSTANCE_TEMPLATE_VARIABLES.map(
    (v) => v.key
  );

  if (variableMatches) {
    for (const match of variableMatches) {
      const variable = match.slice(1, -1).trim();
      const value = getNestedValue(context, variable);
      if (value === undefined) {
        missingVariables.push(variable);
      }
    }
  }

  return {
    isValid: missingVariables.length === 0,
    missingVariables,
    availableVariables,
  };
}

/**
 * Gets all available template variables for documentation
 */
export function getAvailableTemplateVariables(): Record<string, string> {
  const variables: Record<string, string> = {};
  for (const variable of TEMPLATE_VARIABLES) {
    variables[variable.key] = variable.description;
  }
  return variables;
}

/**
 * Gets all available site template variables for documentation
 */
export function getAvailableSiteTemplateVariables(): Record<string, string> {
  const variables: Record<string, string> = {};
  for (const variable of SITE_TEMPLATE_VARIABLES) {
    variables[variable.key] = variable.description;
  }
  return variables;
}

/**
 * Gets all available programmatic instance template variables for documentation
 */
export function getAvailableProgrammaticInstanceTemplateVariables(): Record<
  string,
  string
> {
  const variables: Record<string, string> = {};
  for (const variable of PROGRAMMATIC_INSTANCE_TEMPLATE_VARIABLES) {
    variables[variable.key] = variable.description;
  }
  return variables;
}
