import { useState } from 'react'
import type { EducationalLevelList } from '../model'
import { useForm } from 'react-hook-form'
import { EducationalLevelResolver, type EducationalLevelType } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import { InputText } from '@/components/common/form/InputText'
import ButtonForm from '@/components/common/button/ButtonForm'

interface Props {
  data: EducationalLevelList
}
const ButtonEditEducationalLevel = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<EducationalLevelType>({
    resolver: zodResolver(EducationalLevelResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(values: EducationalLevelType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/pengaturan/referensi/jenjang-pendidikan/${data.id_jenjang}`,
        values
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-educational-level'],
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
        title={<p className="text-2xl ">Edit Jenjang Pendidikan Pendidikan</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <InputText
                form={form}
                name="kode_jenjang"
                isRow
                label="Kode Jenjang Pendidikan"
                placeholder="Cth: S1, S2, S3"
              />
              <InputText
                form={form}
                name="nama_jenjang"
                isRow
                label="Nama Jenjang Pendidikan"
                placeholder="Cth: Sarjana"
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

export default ButtonEditEducationalLevel
