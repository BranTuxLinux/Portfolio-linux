// Genera public/CV-ES-Brandon.pdf y public/CV-EN-Brandon.pdf a partir de los
// mismos JSON de i18n que usa el portafolio, para que el CV nunca se desincronice.
// Uso: pnpm cv   (requiere Chromium headless; CV_BROWSER=/ruta/al/binario para cambiarlo)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { siteMetadata, socialLinks } from '../src/data/config.ts';

const root = resolve(import.meta.dirname, '..');
// Brave en modo headless se queda colgado al imprimir; el headless shell de Playwright no.
const playwrightShell = join(homedir(), '.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell');
const browser = process.env.CV_BROWSER ?? (existsSync(playwrightShell) ? playwrightShell : 'chromium');
const phone = '+57 300 476 2696';

const labels = {
    es: {
        file: 'CV-ES-Brandon.pdf', and: ' y ',
        experience: 'Experiencia', projects: 'Proyectos', education: 'Educación',
        skills: 'Habilidades', languages: 'Idiomas', honors: 'Distinción', portfolio: 'Portafolio',
    },
    en: {
        file: 'CV-EN-Brandon.pdf', and: ' and ',
        experience: 'Experience', projects: 'Projects', education: 'Education',
        skills: 'Skills', languages: 'Languages', honors: 'Honors', portfolio: 'Portfolio',
    },
};

const period = (p) => p.replace(/^\[|\]$/g, '');
const host = (url) => new URL(url).host;
const paragraphs = (list) => list.filter(Boolean).map((p) => `<li>${p}</li>`).join('');

function summary(bio, and) {
    const lines = bio
        .map((line) => line.replace(/^>\s*/, ''))
        .filter((line) => !line.includes('pacman'));
    lines[0] = lines[0].replace(' | ', and) + '.';
    return lines.join(' ');
}

function entry(item, extra = '') {
    return `
    <section class="entry">
        <h3>${item.company} <span class="sep">|</span> ${item.title}${extra}</h3>
        <p class="period">${period(item.period)}</p>
        <ul>${paragraphs(item.description)}</ul>
    </section>`;
}

function render(lang) {
    const t = JSON.parse(readFileSync(join(root, `src/i18n/locales/${lang}.json`), 'utf8'));
    const l = labels[lang];
    const contacts = [
        `<a href="${socialLinks.linkedin}">LinkedIn</a>`,
        phone,
        `<a href="mailto:${socialLinks.email}">${socialLinks.email}</a>`,
        `<a href="${socialLinks.github}">GitHub#1</a>`,
        `<a href="${socialLinks.github2}">GitHub#2</a>`,
        `<a href="${siteMetadata.siteUrl}">${l.portfolio}</a>`,
        `<a href="${t.social.blog.url}">Blog</a>`,
    ].join(' · ');

    const jobs = Object.values(t.jobs).map((job) => entry(job)).join('');
    const projects = Object.values(t.projects.list)
        .map((p) => {
            const link = p.url ? ` <span class="sep">·</span> <a href="${p.url}">${host(p.url)}</a>` : '';
            return entry({ ...p, title: p.company, company: p.title }, link);
        })
        .join('');
    const education = t.education.items
        .map((e) => `
        <section class="entry">
            <h3>${e.institution}</h3>
            <p>${e.degree}</p>
            <p class="period">${l.honors}: ${e.honors}</p>
        </section>`)
        .join('');
    const skills = t.skills.groups.flatMap((g) => g.items).map((s) => `<li>${s}</li>`).join('');
    const languages = t.skills.languages.map((x) => `<li>${x.name}: ${x.level}</li>`).join('');

    return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${siteMetadata.author} — CV</title>
<style>
    @page { size: A4; margin: 16mm 16mm 18mm; }
    body { font-family: Carlito, Calibri, 'Liberation Sans', Arial, sans-serif; font-size: 10.5pt; line-height: 1.38; color: #1a1a1a; margin: 0; }
    a { color: #1a4d8f; text-decoration: none; }
    header { text-align: center; margin-bottom: 12pt; }
    h1 { font-size: 21pt; margin: 0 0 3pt; letter-spacing: .3pt; }
    .contacts { font-size: 9.5pt; }
    .summary { text-align: justify; margin: 0 0 6pt; }
    h2 { font-size: 12pt; text-transform: uppercase; letter-spacing: 1pt; color: #8f1d1d; border-bottom: 1.2pt solid #8f1d1d; padding-bottom: 2pt; margin: 14pt 0 6pt; }
    .entry { margin-bottom: 9pt; }
    .entry h3 { font-size: 11pt; margin: 0; break-after: avoid; }
    .sep { color: #888; font-weight: normal; }
    .entry p { margin: 0; }
    .period { color: #555; font-size: 9.5pt; margin-bottom: 3pt !important; }
    ul { margin: 2pt 0 0; padding-left: 14pt; }
    li { margin-bottom: 2.5pt; text-align: justify; }
    li, .entry h3 { break-inside: avoid; }
</style>
</head>
<body>
    <header>
        <h1>${siteMetadata.author}</h1>
        <div class="contacts">${contacts}</div>
    </header>
    <p class="summary">${summary(t.hero.bio, l.and)}</p>
    <h2>${l.experience}</h2>${jobs}
    <h2>${l.projects}</h2>${projects}
    <h2>${l.education}</h2>${education}
    <h2>${l.skills}</h2><ul>${skills}</ul>
    <h2>${l.languages}</h2><ul>${languages}</ul>
</body>
</html>`;
}

const tmp = mkdtempSync(join(tmpdir(), 'cv-'));
try {
    for (const lang of Object.keys(labels)) {
        const html = join(tmp, `${lang}.html`);
        const pdf = join(root, 'public', labels[lang].file);
        writeFileSync(html, render(lang));
        execFileSync(browser, [
            '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
            `--user-data-dir=${join(tmp, 'profile')}`,
            `--print-to-pdf=${pdf}`, `file://${html}`,
        ], { stdio: 'ignore', timeout: 60_000 });
        console.log(`✓ ${pdf}`);
    }
} finally {
    rmSync(tmp, { recursive: true, force: true });
}
