import {z} from "zod";

export const OtpResolver = z.object({
  email: z.string({error: 'email Wajib Diisi'}),
  otp: z.string({error: 'Passwrod Wajib Diisi'}).min(6, {error: 'Password Minimal 6 Karakter'})
});

export type OtpType = z.infer<typeof OtpResolver>;