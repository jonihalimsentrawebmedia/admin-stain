import { z } from "zod";

export const AcademicRankResolver = z.object({
  nama_akademik: z.string({ error: "Nama Akademik Wajib Diisi" }).min(1,{ error: "Nama Akademik Wajib Diisi" }),
});
export type AcademicRankType = z.infer<typeof AcademicRankResolver>;
export interface AcademicRankList {
  id_akademik: string;
  nama_akademik: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
}
