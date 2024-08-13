import { z } from 'zod';

export const UserSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'username tidak boleh kurang dari 6 kata' }),
  email: z
    .string()
    .email({ message: 'mohon masukkan input format email yang benar' }),
  firstname: z.string().min(1, { message: 'mohon masukkan nama depan' }),
  lastname: z.string().min(1, { message: 'mohon masukkan nama belakang' }),
  role: z.string().min(1, { message: 'mohon pilih role' }),
  // password: z.string().min(6, { message: 'password minimal harus 6' }),
});
