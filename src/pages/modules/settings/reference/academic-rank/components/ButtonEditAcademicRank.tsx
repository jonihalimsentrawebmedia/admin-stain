import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm'
import { InputText } from '@/components/common/form/InputText'
import { AcademicRankResolver, type AcademicRankList, type AcademicRankType } from '../model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: AcademicRankList
}
const ButtonEditAcademicRank = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<AcademicRankType>({
    resolver: zodResolver(AcademicRankResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(values: AcademicRankType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(
        `/pengaturan/referensi/pangkat-akademik/${data.id_akademik}`,
        values
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-academic-rank'],
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
        title={<p className="text-2xl ">Edit Pangkat Akademik</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <InputText
                form={form}
                name="nama_akademik"
                isRow
                label="Nama Pangkat Akademik"
                placeholder="Nama Pangkat Akademik"
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

export default ButtonEditAcademicRank
