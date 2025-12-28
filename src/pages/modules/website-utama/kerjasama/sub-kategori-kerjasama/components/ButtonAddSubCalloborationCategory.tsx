import { zodResolver } from '@hookform/resolvers/zod'
import {
  SubCalloborationCategoryResolver,
  type ISubCalloborationCategoryTypeForm,
} from '../model/resolver'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import TextInput from '@/components/common/form/TextInput'
import ButtonForm from '@/components/common/button/ButtonForm'
import { useForm } from 'react-hook-form'
import useGetCalloborationCategory from '../../kategori-kerjasama/controller/useGetCalloborationCategory'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput'
import { Form } from '@/components/ui/form'

const ButtonAddSubCalloborationCategory = () => {
  const { calloborationCategory } = useGetCalloborationCategory()
  const form = useForm<ISubCalloborationCategoryTypeForm>({
    resolver: zodResolver(SubCalloborationCategoryResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: ISubCalloborationCategoryTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/sub-kategori-kerjasama', {
      ...e,
    })
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
      <Button
        variant={'outline'}
        onClick={() => {
          setOpen(true)
        }}
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah
      </Button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Tambah Kategori Kerjasama'}
        width="50%"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
            <SelectBasicInput
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
              isRow
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

export default ButtonAddSubCalloborationCategory
