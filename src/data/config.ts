import type { SiteMetadata, NavLink, SocialLinks } from '../types';

export const siteMetadata: SiteMetadata = {
    title: "brandon@portfolio ~",
    description: "Portfolio de Brandon Quintero Mendoza - Desarrollador Full Stack con +4 años de experiencia",
    author: "Brandon Quintero Mendoza",
    siteUrl: "https://brandon-portfolio.com"
};

export const navigationLinks: NavLink[] = [
    { href: "#hero", label: "./inicio" },
    { href: "#experience", label: "./experiencia" },
    { href: "#social-links", label: "./contacto" }
];

export const socialLinks: SocialLinks = {
    email: "brandonquinterogit@gmail.com",
    linkedin: "https://www.linkedin.com/in/brantux/",
    github: "https://github.com/BranTuxLinux",
};

export const heroInfo = {
    command: "cat /home/brandon/profile.txt",
    bio: [
        "> Desarrollador Back-end & Full Stack | +4 años de experiencia",
        "> Especializado en Node.js, React, TypeScript y arquitecturas escalables.",
        "> Experto en Linux, Docker, Git/GitHub y metodologías ágiles.",
        "> Actualmente ejecutando: pacman -Syu innovation && npm run build-future"
    ]
};

export const footerInfo = {
    madeWith: ["Neovim", "Astro", "Tailwind CSS"],
    uptime: "99.9%"
};

