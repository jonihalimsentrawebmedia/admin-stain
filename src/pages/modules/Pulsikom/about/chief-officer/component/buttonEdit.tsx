import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IGroupChief } from '@/pages/modules/Pulsikom/about/chief-officer/data/types.ts'

interface IProps {
  data: IGroupChief
}

export const ButtonEditChiefOfficer = (prop: IProps) => {
  const { data } = prop
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (data) {
      form.reset({
        nama_kelompok: data?.nama_kelompok,
      })
    }
  }, [])

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.put(`/pusilkom/kelompok-pimpinan/${data?.id_kelompok_pimpinan}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(!open)
          queryClient.invalidateQueries({
            queryKey: ['chief-officer'],
          })
          toast.success(res.data.message || 'Success')
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
        className={'bg-yellow-500 p-1.5 text-white hover:text-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Kelompok'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'nama_kelompok'}
              form={form}
              label={'Nama Kelompok'}
              placeholder={'Nama Kelompok'}
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
