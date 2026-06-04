export interface ISuratGenerated {
  id_surat_generated: string
  id_template_surat: string
  id_satuan_organisasi: string
  id_kop_surat: string | null
  nomor_surat: string | null
  judul: string
  status: string
  catatan_internal: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ISectionValue {
  id_surat_section_value: string
  id_surat_generated: string
  id_template_section: string
  values: Record<string, string>
  konten_render: string
}

export interface ISuratGeneratedDetail {
  surat_generated: ISuratGenerated
  section_values: ISectionValue[]
}
