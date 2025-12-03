import {z} from "zod";

export const LoginResolver = z.object({
  email: z.string({error: 'email Wajib Diisi'}),
  password: z.string({error: 'Passwrod Wajib Diisi'}).min(6, {error: 'Password Minimal 6 Karakter'})
});

export type LoginType = z.infer<typeof LoginResolver>;