export interface PrintAllActivity {
  cetak_config: IPrintHeaderConfig
  daftar_hadir: IAttendance[]
  dokumen: IDocument[]
  dokumentasi: IDocumentation[]
  laporan_list: IActivityReport[]
  notulen: INotulen[]
  pengeluaran: IExpenditure[]
}

export interface IPrintHeaderConfig {
  id_acara_cetak_daftar_hadir: string

  nomor: boolean
  nama_peserta: boolean
  instansi: boolean
  hp: boolean
  email: boolean
  jabatan: boolean
  tanda_tangan: boolean
  keterangan: boolean
  hasil_cetak: 'PORTRAIT' | 'LANDSCAPE'
  jumlah_peserta: number
  label_diketahui: string
  jabatan_diketahui: string
  nama_diketahui: string
  label_mengetahui: string
  jabatan_mengetahui: string
  nama_mengetahui: string
  saksi_pendatang: unknown[]
  id_kop_surat: string
  kop_surat: IKopSurat
}

export interface IKopSurat {
  id_kop_surat: string
  id_unit: string
  nama_unit: string | null
  url_logo: string
  key_logo: string
  pengaturan: LetterHeader[]
}

export interface LetterHeader {
  isi: string
  jenis_font: string
  gaya_font: 'bold' | 'normal' | 'italic'
  ukuran_font: number
}

export interface IAttendance {
  id_acara_daftar_hadir: string
  id_sdm: string
  sumber: 'DOSEN_STAFF' | string
  nama_lengkap: string
  id_unit: string
  id_unit_kerja: string | null
  jabatan: string | null
  no_hp: string
  nama_unit: string
  nama_unit_kerja: string | null
}

export interface IDocument {
  id_acara_dokumen: string
  judul: string
  jenis_file: 'DOKUMEN' | 'GAMBAR' | string
  url_file: string
  key_file: string
  dokumen: string
}

export interface IDocumentation {
  id_acara_dokumentasi: string
  keterangan: string | null
  jenis_file: 'UPLOAD' | 'LINK' | string
  url_file: string
  key_file: string
  dokumen: string | null
}

export interface IActivityReport {
  context:
    | 'PENDAHULUAN'
    | 'DASAR_KEGIATAN'
    | 'NAMA_KEGIATAN'
    | 'TUJUAN_KEGIATAN'
    | 'MATERI_RANGKAIAN_KEGIATAN'
    | 'HASIL_KEGIATAN'
    | 'KESIMPULAN'
    | 'TINDAK_LANJUT'
  nama: string
  laporan: string
}

export interface INotulen {
  id_acara_notulen: string
  nama_lengkap: string
  isi_notulen: string
}

export interface IExpenditure {
  id_acara_pengeluaran: string
  uraian_pengeluaran: string
  tanggal_pengeluaran: string
  yang_membayar: string
  tempat_pembelian: string
  jumlah_pengeluaran: string
  url_file_pengeluaran: string
  key_file_pengeluaran: string
}
