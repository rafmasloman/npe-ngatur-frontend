import { z } from 'zod';

export const UserProfileAccountSchema = z.object({
  email: z
    .string()
    .email({ message: 'mohon masukkan input format email yang benar' }),
  password: z.string().min(6, { message: 'password minimal harus 6' }),
});
