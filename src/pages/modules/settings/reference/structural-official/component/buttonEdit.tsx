import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { IStructuralPosition } from '@/pages/modules/settings/reference/structural-official/data/types.ts'
import { HiPencil } from 'react-icons/hi'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  data: IStructuralPosition
}

const ButtonCreateStructural = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<{ nama_jabatan_struktural: string }>({
    resolver: zodResolver(
      z.object({
        nama_jabatan_struktural: z.string({ error: 'nama Wajib Diisi' }),
      })
    ),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_jabatan_struktural: data.nama_jabatan_struktural,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: { nama_jabatan_struktural: string }) => {
    setLoading(true)
    await AxiosClient.put(
      `/pengaturan/referensi/jabatan-struktural/${data?.id_jabatan_struktural}`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['structural-official'],
          })
          toast.success(res.data.message)
          form.reset()
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
        className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
        onClick={() => {
          setOpen(true)
        }}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Edit Jabatan Struktural'}
        className={'max-w-2xl! w-full! rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'nama_jabatan_struktural'}
              form={form}
              label={'Nama Jabatan Struktural'}
              placeholder={'Nama Jabatan Struktural'}
              htmlFor={'nama_jabatan_struktural'}
              isRow
              isRequired
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}

export default ButtonCreateStructural
