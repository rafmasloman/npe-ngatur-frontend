import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export const payrollSchema = z.object({
  percent: z
    .number()
    .min(1, { message: 'Harap Masukkan Minimal 1 Persen' })
    .max(100, { message: 'Percen tidak boleh lebih dari 100' }),
});
