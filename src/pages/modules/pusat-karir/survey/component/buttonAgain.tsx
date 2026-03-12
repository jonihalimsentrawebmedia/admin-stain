import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { toast } from 'react-toastify'
import { ArrowUp } from 'lucide-react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { differenceInCalendarDays, format } from 'date-fns'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data: ISurveyQuestion
}

export const ButtonPublishAgain = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      tanggal_mulai: format(new Date(data.tanggal_mulai), 'yyyy-MM-dd'),
      tanggal_selesai: format(new Date(data.tanggal_selesai), 'yyyy-MM-dd'),
    },
  })

  const queryClient = useQueryClient()

  const HandlePublishAgain = async (value: any) => {
    await AxiosClient.patch(
      `/pusat-karir/survei/${data?.id_survei_pertanyaan}/terbitkan-dari-arsip`,
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
        toast.error(err?.response?.data?.message || 'Gagal menerbitkan survei')
        setLoading(false)
      })
  }

  const Time = differenceInCalendarDays(new Date(), new Date(data.tanggal_mulai))
  console.log(Time)

  return (
    <>
      <button
        className={'p-1.5 rounded bg-green-500 text-white hover:bg-green-600'}
        onClick={() => setOpen(!open)}
      >
        <ArrowUp className={'size-4'} />
      </button>

      <DialogBasic title={'Terbitkan Kembali'} open={open} setOpen={setOpen}>
        <div className={'flex flex-col gap-4'}>
          <p>
            Survei <span className={'text-primary'}>{`“${data?.judul}”`}</span> akan diterbitkan
            kembali. Harap atur kembali periode pengisian survei yang akan diterbitkan kembali.
          </p>
          <p className="text-sm text-blue-500">
            Catatan: untuk survei yang telah melewati tanggal mulai survei, anda hanya bisa mengatur
            tanggal berakhir survei saja.
          </p>

          <Form {...form}>
            <form
              className={'flex flex-col gap-4'}
              onSubmit={form.handleSubmit(HandlePublishAgain)}
            >
              <TextInput
                isDisabled={Time >= 0}
                name={'tanggal_mulai'}
                form={form}
                label={'Tanggal Mulai'}
                type={'date'}
                isRow
                isRequired
              />
              <TextInput
                name={'tanggal_selesai'}
                form={form}
                label={'Tanggal Selesai'}
                type={'date'}
                isRow
                isRequired
              />

              <ButtonTitleGroup
                label={''}
                buttonGroup={[
                  { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
                  {
                    type: 'custom',
                    element: (
                      <Button onClick={HandlePublishAgain} disabled={loading}>
                        Terbitkan Kembali
                      </Button>
                    ),
                  },
                ]}
              />
            </form>
          </Form>
        </div>
      </DialogBasic>
    </>
  )
}
