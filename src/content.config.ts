import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['UI/UX', 'Editorial', 'Brand Identity', 'Digital Design', 'Social Media']),
      client: z.string(),
      year: z.string().optional(),
      hook: z.string(),
      problem: z.string(),
      solution: z.string(),
      tools: z.array(z.string()).default([]),
      highlight: z.string().optional(),
      accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      cover: image().optional(),
      mockups: z.string().optional(),
      mockupCount: z.number().optional(),
      mockupNote: z.string().optional(),
      pending: z.string().optional(),
      order: z.number(),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/experience' }),
  schema: z.object({
    role: z.string().optional(),
    company: z.string(),
    location: z.string(),
    period: z.string(),
    current: z.boolean().default(false),
    items: z.array(z.string()).max(3),
    order: z.number(),
  }),
});

export const collections = { projects, experience };
