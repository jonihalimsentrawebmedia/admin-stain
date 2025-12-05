import { z } from "zod";

export const NewsCategoryResolver = z.object({
  nama_kategori: z.string({ error: "Nama Kategori Wajib Diisi" }).min(1,{ error: "Nama Kategori Wajib Diisi" }),
});

export type NewsCategoryType = z.infer<typeof NewsCategoryResolver>;
export interface NewsCategoryList {
  id_kategori: string;
  nama_kategori: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
}
