import { useForm } from 'react-hook-form'
import useGetCalloborationCategory from '../../kategori-kerjasama/controller/useGetCalloborationCategory'
import type { SubCalloborationCategory } from '../model'
import {
  SubCalloborationCategoryResolver,
  type ISubCalloborationCategoryTypeForm,
} from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput'
import TextInput from '@/components/common/form/TextInput'
import ButtonForm from '@/components/common/button/ButtonForm'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: SubCalloborationCategory
}
const ButtonEditSubCalloborationCategory = ({ data }: Props) => {
  const { calloborationCategory } = useGetCalloborationCategory()
  const form = useForm<ISubCalloborationCategoryTypeForm>({
    resolver: zodResolver(SubCalloborationCategoryResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: ISubCalloborationCategoryTypeForm) => {
    setLoading(true)
    await AxiosClient.put(
      `/website-utama/sub-kategori-kerjasama/${data.id_sub_kategori_kerjasama}`,
      {
        ...e,
      }
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-sub-calloboration-category'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah sub kategori kerjasama')
          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'bg-yellow-500 text-white p-1.5 hover:bg-yellow-600 rounded'}
        onClick={() => {
          setOpen(true)
          form.reset({
            ...data,
          })
        }}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Edit Sub Kategori Kerjasama'}
        width="50%"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
            <SelectBasicInput
              isRow
              data={calloborationCategory.map((item) => {
                return {
                  label: item.nama_kategori_kerjasama,
                  value: item.id_kategori_kerjasama,
                }
              })}
              placeholder="Pilih Kategori Kerjasama"
              form={form}
              label="Kategori Kerjasama"
              name="id_kategori_kerjasama"
            />
            <TextInput
              form={form}
              name="nama_sub_kategori"
              isRow
              label="Nama Kategori Kerjasama*"
              placeholder="Nama Kategori Kerjasama"
            />
            <ButtonForm
              loading={loading}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}

export default ButtonEditSubCalloborationCategory
