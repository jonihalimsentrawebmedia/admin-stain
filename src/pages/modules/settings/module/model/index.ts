import { z } from "zod";

export const ModuleResolver = z.object({
  gambar: z.string({ error: "Gambar Wajib Diisi" }),
  nama_module: z.string({ error: "Nama Module Wajib Diisi" }),
  controller: z.string({ error: "Controller Wajib Diisi" }),
  kategori: z.string({ error: "Kategori Wajib Diisi" }),
  urutan: z.string({ error: "Urutan Wajib Diisi" }),
});

export type ModuleType = z.infer<typeof ModuleResolver>;

export interface ModuleList {
  id_module: string;
  nama_module: string;
  controller: string;
  kategori: string;
  urutan: number;
  created_at: string;
  updated_at: string;
  gambar:string
}
