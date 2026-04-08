import { z } from 'zod';

export const authResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.string().min(1),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
