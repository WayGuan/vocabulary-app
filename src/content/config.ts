import { defineCollection, z } from 'astro:content';

const words = defineCollection({
  type: 'content',
  schema: z.object({
    word: z.string(),
    type: z.string().optional(),
    phonetic: z.string().optional(),
    definition: z.string(),
    example: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { words };
