import { useParams } from 'react-router-dom'
import { useGetObjectionsPublicDetail } from '../hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ObjectionsPublicDetailViewModel = () => {
  const form = useForm()
  const { id } = useParams()
  const { loading, objectionPublic } = useGetObjectionsPublicDetail(id!)
  const fieldRegistrasi = [
    {
      name: 'no_pemohonan_informasi',
      label: 'Nomor Permohonan Informasi',
    },
    {
      name: 'tujuan_penggunaan_informasi',
      label: 'Tujuan Penggunaan Informasi',
    },
    {
      name: 'nama_lengkap',
      label: 'Nama Lengkap *',
    },
    {
      name: 'alamat_ktp',
      label: 'Alamat *',
    },
    {
      name: 'no_identitas',
      label: 'No. Identitas (KTP/SIM)*',
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
      name: 'pekerjaan',
      label: 'Pekerjaan*',
    },
  ]
  const fieldIdentity = [
    {
      name: 'url_file_surat_kuasa',
      label: 'File Surat Kuasa',
    },
    {
      name: 'nama_lengkap_Kuasa',
      label: 'Nama Lengkap ',
    },
    {
      name: 'alamat_kuasa',
      label: 'Alamat  ',
    },
    {
      name: 'no_identitas_kuasa',
      label: 'No. Identitas (KTP/SIM)',
    },
    {
      name: 'no_hp_kuasa',
      label: 'No. Handphone',
    },
  ]
  const fieldKasus = [
    {
      name: 'kasus_posisi',
      label: 'Kasus Posisi*',
    },
  ]

  useEffect(() => {
    if (objectionPublic) {
      form.reset({
        ...objectionPublic,
      })
    }
  }, [objectionPublic])
  return {
    fieldIdentity,
    fieldRegistrasi,
    fieldKasus,
    id,
    loading,
    form,objectionPublic
  }
}

export default ObjectionsPublicDetailViewModel
