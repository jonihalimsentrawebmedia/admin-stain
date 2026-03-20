import { IconEdit } from '@/components/common/table/icon.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import ImageUplaod from './ImageUpload.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import {
  type IManagementUnit,
  type IManagementUnitTypeForm,
  ManagementUnitResolver,
} from '@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola/data/resolver.tsx'

interface Props {
  data: IManagementUnit
}

const ButtonEditUserProdi = ({ data }: Props) => {
  const form = useForm<IManagementUnitTypeForm>({
    resolver: zodResolver(ManagementUnitResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleSave = async (e: IManagementUnitTypeForm) => {
    setLoading(true)
    await AxiosClient.put(
      `/fakultas/satuan-organisasi/${data?.id_unit}/unit-pengelola/${data?.id_unit_pengelola}`,
      {
        ...e,
      }
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['faculty-unit'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah unit pengelola')
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
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Tambah Unit Pengelola'}
        width="50%"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
            <ImageUplaod form={form} name="gambar_url" />
            <TextInput form={form} name="nama" isRow label="Nama" placeholder="Nama" />
            <TextInput form={form} name="jabatan" isRow label="Jabatan" placeholder="Jabatan" />
            <TextInput
              form={form}
              name="urutan"
              isRow
              isNumber
              type="number"
              label="Urutan"
              placeholder="Urutan"
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

export default ButtonEditUserProdi
