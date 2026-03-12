import { MdEditCalendar } from 'react-icons/md'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { format } from 'date-fns'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  data: ISurveyQuestion
}

const ResolverChangeDate = z.object({
  akhiri_sekarang: z.boolean(),
  tanggal_selesai: z.string(),
})

type TypeChange = z.infer<typeof ResolverChangeDate>

export const ButtonChangeDate = (props: Props) => {
  const { data } = props

  const form = useForm<TypeChange>({
    resolver: zodResolver(ResolverChangeDate),
  })

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleChangeDate = async (value: TypeChange) => {
    setLoading(true)
    await AxiosClient.patch(
      `/pusat-karir/survei/${data.id_survei_pertanyaan}/update-tanggal-akhir`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['survey'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Berhasil mengubah tanggal akhir survei')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengubah tanggal akhir survei')
      })
  }

  return (
    <>
      <button
        className={'border p-1.5 border-primary text-primary rounded'}
        onClick={() => setOpen(!open)}
      >
        <MdEditCalendar className={'size-4'} />
      </button>

      <DialogBasic
        className={'rounded min-w-2xl'}
        title={'Ubah Batas Akhir Survei'}
        open={open}
        setOpen={setOpen}
      >
        <div className="flex flex-col gap-4">
          <p>
            Anda akan mengubah tanggal batas akhir survei{' '}
            <span className={'text-primary'}>{`“${data?.judul}”`}</span>. Anda dapat memilih untuk
            mengakhiri sekarang atau pilih tanggal baru. Apakah anda yakin untuk melanjutkan?
          </p>

          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(HandleChangeDate)}>
              <InputRadio
                form={form}
                name={'akhiri_sekarang'}
                label={'Batas Akhir Survei'}
                data={[
                  {
                    label: 'Akhiri Sekarang',
                    value: true,
                  },
                  {
                    label: 'Pilih Tanggal',
                    value: false,
                  },
                ]}
                fx={() => {
                  if (form.watch('akhiri_sekarang') === true) {
                    form.setValue('tanggal_selesai', format(new Date(), 'yyyy-MM-dd'))
                  } else {
                    form.setValue('tanggal_selesai', '')
                  }
                }}
                isRequired
                isRow
              />

              <TextInput
                form={form}
                name={'tanggal_selesai'}
                type={'date'}
                label={'Tanggal Selesai'}
                isDisabled={!!form.watch('akhiri_sekarang')}
                isRow
                isRequired
              />
              <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
            </form>
          </Form>
        </div>
      </DialogBasic>
    </>
  )
}
