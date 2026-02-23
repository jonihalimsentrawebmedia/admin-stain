import { useForm } from 'react-hook-form'
import { MdOpenInNew } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { useGetAdmissionInformationPublicDetail } from '../hooks'
import { useEffect } from 'react'

const AdmissionInformationPublicDetailViewModel = () => {
  const { id } = useParams()
  const { admissionPublic, loading } = useGetAdmissionInformationPublicDetail(id!)
  const form = useForm()
  const field = [
    {
      name: 'tanggal_permohonan',
      label: 'Tanggal Masuk Permohonan',
    },
    {
      name: 'nama_lengkap',
      label: 'Nama Lengkap (Sesuai KTP)*',
    },
    {
      name: 'alamat_ktp',
      label: 'Alamat (Sesuai KTP)*',
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
      name: 'rincian_informasi_dibutuhkan',
      label: 'Rincian Informasi Yang Dibutuhkan*',
    },
    {
      name: 'tujuan_penggunaan_informasi',
      label: 'Tujuan Penggunaan Informasi*',
    },
    {
      name: 'cara_memperoleh_informasi',
      label: 'Cara Memperoleh Informasi*',
    },
    {
      name: 'cara_mendapatkan_salinan_informasi',
      label: 'Cara Mendapatkan Salinan Informasi*',
    },
    {
      name: 'file_lampiran',
      label: 'KTP (.pdf)*',
      component: (
        <Link to={form.watch('file_lampiran')} className="flex gap-2 text-primary items-center">
          <MdOpenInNew />
          Buka File
        </Link>
      ),
    },
  ]
  const field2 = [
    {
      label: 'Jenjang Pendidikan Ujian Masuk',
      name: 'jenjang_pendidikan_ujian_masuk',
    },
    {
      label: 'Nomor Ujian Masuk',
      name: 'nomor_ujian_masuk',
    },
    {
      label: 'Kartu Ujian (.pdf)',
      name: 'file_kartu_ujian',
    },
  ]

  useEffect(() => {
    if (admissionPublic) {
      form.reset({
        ...admissionPublic,
      })
    }
  }, [admissionPublic])
  return {
    field,
    field2,
    form,loading,admissionPublic,id
  }
}

export default AdmissionInformationPublicDetailViewModel
