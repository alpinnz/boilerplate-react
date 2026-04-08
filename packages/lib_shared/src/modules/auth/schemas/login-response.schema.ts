import { z } from 'zod';

export const loginResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.string().min(1),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
