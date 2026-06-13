export interface ILupSumAssignment {
  id_mail_surat_tugas_pegawai: string
  id_mail_surat_tugas: string
  id_sdm: string
  metode_tambah: 'DOSEN_STAFF' | 'MANUAL'
  nama_lengkap: string
  nik: string
  nip: string
  satuan_kerja: string
  hp: string
  alamat: string
  jabatan_pegawai: string
  urutan: number
  nama_sdm: string
  jumlah_lumpsum: number
  jumlah_lumpsum_biaya: number
  is_sudah_diisi: boolean
}

export interface IDetailLupSum {
  id_mail_surat_tugas_lumpsum: string
  id_mail_surat_tugas_pegawai: string
  id_satuan_organisasi: string
  id_bendahara: string
  id_pejabat: string
  id_sumber_dana: string
  nama_penandatangan: string
  nama_bendahara: string | null
  nip_pejabat: string | null
  nip_bendahara: string | null
  nama_jabatan_struktural_pejabat: string | null
  nama_jabatan_struktural_bendahara: string | null
  nama_pegawai: string
  nama_jabatan_struktural_pegawai: string
  nip_pegawai: string
  tanggal_surat: string
  kegiatan: string[]
  biaya: ICostLumpSum[]
}

export interface ICostLumpSum {
  id_mail_surat_tugas_lumpsum_biaya: string
  id_mail_surat_tugas: string
  id_mail_surat_tugas_lumpsum: string
  id_satuan_organisasi: string
  id_jenis_biaya: string
  id_jenis_transportasi: string
  no_ticket: string
  jumlah_hari: number
  biaya_perhari: string | null
  harga: string
  redaksi: string
  is_rill: boolean
  nama_penandatangan: string
}
