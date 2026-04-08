import { getRuntimeConfig, type RuntimeEnv } from '@repo/lib_shared';

export const env = getRuntimeConfig(import.meta.env as RuntimeEnv);
