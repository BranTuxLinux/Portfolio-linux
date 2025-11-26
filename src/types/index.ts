
export interface Job {
    title: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
}

export interface NavLink {
    href: string;
    label: string;
}

export interface SiteMetadata {
    title: string;
    description: string;
    author: string;
    siteUrl?: string;
}

export interface SocialLinks {
    email: string;
    linkedin: string;
    github: string;
}

export const siteConfig: SiteMetadata = {
    title: "user@portfolio ~",
    description: "Portfolio de Desarrollador Full Stack con estética Arch Linux",
    author: "Brandon Quintero Mendoza"
};

