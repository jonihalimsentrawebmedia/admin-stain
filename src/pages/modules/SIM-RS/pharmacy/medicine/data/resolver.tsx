import { z } from 'zod'

export const ResolverMedicine = z.object({
  nama_obat: z.string({ error: 'Nama Obat harus diisi' }).min(1, 'Nama Obat harus diisi'),
  kategori_obat: z.string({ error: 'Kategori Obat harus dipilih' }).min(1, 'Kategori Obat harus dipilih'),
  bentuk_sediaan: z.string({ error: 'Bentuk Sediaan harus dipilih' }).min(1, 'Bentuk Sediaan harus dipilih'),
  satuan: z.string({ error: 'Satuan harus dipilih' }).min(1, 'Satuan harus dipilih'),
  harga: z.number({ error: 'Harga harus diisi' }),
  deskripsi: z.string({ error: 'Deskripsi harus diisi' }).min(1, 'Deskripsi harus diisi'),
})

export type IMedicineResolver = z.infer<typeof ResolverMedicine>

export const kategoriObatData = [
  { label: 'Analgesik', value: 'ANALGESIK' },
  { label: 'Antibiotik', value: 'ANTIBIOTIK' },
  { label: 'Antivirus', value: 'ANTIVIRUS' },
  { label: 'Antijamur', value: 'ANTIJAMUR' },
  { label: 'Antihistamin', value: 'ANTIHISTAMIN' },
  { label: 'Antasida', value: 'ANTASIDA' },
  { label: 'Vitamin', value: 'VITAMIN' },
  { label: 'Antipiretik', value: 'ANTIPIRETIK' },
  { label: 'Obat Batuk', value: 'OBAT_BATUK' },
  { label: 'Obat Flu', value: 'OBAT_FLU' },
  { label: 'Obat Hipertensi', value: 'OBAT_HIPERTENSI' },
  { label: 'Lainnya', value: 'LAINNYA' },
]

export const bentukSediaanData = [
  { label: 'Tablet', value: 'TABLET' },
  { label: 'Kapsul', value: 'KAPSUL' },
  { label: 'Sirup', value: 'SIRUP' },
  { label: 'Suspensi', value: 'SUSPENSI' },
  { label: 'Injeksi', value: 'INJEKSI' },
  { label: 'Infus', value: 'INFUS' },
  { label: 'Salep', value: 'SALEP' },
  { label: 'Krim', value: 'KRIM' },
  { label: 'Gel', value: 'GEL' },
  { label: 'Tetes Mata', value: 'TETES_MATA' },
  { label: 'Tetes Telinga', value: 'TETES_TELINGA' },
  { label: 'Tetes Hidung', value: 'TETES_HIDUNG' },
  { label: 'Suppositoria', value: 'SUPPOSITORIA' },
  { label: 'Inhaler', value: 'INHALER' },
]

export const satuanData = [
  { label: 'Tablet', value: 'TABLET' },
  { label: 'Kapsul', value: 'KAPSUL' },
  { label: 'Strip', value: 'STRIP' },
  { label: 'Botol', value: 'BOTOL' },
  { label: 'Tube', value: 'TUBE' },
  { label: 'Ampul', value: 'AMPUL' },
  { label: 'Vial', value: 'VIAL' },
  { label: 'Sachet', value: 'SACHET' },
  { label: 'Ml', value: 'ML' },
  { label: 'Lembar', value: 'LEMBAR' },
]
