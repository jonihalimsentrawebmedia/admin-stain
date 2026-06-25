import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ResolverBankAccount,
  type TResolverBankAccount,
} from '@/pages/modules/Pulsikom/reference/bank-account/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/types.ts'

interface Props {
  data: IBankAccount
}

export const ButtonEditBankAccount = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverBankAccount>({
    resolver: zodResolver(ResolverBankAccount),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        atas_nama: data?.atas_nama,
        is_utama: data?.is_utama,
        no_rekening: data?.no_rekening,
        nama_rekening: data?.nama_rekening,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverBankAccount) => {
    setLoading(true)
    await AxiosClient.put(`/pusilkom/rekening/${data?.id_rekening}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['bank-account'],
          })
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
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Edit Rekening'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              form={form}
              name={'nama_rekening'}
              label={'Nama Rekening'}
              placeholder={'Nama Rekening'}
              isRequired
              isRow
            />
            <TextInput
              form={form}
              name={'no_rekening'}
              label={'No. Rekening'}
              placeholder={'No. Rekening'}
              type={'number'}
              isRequired
              isRow
            />

            <TextInput
              form={form}
              name={'atas_nama'}
              label={'Atas Nama'}
              placeholder={'Rekening Atas Nama'}
              isRequired
              isRow
            />

            <InputRadio
              form={form}
              name={'is_utama'}
              label={'Jadikan Utama'}
              isRow
              isRequired
              data={[
                { value: true, label: 'Ya' },
                { value: false, label: 'Tidak' },
              ]}
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
