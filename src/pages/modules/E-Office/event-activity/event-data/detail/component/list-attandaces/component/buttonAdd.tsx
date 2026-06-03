import { Button } from '@/components/ui/button.tsx'
import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormAttendance from './form.tsx'
import { ResolverAttendance, type TResolverAttendance } from './resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetSessionEOffice } from '@/pages/modules/E-Office/session/hooks.tsx'

const ButtonAddAttendance = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { session } = UseGetSessionEOffice()

  const form = useForm<TResolverAttendance>({
    resolver: zodResolver(ResolverAttendance),
  })

  console.log(form.formState.errors, 'errors')

  useEffect(() => {
    if (session) {
      form.setValue('id_unit', session?.id_satuan_organisasi)
    }
  }, [session])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverAttendance) => {
    setLoading(true)
    if (value.sumber_data === 'MANUAL') {
      await AxiosClient.post(`/eoffice/acara/${id}/daftar-hadir`, {
        nama_lengkap: value.nama_lengkap,
        id_unit: value.id_unit,
        id_unit_kerja: value.id_unit_kerja,
        jabatan: value.jabatan,
        no_hp: value.no_hp,
      })
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            setOpen(false)
            queryClient.invalidateQueries({
              queryKey: ['attendance'],
            })
            form.reset()
            toast.success(res.data.message || 'Success')
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err?.response?.data?.message || 'Something went wrong')
        })
    } else if (value.sumber_data === 'INTERNAL') {
      await AxiosClient.post(`/eoffice/acara/${id}/daftar-hadir/import-from-sdm`, {
        id_sdm: value?.id_sdm,
      })
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            setOpen(false)
            queryClient.invalidateQueries({
              queryKey: ['attendance'],
            })
            form.reset()
            toast.success(res.data.message || 'Success')
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err?.response?.data?.message || 'Something went wrong')
        })
    }
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary rounded-full'}
        onClick={() => setOpen(!open)}
      >
        Tambah Daftar Hadir
      </Button>

      <DialogBasic title={'Tambah Data'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <FormAttendance
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          setOpen={setOpen}
          open={open}
        />
      </DialogBasic>
    </>
  )
}
export default ButtonAddAttendance
