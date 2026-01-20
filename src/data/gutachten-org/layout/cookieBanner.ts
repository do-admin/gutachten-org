export const cookieBanner = {
  enabled: false,
  title: "Cookie-Einstellungen",
  description:
    "Wir verwenden Cookies, um dir die bestmögliche Erfahrung auf unserer Website zu bieten. Mit deiner Zustimmung hilfst du uns, unsere Website zu verbessern.",
  acceptButton: {
    text: "Cookies akzeptieren",
    variant: "default" as const,
    className: "bg-slate-900 hover:bg-slate-900/90",
  },
  rejectButton: {
    text: "Cookies ablehnen",
    variant: "outline" as const,
    className: "hover:bg-slate-900 hover:text-white",
  },
  settingsButton: {
    text: "Einstellungen",
    variant: "outline" as const,
    className: "hover:bg-slate-900 hover:text-white",
  },
  settings: {
    title: "Cookie-Einstellungen",
    description:
      "Wähle aus, welche Cookies du zulassen möchtest. Du kannst deine Einstellungen jederzeit ändern.",
    categories: {
      essential: {
        title: "Notwendige Cookies",
        description:
          "Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.",
        required: true,
      },
      analytics: {
        title: "Analyse-Cookies",
        description:
          "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden.",
      },
      marketing: {
        title: "Marketing-Cookies",
        description:
          "Diese Cookies werden verwendet, um Besuchern relevante Werbung und Marketingkampagnen bereitzustellen.",
      },
    },
    saveButton: {
      text: "Einstellungen speichern",
      variant: "default" as const,
      className: "bg-slate-900 hover:bg-slate-900/90",
    },
  },
  position: "bottom-center" as const,
};
