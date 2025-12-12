export interface ActivityDetail {
    id_tahun_akademik_uraian_kegiatan: string;
    id_tahun_akademik_kegiatan: string;
    uraian_kegiatan: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    keterangan: string;
    created_at: string;
    created_user: string;
    updated_at: string;
    updated_user: string;
    nama_tahun_akademik: string;
    tahun_akademik: number;
    semester: 'GANJIL' | 'GENAP' | string;
    nama_tahun_akademik_kegiatan: string;
    nama_user_created:string,
    nama_user_updated:string
}