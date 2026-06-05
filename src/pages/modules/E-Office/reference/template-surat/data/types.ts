export interface ISection {
  id_template_section?: string
  id_template_surat?: string
  judul_section: string
  tipe_section?: string
  konten_section: string
  urutan?: number
}

export interface IFieldOption {
  label: string
  value: string
}

export interface IField {
  id_section_field?: string
  id_template_surat?: string
  key_placeholder: string
  label: string
  tipe_input: string
  is_required: boolean
  urutan?: number
  options?: IFieldOption[]
}

export interface ITemplateSurat {
  id_template_surat: string
  id_satuan_organisasi: string
  nama_template: string
  deskripsi: string
  status: string
  created_at: string
  updated_at: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ITemplateSuratDetail {
  template_surat: {
    id_template_surat: string
    id_satuan_organisasi: string
    nama_template: string
    deskripsi: string
    status: string
    created_at: string
    updated_at: string
    created_user: string
    updated_user: string
    nama_user_created: string
    nama_user_updated: string
  }
  sections: ISection[]
  fields: IField[]
}
