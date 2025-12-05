import { z } from "zod";

export const DomainResolver = z.object({
  ip: z.string({ error: "Ip  Wajib Diisi" }).min(1,{error:"Ip  Wajib Diisi"}),
  endpoint_be: z.string({ error: "Endpoint BE  Wajib Diisi" }).min(1,{error:"Endpoint BE  Wajib Diisi"}),
  domain: z.string({ error: "Domain  Wajib Diisi" }).min(1,{ error: "Domain  Wajib Diisi" }),
  id_satuan_organisasi: z.string({ error: "Nama  Wajib Diisi" }).min(1,{ error: "Nama  Wajib Diisi" }),
  kelompok: z.string({ error: "Kelompok  Wajib Diisi" }).min(1,{ error: "Kelompok  Wajib Diisi" }),
});
export type DomainType = z.infer<typeof DomainResolver>;
export interface DomainList {
  id_domain: string;
  domain: string;
  ip: string;
  endpoint_be: string;
  kelompok:
    | "UNIVERSITAS"
    | "FAKULTAS"
    | "PRODI"
    | "UNIT"
    | "LEMBAGA"
    | "UKK_UKM"
    | "REKTORAT"
    | "BIRO"
    | "UPT";
  id_satuan_organisasi: string;
  created_at: Date;
  nama_satuan_organisasi: string;
}
