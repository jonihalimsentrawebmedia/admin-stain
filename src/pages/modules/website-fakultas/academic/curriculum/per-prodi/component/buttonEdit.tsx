import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormCurriculumProdi } from '@/pages/modules/website-prodi/curriculum/components/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'
import { HiPencil } from 'react-icons/hi'
import { useQueryClient } from '@tanstack/react-query'
import type { ISessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'
import {
  CurriculumResolver,
  type CurriculumResolverType,
} from '@/pages/modules/website-prodi/curriculum/data/resolver.tsx'
import { useParams } from 'react-router-dom'

interface Props {
  session?: ISessionFaculty
  data?: ICurriculum
}

export const ButtonEditCurriculum = (props: Props) => {
  const { session, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id: id_prodi } = useParams()

  const form = useForm<CurriculumResolverType>({
    resolver: zodResolver(CurriculumResolver),
  })

  useEffect(() => {
    if (session) {
      form.reset({
        id_universitas: session.id_universitas,
        id_fakultas: session.id_fakultas,
        id_prodi: id_prodi,
      })
      if (data) {
        form.reset({
          id_universitas: session.id_universitas,
          id_fakultas: session.id_fakultas,
          id_prodi: id_prodi,
          nama_kurikulum: data.nama_kurikulum,
          lama_kuliah: data.lama_kuliah,
        })
      }
    }
  }, [session])

  const queryClient = useQueryClient()

  const HandleSave = async (value: CurriculumResolverType) => {
    setLoading(true)
    await AxiosClient.put(`/fakultas/kurikulum/${data?.id_kurikulum}`, {
      nama_kurikulum: value?.nama_kurikulum,
      lama_kuliah: value?.lama_kuliah,
    })
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success tambah kurikulum')
          queryClient.invalidateQueries({
            queryKey: ['curriculum-faculty'],
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
        className={'bg-yellow-500 hover:bg-yellow-500 text-white p-1.5'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Kurikulum'}
        className={'rounded lg:max-w-2xl'}
      >
        <FormCurriculumProdi
          form={form}
          setOpen={setOpen}
          open={open}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogCustom>
    </>
  )
}
