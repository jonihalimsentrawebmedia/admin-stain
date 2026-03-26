import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IProgramStudy } from '../data/types'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IProgramStudy
}

export const ButtonEditStudyProgram = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(
      `/fakultas/daftar-program-pendidikan/${data?.id_daftar_program_pendidikan}`,
      e
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['list-study-program'],
          })
          toast.success(res.data.message || 'Successfully added.')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.message || 'Something went wrong')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded text-white'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Tambah Program Pendidikan'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-5xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              placeholder={'Nama Program Pendidikan'}
              name={'nama_program_pendidikan'}
              form={form}
              label={'Nama Program Pendidikan'}
              isRequired
            />

            <RichText
              form={form}
              name={'deskripsi_program_pendidikan'}
              isRow={false}
              showLabel={true}
              label={'Deskripsi Program Pendidikan'}
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
