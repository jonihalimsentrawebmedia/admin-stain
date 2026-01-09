import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormCurriculumProdi } from '@/pages/modules/website-prodi/curriculum/components/form.tsx'
import type { ISessionProdi } from '@/pages/modules/website-prodi/hooks'
import { CurriculumResolver, type CurriculumResolverType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonAddCurriculum = ({ session }: { session?: ISessionProdi }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<CurriculumResolverType>({
    resolver: zodResolver(CurriculumResolver),
  })

  useEffect(() => {
    if (session) {
      form.reset({
        id_universitas: session.id_universitas,
        id_fakultas: session.id_fakultas,
        id_prodi: session.id_prodi,
      })
    }
  }, [session])

  const queryClient = useQueryClient()

  const HandleSave = async (value: CurriculumResolverType) => {
    setLoading(true)
    await AxiosClient.post('/prodi/kurikulum', value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success tambah kurikulum')
          queryClient.invalidateQueries({
            queryKey: ['curriculum'],
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
