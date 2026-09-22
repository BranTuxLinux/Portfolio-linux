export interface Job {
    title: string;
    company: string;
    period: string;
    description: string[];
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
    siteUrl: string;
}

export interface SocialLinks {
    email: string;
    linkedin: string;
    github: string;
    github2: string;
}

export interface EducationItem {
    institution: string;
    degree: string;
    honors: string;
}

export interface SkillGroup {
    name: string;
    items: string[];
}

export interface LanguageSkill {
    name: string;
    level: string;
}
