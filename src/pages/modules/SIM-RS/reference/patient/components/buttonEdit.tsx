import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverPatient, type TResolverPatient } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IPatient } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import FormPatient from './forms.tsx'
import { format, parseISO } from 'date-fns'

interface Props {
  data: IPatient
  label?: string
}

export const ButtonEditPatient = (props: Props) => {
  const { data } = props
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/modules/sim-rs/reference/patient/edit/${data.id_pasien}`)}
      className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
    >
      <HiPencil />
    </button>
  )
}

export const FormEditPatient = (props: Props) => {
  const { data, label } = props
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPatient>({
    resolver: zodResolver(ResolverPatient),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_lengkap: data.nama_lengkap,
        nik: data.nik,
        tempat_lahir: data.tempat_lahir,
        tanggal_lahir: data.tanggal_lahir?.split('T')[0] ?? '',
        jenis_kelamin: data.jenis_kelamin,
        golongan_darah: data.golongan_darah,
        agama: data.agama,
        status_perkawinan: data.status_perkawinan,
        pekerjaan: data.pekerjaan,
        alamat: data.alamat,
        no_telepon: data.no_telepon,
        email: data.email,
        id_negara: data.id_negara,
        id_provinsi: data.id_provinsi,
        id_kabupaten: data.id_kabupaten,
        kontak_darurat_nama: data.kontak_darurat_nama,
        telepon_kontak_darurat: data.telepon_kontak_darurat,
        email_kontak_darurat: data.email_kontak_darurat,
        is_status: data.is_status,
        tanggal_registrasi: format(parseISO(data.tanggal_registrasi), "yyyy-MM-dd'T'HH:mm"),
        medical_record_number: data?.no_rekam_medis,
        sumber_biaya_pengobatan: data?.sumber_biaya_pengobatan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const HandleSave = async (value: TResolverPatient) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/referensi/pasien/${data?.id_pasien}`, {
      ...value,
      tanggal_lahir: new Date(value.tanggal_lahir).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data pasien')
          queryClient.invalidateQueries({ queryKey: ['patient'] })
          queryClient.invalidateQueries({ queryKey: ['detail-patient', data?.id_pasien] })
          setLoading(false)
          navigate('/modules/sim-rs/reference/patient')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <FormPatient
      label={label}
      isEdit={true}
      loading={loading}
      form={form}
      HandleSave={HandleSave}
    />
  )
}
