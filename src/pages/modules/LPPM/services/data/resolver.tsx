import {z} from "zod";

export const ResolverServices = z.object({
  nama_layanan: z.string({error: "Nama Layanan Wajib Diisi"}).min(1, {error: "Nama Layanan Wajib Diisi"}),
  url: z.url({error: "Url Wajib Diisi"}).min(1, {error: "Url Wajib Diisi"}),
  posisi_header: z.boolean(),
  posisi_footer: z.boolean(),
  posisi_bawah_landing: z.boolean(),
  urutan: z.number()
});

export type SchemaService = z.infer<typeof ResolverServices>;