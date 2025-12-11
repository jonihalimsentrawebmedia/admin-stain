export interface AcademicActivity {
    id_tahun_akademik_kegiatan: string;
    id_tahun_akademik: string;
    nama_kegiatan: string;
    urutan: number;
    created_at: string;
    created_user: string;
    updated_at: string;
    updated_user: string;
    nama_tahun_akademik: string;
    tahun_akademik: number;
    semester: 'GANJIL' | 'GENAP' | string;
}