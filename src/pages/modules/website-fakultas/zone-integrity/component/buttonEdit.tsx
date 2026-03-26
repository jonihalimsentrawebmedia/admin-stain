import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/data/types.ts'
import { HiPencil } from 'react-icons/hi'

export interface props {
  data?: IZoneIntegrity
}

export const ButtonEditZoneIntegrityCategory = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (data) {
      form.reset({
        nama_kategori: data?.nama_kategori,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandelSubmit = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(
      `/fakultas/zona-integritas-kategori/${data?.id_zona_integritas_kategori}`,
      e
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['zone-integrity'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }
  return (
    <>
      <button
        className={'bg-yellow-500 text-white p-1.5 hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(true)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Kategori'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'space-y-5'} onSubmit={form.handleSubmit(HandelSubmit)}>
            <TextInput
              name={'nama_kategori'}
              form={form}
              label={'Nama Kategori'}
              placeholder={'Masukkan Nama Kategori'}
              isRequired
              isRow
            />
            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
