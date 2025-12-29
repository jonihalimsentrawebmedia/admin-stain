import { formatDateTime } from '@/utils/date'
import { useForm } from 'react-hook-form'
import useGetCalloborationDetail from '../controller/useGetCalloborationDetail'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CalloborationDetailViewModel = () => {
  const navigate = useNavigate()
  const { calloborationDetail } = useGetCalloborationDetail()
  const form = useForm()
  const fieldUnit = [
    {
      label: 'Kelompok*',
      name: 'kelompok',
    },
    {
      label: 'Unit*',
      name: 'nama_unit',
    },
  ]

  const fieldIdentitas = [
    {
      label: 'Nama Mitra*',
      name: 'nama_mitra',
    },
    {
      label: '',
      name: '',
    },
    {
      label: 'Negara*',
      name: 'nama_negara',
    },
    {
      label: '',
      name: '',
    },
    {
      label: 'Provinsi*',
      name: 'nama_provinsi',
    },
    {
      label: 'Kabupaten*',
      name: 'nama_kabupaten',
    },
    {
      label: 'Alamat Mitra*',
      name: 'alamat_mitra',
    },
  ]

  const fieldLegalitas = [
    {
      label: 'No. Kerjasama*',
      name: 'no_kerjasama',
    },
     {
      label: '',
      name: '',
    },
    {
      label: 'Jenis*',
      name: 'nama_jenis_kerjasama',
    },
    {
      label: 'Bidang*',
      name: 'nama_bidang_kerjasama',
    },
    {
      label: 'Kategori*',
      name: 'nama_kategori_kerjasama',
    },
    {
      label: 'Sub Kategori',
      name: 'nama_sub_kategori_kerjasama',
    },
  ]

  const fieldExpired = [
    {
      label: 'Tanggal Mulai*',
      name: 'tanggal_mulai',
      component: <div>{formatDateTime(calloborationDetail?.tanggal_mulai ?? null).date}</div>,
    },
    {
      label: 'Tanggal Selesai*',
      name: 'tanggal_selesai',
      component: <div>{formatDateTime(calloborationDetail?.tanggal_selesai ?? null).date}</div>,
    },
    {
      label: 'Periode*',
      name: 'periode',
    },
  ]
  const fieldSubtansi = [
    {
      label: 'Detail Kerjasama*',
      name: 'detail_kerjasama',
    },
    {
      label: 'Detail Kerjasama*',
      name: 'detail_kerjasama',
    },
    {
      label: 'Manfaat Untuk Mitra*',
      name: 'manfaat_untuk_mitra',
    },
    {
      label: 'Manfaat Untuk [Nama Universitas]*',
      name: 'manfaat_untuk_univ',
    },
  ]

  useEffect(() => {
    if (calloborationDetail) {
      form.reset({
        ...calloborationDetail,
      })
    }
  }, [calloborationDetail])

  function goToEdit() {
    navigate(
      `/modules/website-utama/kerjasama/daftar-kerjasama/${calloborationDetail?.id_kerjasama}/edit`
    )
  }

  return {
    fieldExpired,
    fieldIdentitas,
    fieldLegalitas,
    fieldUnit,
    fieldSubtansi,
    form,
    goToEdit,
  }
}

export default CalloborationDetailViewModel
