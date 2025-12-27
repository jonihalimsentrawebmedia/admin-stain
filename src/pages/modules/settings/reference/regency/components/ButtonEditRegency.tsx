import { useState } from 'react'
import type { RegencyList } from '../model'
import { useForm } from 'react-hook-form'
import { RegencyResolver, type RegencyType } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import useGetCountry from '../../country/controller/useGetCountry'
import useGetProvince from '../../province/controller/useGetProvince'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { SelectCustom } from '@/components/common/form/SelectCustom'
import { InputText } from '@/components/common/form/InputText'
import ButtonForm from '@/components/common/button/ButtonForm'
import { Form } from '@/components/ui/form'
interface Props {
  data: RegencyList
}
const ButtonEditRegency = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<RegencyType>({
    resolver: zodResolver(RegencyResolver),
  })
  const { country } = useGetCountry({ isGetAll: true })
  const { province } = useGetProvince({ isGetAll: true, id_negara: form.watch('id_negara') })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(values: RegencyType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/pengaturan/referensi/kabupaten/${data.id_kabupaten}`,
        values
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-regency'],
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
  const optionCountry = country.map((item) => {
    return {
      value: item.id_negara,
      label: item.nama_negara,
    }
  })
  const optionProvince = province.map((item) => {
    return {
      value: item.id_provinsi,
      label: item.nama_provinsi,
    }
  })
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
        title={<p className="text-2xl ">Edit Kabupaten</p>}
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
                fx={() => {
                  form.setValue('id_provinsi', "")
                }}
              />
              <SelectCustom
                isRow
                data={optionProvince}
                form={form}
                name="id_provinsi"
                label="Provinsi"
                placeholder="Pilih Provinsi"
                level2
                isDisabled={form.watch('id_negara') == undefined}
              />
              <InputText
                form={form}
                name="nama_kabupaten"
                isRow
                label="Nama Kabupaten"
                placeholder="Nama Kabupaten"
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

export default ButtonEditRegency
