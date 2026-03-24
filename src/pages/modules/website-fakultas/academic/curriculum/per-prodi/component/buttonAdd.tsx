import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormCurriculumProdi } from '@/pages/modules/website-prodi/curriculum/components/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import {
  CurriculumResolver,
  type CurriculumResolverType,
} from '@/pages/modules/website-prodi/curriculum/data/resolver.tsx'
import type { ISessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'
import { useParams } from 'react-router-dom'

export const ButtonAddCurriculum = ({ session }: { session?: ISessionFaculty }) => {
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
    }
  }, [session])

  const queryClient = useQueryClient()

  const HandleSave = async (value: CurriculumResolverType) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/kurikulum', value)
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
      <Button
        className={'text-primary border-primary hover:text-primary'}
        variant={'outline'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Kurikulum
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Kurikulum'}
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
