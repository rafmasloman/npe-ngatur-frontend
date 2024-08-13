import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Mohon masukkan sesuai format email' })
    .min(1, { message: 'Email harus dimasukkan' }),
  password: z.string().min(1, { message: 'Password harus dimasukkan' }),
});
