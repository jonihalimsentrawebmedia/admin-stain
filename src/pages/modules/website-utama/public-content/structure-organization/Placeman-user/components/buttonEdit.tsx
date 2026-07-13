import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { PlacemanResolver, type PlacemanType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormPlacemanUser } from '../components/form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IPlacemanUser } from '../data/index'
import { HiPencil } from 'react-icons/hi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'

export const ButtonEditPlaceman = (data: IPlacemanUser) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      form.reset({
        is_local_data: !!data?.id_sdm,
        id_sdm: data?.id_sdm,
        is_dosen: data?.is_dosen,
        gambar: data.gambar,
        nama_lengkap: data.nama_lengkap,
        id_kelompok_organisasi: data.id_kelompok_organisasi,
        no_hp: data.no_hp,
        email: data.email,
        show_email_public: data.show_email_public,
        show_no_hp_public: data.show_no_hp_public,
        urutan: data.urutan,
        nip: data?.nip,
        nidn: data?.nidn,
        id_pangkat_akademik: data?.id_pangkat_akademik,
        id_pangkat_golongan: data?.id_pangkat_golongan,
        jabatan: data?.jabatan,
      })
    }
  }, [data])

  const form = useForm<PlacemanType>({
    resolver: zodResolver(PlacemanResolver),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (e: PlacemanType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/pejabat/${data?.id_pejabat}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success tambah data pejabat')
          queryClient.invalidateQueries({
            queryKey: ['list-placeman'],
          })

          form.reset({
            show_email_public: false,
            show_no_hp_public: false,
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'bg-yellow-500 hover:bg-yellow-600 p-1.5 text-white rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        className={'rounded lg:min-w-4xl'}
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Pejabat'}
      >
        <FormPlacemanUser
          setOpen={setOpen}
          open={open}
          form={form}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}
