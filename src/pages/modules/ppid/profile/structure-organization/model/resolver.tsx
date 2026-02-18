import { z } from 'zod'

// Skema untuk objek gambar/personil (Pejabat & Atasan)
const PersonilSchema = z.object({
  url_gambar: z
    .string({ error: 'Gambar Wajib Diisi' })
    .min(1, { message: 'Gambar Wajib Diisi' })
    .url({ message: 'Format URL gambar tidak valid' }),
  nama: z.string().min(1, { message: 'Nama Wajib Diisi' }),
  deskripsi: z.string().min(1, { message: 'Deskripsi Wajib Diisi' }),
})

export const StructureOrganizationResolver = z.object({
  // Base fields yang Anda minta

  // Field berdasarkan data JSON Anda
  isi_profil: z.string().min(1, { message: 'Isi profil tidak boleh kosong' }),
  isi_struktur: z.string().min(1, { message: 'Isi struktur tidak boleh kosong' }),

  // Objek bersarang
  pejabat: PersonilSchema,
  atasan: PersonilSchema,
})

// Type inference untuk digunakan di interface React Hook Form atau lainnya
export type StructureOrganizationType = z.infer<typeof StructureOrganizationResolver>
