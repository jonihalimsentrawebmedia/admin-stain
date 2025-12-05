import {z} from "zod";

export const ResetPasswordResolver = z
  .object({

    
    old_password: z.string({error: "password Wajib Diisi"}),
    new_password: z.string({error: "password Wajib Diisi"}),
    
    new_confirm_password: z.string({error: "password Wajib Diisi"}),
  })
  .refine((data) => data.new_password === data.new_confirm_password, {
    message: "Konfirmasi password tidak sesuai",
    path: ["new_confirm_password"], // error diarahkan ke field confirm_password
  });

export type ResetPasswordType = z.infer<typeof ResetPasswordResolver>;