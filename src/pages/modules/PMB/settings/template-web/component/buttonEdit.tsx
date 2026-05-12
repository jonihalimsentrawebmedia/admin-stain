import { HiPencil } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { IThemePMB } from '../data/types'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data: IThemePMB
}

const ButtonEditDescription = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<{ keterangan: string }>()

  useEffect(() => {
    if (data) {
      form.reset({
        keterangan: data?.keterangan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/pmb/thema/${data?.thema}/keterangan`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan update data keterangan thema')
          queryClient.invalidateQueries({ queryKey: ['template-pmb'] })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className={'flex items-center gap-2'}>
        {data?.keterangan}

        <button
          onClick={() => setOpen(!open)}
          disabled={loading}
          className={
            'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600 disabled:bg-gray-300'
          }
        >
          <HiPencil />
        </button>
      </div>

      <DialogBasic title={'Ubah Data Keterangan Thema'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'keterangan'}
              form={form}
              label={'Keterangan'}
              placeholder={'Keterangan Thema'}
              isRow
              isRequired
            />
            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonEditDescription
