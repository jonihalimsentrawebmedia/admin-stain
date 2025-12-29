import { z } from 'zod'

export const CollaborationResolver = z.object({
  kelompok: z
    .string({ message: 'Kelompok wajib diisi.' })
    .min(1, { message: 'Kelompok wajib diisi.' }),
  id_unit: z.string({ message: 'Unit wajib dipilih.' }),
  nama_mitra: z
    .string({ message: 'Nama mitra wajib diisi.' })
    .min(1, { message: 'Nama mitra wajib diisi.' }),
  id_negara: z.string({ message: 'Negara wajib dipilih.' }),
  id_provinsi: z.string({ message: 'Provinsi wajib dipilih.' }),
  id_kabupaten: z.string({ message: 'Kabupaten wajib dipilih.' }),
  alamat_mitra: z
    .string({ message: 'Alamat mitra wajib diisi.' })
    .min(1, { message: 'Alamat mitra wajib diisi.' }),
  no_kerjasama: z
    .string({ message: 'Nomor kerjasama wajib diisi.' })
    .min(1, { message: 'Nomor kerjasama wajib diisi.' }),
  id_jenis_kerjasama: z.string({ message: 'Jenis kerjasama wajib dipilih.' }),
  id_bidang_kerjasama: z.string({ message: 'Bidang kerjasama wajib dipilih.' }),
  id_kategori_kerjasama: z.string({ message: 'Kategori kerjasama wajib dipilih.' }),
  id_sub_kategori_kerjasama: z.string({ message: 'Sub kategori kerjasama wajib dipilih.' }),
  tanggal_mulai: z
    .string({ message: 'Tanggal mulai wajib diisi.' })
    .min(1, { message: 'Tanggal mulai wajib diisi.' }),
  tanggal_selesai: z
    .string({ message: 'Tanggal selesai wajib diisi.' })
    .min(1, { message: 'Tanggal selesai wajib diisi.' }),
  periode: z
    .string({ message: 'Periode wajib diisi.' })
    .min(1, { message: 'Periode wajib diisi.' }),
  detail_kerjasama: z
    .string({ message: 'Detail kerjasama wajib diisi.' })
    .min(1, { message: 'Detail kerjasama wajib diisi.' }),
  manfaat_untuk_mitra: z
    .string({ message: 'Manfaat untuk mitra wajib diisi.' })
    .min(1, { message: 'Manfaat untuk mitra wajib diisi.' }),
  manfaat_untuk_univ: z
    .string({ message: 'Manfaat untuk universitas wajib diisi.' })
    .min(1, { message: 'Manfaat untuk universitas wajib diisi.' }),
})

export type ICollaborationTypeForm = z.infer<typeof CollaborationResolver>
