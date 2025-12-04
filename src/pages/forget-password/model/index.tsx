import {z} from "zod";

export const ForgetPasswordResolver = z.object({
  email: z.string({error: 'email Wajib Diisi'}),
});

export type ForgetPasswordType = z.infer<typeof ForgetPasswordResolver>;