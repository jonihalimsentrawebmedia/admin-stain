import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import type { IStatusActiveSDM } from '@/pages/modules/website-utama/lecturer-staff/status-active/data/types.tsx'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IStatusActiveSDM
}

const ButtonEditStatusActive = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<{
    kode_status: string
    nama_status: string
  }>({
    resolver: zodResolver(
      z.object({
        kode_status: z.string({ error: 'Kode Status Wajib Diisi' }),
        nama_status: z.string({ error: 'Nama Status Wajib Diisi' }),
      })
    ),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode_status: data?.kode_status,
        nama_status: data?.nama_status,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: { kode_status: string; nama_status: string }) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm-status-aktif/${data?.id_status_aktif_sdm}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['status-sdm'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Status Active'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              form={form}
              name={'kode_status'}
              label={'Kode Status'}
              htmlFor={'kode_status'}
              placeholder={'Kode Status'}
              isRequired
              isRow
            />

            <TextInput
              form={form}
              name={'nama_status'}
              label={'Nama Status'}
              htmlFor={'nama_status'}
              placeholder={'Nama Status'}
              isRequired
              isRow
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonEditStatusActive
