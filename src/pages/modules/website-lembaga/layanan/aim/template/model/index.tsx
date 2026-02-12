export interface DocumentSupportList {
  id_lembaga_template_aim: string;
  id_satuan_organisasi: string;
  judul: string;
  slug: string;
  urutan: number;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  nama_user_created: string;
  nama_user_updated: string;
  jumlah_aim: number;
}

export interface DokumenTemplateAim {
  id_lembaga_dokumen_template_aim: string;
  id_satuan_organisasi: string;
  id_lembaga_template_aim: string;
  nama_dokumen: string;
  slug: string;
  url: string;
  urutan: number;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  nama_user_created: string;
  nama_user_updated: string;
  public:boolean
}
