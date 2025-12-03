import { z } from "zod";

export const LevelUserResolver = z.object({
  nama: z.string({ error: "Nama Akademik Wajib Diisi" }),
  is_superadmin: z.boolean({ error: "Super Admin Wajib Diisi" }),
  is_satker: z.boolean().optional(),
  kelompok: z.string().optional(),
});
export type LevelUserType = z.infer<typeof LevelUserResolver>;
export interface LevelUserList {
  id_level: string;
  nama: string;
  kelompok: string;
  is_superadmin: boolean;
  is_satker: boolean;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
}
