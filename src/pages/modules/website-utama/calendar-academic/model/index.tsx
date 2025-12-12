export interface AcademicYearList {
  id_tahun_akademik: string
  id_satuan_organisasi: string
  tahun_akademik: number
  semester: 'GANJIL' | 'GENAP' | string
  nama_tahun_akademik: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created:string
  nama_user_updated:string
}

export interface NewDataKegiatan {
    id_tahun_akademik_kegiatan: string;
    id_tahun_akademik_uraian_kegiatan: string;
    tahun_akademik: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    updated_at: string;
    uraian_kegiatan: string;
}

export interface LogActivity {
    id: number;
    user_id: string;
    id_satuan_organisasi: string;
    menu: string;
    action: string;
    table_name: string;
    field_name: string;
    record_id: string;
    new_data: NewDataKegiatan;
    ip_address: string;
    route: string;
    user_agent: string;
    created_at: string;
    nama_user: string;
    nama_satuan_organisasi: string;
}
