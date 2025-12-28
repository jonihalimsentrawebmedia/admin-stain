import { useState } from 'react'
import { ProvinceResolver, type ProvinceType } from '../model/resolver'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import type { ProvinceList } from '../model'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import { InputText } from '@/components/common/form/InputText'
import ButtonForm from '@/components/common/button/ButtonForm'
import { SelectCustom } from '@/components/common/form/SelectCustom'
interface Props {
  data: ProvinceList
  optionCountry: {
    label: string
    value: string
  }[]
}
const ButtonEditProvince = ({ data, optionCountry }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<ProvinceType>({
    resolver: zodResolver(ProvinceResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(values: ProvinceType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/pengaturan/referensi/provinsi/${data.id_provinsi}`,
        values
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-province'],
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
        title={<p className="text-2xl ">Edit Provinsi</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <SelectCustom
                isRow
                data={optionCountry}
                form={form}
                name="id_negara"
                label="Negara"
                placeholder="Pilih Negara"
                level1
              />
              <InputText form={form} name="kode" isRow label="Kode" placeholder="Kode" />

              <InputText
                form={form}
                name="nama_provinsi"
                isRow
                label="Nama Provinsi"
                placeholder="Nama Provinsi"
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

export default ButtonEditProvince
