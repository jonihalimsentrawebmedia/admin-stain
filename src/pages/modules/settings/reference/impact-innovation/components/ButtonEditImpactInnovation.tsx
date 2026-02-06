import { DialogCustom } from '@/components/common/dialog/DialogCustom'

import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm'
import { InputText } from '@/components/common/form/InputText'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { ImpactInnovationResolver, type ImpactInnovationType, type InovationList } from '../model'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: InovationList
}
const ButtonEditImpactInnovation = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<ImpactInnovationType>({
    resolver: zodResolver(ImpactInnovationResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(values: ImpactInnovationType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/pengaturan/referensi/inovasi-berdampak/${data.id_inovasi}`,
        values
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-impact-innovation'],
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
        className={'text-white bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded'}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Kategori Inovasi Berdampak</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <InputText
                form={form}
                name="nama_inovasi"
                isRow
                label="Nama Kategori"
                placeholder="Nama Kategori"
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

export default ButtonEditImpactInnovation
