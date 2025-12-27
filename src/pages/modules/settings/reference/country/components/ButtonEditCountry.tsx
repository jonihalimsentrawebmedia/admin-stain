import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CountryResolver, type CountryType } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CountryList } from '../model'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import { InputText } from '@/components/common/form/InputText'
import ButtonForm from '@/components/common/button/ButtonForm'
interface Props {
  data: CountryList
}
const ButtonEditCountry = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<CountryType>({
    resolver: zodResolver(CountryResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(values: CountryType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/pengaturan/referensi/negara/${data.id_negara}`, values)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-country'],
        })
        setOpen(false)
        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => {
          setOpen(true)
          form.reset({
            ...data,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Negara</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <InputText
                form={form}
                name="nama_negara"
                isRow
                label="Nama Negara"
                placeholder="Nama Negara"
              />
              <ButtonForm
                loading={loading}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonEditCountry
