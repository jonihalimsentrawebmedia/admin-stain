import { IconEdit } from '@/components/common/table/icon'
import {
  ManagementUnitResolver,
  type IManagementUnitTypeForm,
  type ManagementUnitList,
} from '../../model/management-unit'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import ImageUplaod from './ImageUpload'
import TextInput from '@/components/common/form/TextInput'
import ButtonForm from '@/components/common/button/ButtonForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'

interface Props {
  data: ManagementUnitList
}

const ButtonEditManagementUnit = ({ data }: Props) => {
  const form = useForm<IManagementUnitTypeForm>({
    resolver: zodResolver(ManagementUnitResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const queryClient = useQueryClient()

  const handleSave = async (e: IManagementUnitTypeForm) => {
    setLoading(true)
    await AxiosClient.put(
      `/website-utama/satuan-organisasi/${id}/unit-pengelola/${data.id_unit_pengelola}`,
      {
        ...e,
      }
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['program-studi-management-unit'],
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

export default ButtonEditManagementUnit
