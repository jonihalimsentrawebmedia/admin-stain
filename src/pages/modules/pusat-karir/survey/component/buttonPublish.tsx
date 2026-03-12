import { Button } from '@/components/ui/button.tsx'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { type PublishSurveyData, ResolverPublishSurvey } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data: ISurveyQuestion
}

export const ButtonPublish = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<PublishSurveyData>({
    resolver: zodResolver(ResolverPublishSurvey),
    defaultValues: {
      is_mitra_kerja: false,
      is_pencari_kerja: false,
    },
  })

  const queryClient = useQueryClient()

  const HandlePublishSurvey = async (value: PublishSurveyData) => {
    setLoading(true)
    await AxiosClient.patch(
      `/pusat-karir/survei/${data.id_survei_pertanyaan}/terbitkan-survei`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['survey'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Berhasil menerbitkan survei')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal menerbitkan survei')
      })
  }

  return (
    <>
      <Button
        className={'text-primary border-primary hover:text-primary'}
        variant={'outline'}
        onClick={() => setOpen(!open)}
      >
        <ArrowUp className={'size-4'} />
        Terbitkan Survei
      </Button>

      <DialogBasic
        className={'rounded min-w-2xl'}
        title={'Terbitkan Survei?'}
        open={open}
        setOpen={setOpen}
      >
        <div>
          <p className="">
            Survei <span className="text-primary">{`"${data?.judul}"`}</span> akan diterbitkan.
            Mohon tentukan terlebih dahulu kategori pengisi dan periode pengisiannya.
          </p>

          <Form {...form}>
            <form
              className={'flex flex-col gap-4 mt-5'}
              onSubmit={form.handleSubmit(HandlePublishSurvey)}
            >
              <div className="grid grid-cols-[12rem_1fr] gap-5">
                <p className="text-gray-500">Kategori Responden</p>
                <div className="flex items-center gap-x-4">
                  <CheckboxInputBasic name={'is_mitra_kerja'} label={'Mitra Kerja'} form={form} />
                  <CheckboxInputBasic
                    name={'is_pencari_kerja'}
                    label={'Pencari Kerja'}
                    form={form}
                  />
                </div>
              </div>

              <TextInput
                name={'tanggal_mulai'}
                label={'Tanggal Mulai'}
                type={'date'}
                form={form}
                isRequired
                isRow
              />

              <TextInput
                name={'tanggal_selesai'}
                label={'Tanggal Selesai'}
                type={'date'}
                form={form}
                isRequired
                isRow
              />

              <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
            </form>
          </Form>
        </div>
      </DialogBasic>
    </>
  )
}
