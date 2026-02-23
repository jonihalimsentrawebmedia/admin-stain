const AdmissionInformationPublicLogViewModel = () => {
  const fieldLog = [
    {
      name: 'nama_lengkap',
      label: 'Nama Lengkap (Sesuai KTP)*',
    },
    {
      name: 'no_hp',
      label: 'No. Handphone*',
    },
    {
      name: 'email',
      label: 'Email*',
    },
    {
      name: 'jenis_informasi_dibutuhkan',
      label: 'Jenis Informasi yang Dibutuhkan*',
    },
    {
      name: 'tujuan_penggunaan_informasi',
      label: 'Tujuan Penggunaan Informasi*',
    },
  ]
  return {
    fieldLog,
  }
}

export default AdmissionInformationPublicLogViewModel
