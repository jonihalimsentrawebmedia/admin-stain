import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput'
import ButtonForm from '@/components/common/button/ButtonForm'
import {
  type IManagementUnitTypeForm,
  type ManagementUnitList,
  ManagementUnitResolver,
} from '@/pages/modules/website-utama/program-studi/detail/model/management-unit.tsx'
import ImageUplaod from '@/pages/modules/website-utama/program-studi/detail/unit-pengelola/components/ImageUpload.tsx'
import { IconEdit } from '@/components/common/table/icon.tsx'

interface Props {
  data: ManagementUnitList
}

const ButtonEditManagementUnit = (props: Props) => {
  const { data } = props
  const form = useForm<IManagementUnitTypeForm>({
    resolver: zodResolver(ManagementUnitResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IManagementUnitTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/prodi/profil/unit-pengelola/${data?.id_unit_pengelola}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['management-unit'],
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
        title={'Ubah Data Unit Pengelola'}
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

export default ButtonEditManagementUnit
