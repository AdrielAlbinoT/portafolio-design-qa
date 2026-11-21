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
      // UI/UX: caso Problema → Solución. Resto: De qué se trata → Qué hice.
      problem: z.string().optional(),
      solution: z.string().optional(),
      about: z.string().optional(),
      done: z.string().optional(),
      tools: z.array(z.string()).default([]),
      highlight: z.string().optional(),
      accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      brand: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
      cover: image().optional(),
      banner: image().optional(),
      icon: image().optional(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      mockups: z.string().optional(),
      mockupCount: z.number().optional(),
      mockupNote: z.string().optional(),
      pending: z.string().optional(),
      order: z.number(),
    }).superRefine((p, ctx) => {
      const need = p.category === 'UI/UX' ? (['problem', 'solution'] as const) : (['about', 'done'] as const);
      for (const k of need) if (!p[k]) ctx.addIssue({ code: 'custom', path: [k], message: `Falta "${k}" para la categoría ${p.category}` });
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
