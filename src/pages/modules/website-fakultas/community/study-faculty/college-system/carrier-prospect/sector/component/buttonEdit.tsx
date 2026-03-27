import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ISectorStudy } from '../data/types'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data?: ISectorStudy
}

export const ButtonEditSectorCarrierProspect = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id: id_prodi } = useParams()
  const form = useForm()

  useEffect(() => {
    if (data) {
      form.reset({
        nama_sektor_pendidikan: data?.nama_sektor_pendidikan,
        deskripsi_sektor_pendidikan: data?.deskripsi_sektor_pendidikan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(
      `/fakultas/detail-sektor-pendidikan/${data?.id_detail_sektor_pendidikan}`,
      {
        ...e,
        id_prodi: id_prodi,
      }
    )
      .then((res) => {
        if (res.data?.status) {
          toast.success(res.data.message || 'Success')
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['sector-work'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Tambah Sektor Pekerjaan'}
        className={'min-w-5xl'}
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-4'}>
            <TextInput
              name={'nama_sektor_pendidikan'}
              form={form}
              label={'Nama Sektor Pekerjaan'}
              placeholder={'Nama Sektor Pekerjaan'}
              isRequired
            />
            <RichText
              form={form}
              name={'deskripsi_sektor_pendidikan'}
              isRow={false}
              showLabel={true}
              label={'Deskripsi Sektor Pekerjaan'}
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
