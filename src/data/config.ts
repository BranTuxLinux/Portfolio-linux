import type { SiteMetadata, SocialLinks } from '../types';

export const siteMetadata: SiteMetadata = {
    title: "brandon@portfolio ~",
    description: "Portfolio de Brandon Quintero Mendoza - Desarrollador Full Stack con +5 años de experiencia",
    author: "Brandon Quintero Mendoza",
    // El dominio real del despliegue: es el que va en el CV, en el canonical y
    // en los hreflang. Cambiarlo aqui los cambia en los tres sitios.
    siteUrl: "https://portfolio-arch-linux-brthmnd.vercel.app"
};

/** Lo que no se traduce: correos, usuarios y URLs. El texto visible vive en i18n. */
export const socialLinks: SocialLinks = {
    email: "brandonquinterogit@gmail.com",
    linkedin: "https://www.linkedin.com/in/brantux/",
    github: "https://github.com/BranTuxLinux",
    // Segunda cuenta, la misma que aparece en el CV como GitHub#2.
    github2: "https://github.com/BrthMnd",
};
