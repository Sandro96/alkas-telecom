export type FooterLink = {
  text: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export const footerData: FooterSection[] = [
  {
    title: "Acerca de nosotros",
    links: [
      { text: "Información corporativa" },
      { text: "Inversionistas" },
      { text: "Sustentabilidad" },
      { text: "Noticias" },
      { text: "Trabaja con nosotros" },
      { text: "Canal de denuncias" },
    ],
  },
  {
    title: "Para clientes",
    links: [
      { text: "Reclamos móvil" },
      { text: "Medios horarios y reclamos" },
      { text: "Mayoristas" },
      { text: "Privacidad y seguridad" },
      { text: "Numeración especial" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { text: "Ayuda y soporte" },
      { text: "Emergencia por robo y pérdida" },
      { text: "Buscar uno de nuestros locales" },
      { text: "Contacto" },
    ],
  },
  {
    title: "Términos y condiciones",
    links: [
      { text: "Términos de compra y devoluciones" },
      { text: "Avisos legales" },
    ],
  },
  {
    title: "Normativas",
    links: [
      { text: "Sobre redes" },
      { text: "Derecho de los usuarios" },
    ],
  },
];