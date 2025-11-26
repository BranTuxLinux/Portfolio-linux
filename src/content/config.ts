import { defineCollection, z } from 'astro:content';

const experiencesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        company: z.string(),
        period: z.string(),
        technologies: z.array(z.string()),
        order: z.number(),
        draft: z.boolean().optional().default(false),
    }),
});

export const collections = {
    experiences: experiencesCollection,
};

