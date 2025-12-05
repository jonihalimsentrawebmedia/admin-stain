import { z } from "zod";

export const GroupRankResolver = z.object({
  nama_golongan: z.string({ error: "Nama Golongan Wajib Diisi" }).min(1,{ error: "Nama Golongan Wajib Diisi" }),
});

export type GroupRankType = z.infer<typeof GroupRankResolver>;
export interface GroupRankList {
  id_golongan: string;
  nama_golongan: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
}
