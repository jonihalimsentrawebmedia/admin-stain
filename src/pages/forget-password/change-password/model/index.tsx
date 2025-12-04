import {z} from "zod";

export const ResetPasswordResolver = z
  .object({
    email: z.string({ error: "email Wajib Diisi" }),

    password: z.string({ error: "password Wajib Diisi" }),

    confirm_password: z.string({ error: "password Wajib Diisi" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Konfirmasi password tidak sesuai",
    path: ["confirm_password"], // error diarahkan ke field confirm_password
  });

export type ResetPasswordType = z.infer<typeof ResetPasswordResolver>;