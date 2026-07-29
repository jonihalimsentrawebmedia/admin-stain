import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import type { IProgramList } from '../data/types'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { format, subDays } from 'date-fns'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { id } from 'date-fns/locale'

interface Props {
  data?: IProgramList
}

export const ButtonPublish = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const isAllTrue = (obj: Record<string, boolean>): boolean => {
    return Object.values(obj).every(Boolean)
  }

  const isValidRange3Days = (startDate?: string | Date, endDate?: string | Date): boolean => {
    if (!startDate || !endDate) return false

    const start = new Date(startDate)
    const end = new Date(endDate)

    const diffTime = end.getTime() - start.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)

    return diffDays >= 3
  }

  const result = isAllTrue(data?.status_pengisian as any)

  const queryClient = useQueryClient()
  const HandlePublish = async (value: any) => {
    setLoading(true)
    const valid = isValidRange3Days(value.tgl_buka_pendaftaran, value.tgl_tutup_pendaftaran)
    if (!valid) {
      toast.warning(
        'Tanggal buka pendaftaran dan tanggal tutup pendaftaran harus lebih dari 3 hari.'
      )
    } else {
      await AxiosClient.patch(`/pusilkom/program/${data?.id_program}/publish`, {
        tgl_buka_pendaftaran: new Date(value.tgl_buka_pendaftaran).toISOString(),
        tgl_tutup_pendaftaran: new Date(value.tgl_tutup_pendaftaran).toISOString(),
      })
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            setOpen(false)
            toast.success(res.data.message || 'Success mengubah data')
            queryClient.invalidateQueries({
              queryKey: ['list-program'],
            })
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message || 'Terjadi kesalahan, silakan coba lagi.')
          setLoading(false)
        })
    }
  }

  return (
    <>
      <button
        disabled={!result}
        className={'bg-primary p-1.5 text-white rounded w-fit disabled:bg-muted'}
        onClick={() => setOpen(!open)}
      >
        <ArrowUp className={'size-4'} />
      </button>

      <DialogBasic
        open={open}
        setOpen={setOpen}
        title={'Buka Pendaftaran'}
        className={'rounded min-w-2xl'}
      >
        <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Pelatihan</p>
          <p>{data?.nama_program}</p>
          <p className="text-gray-500">Min. Pendaftar</p>
          <p>{data?.minimal_pendaftar}</p>
          <p className="text-gray-500">Max. Pendaftar</p>
          <p>{data?.is_tidak_ada_batas ? 'Tidak Ada Batas' : data?.maksimal_pendaftar}</p>
          <p className="text-gray-500">Tanggal</p>
          <p>
            {data?.tanggal_mulai_pelatihan
              ? format(data?.tanggal_mulai_pelatihan, 'dd MMMM yyyy', { locale: id })
              : ''}
          </p>
        </div>

        <hr />

        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandlePublish)}>
            <TextInput
              name={'tgl_buka_pendaftaran'}
              form={form}
              label={'Tanggal Buka Pendaftaran'}
              type={'date'}
              isRow
              isRequired
            />
            <TextInput
              name={'tgl_tutup_pendaftaran'}
              form={form}
              label={'Tanggal Tutup Pendaftaran'}
              type={'date'}
              isRow
              isRequired
            />
            <div className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-5">
              <div />
              <p className="text-sm text-blue-500">
                Maksimal{' '}
                {data?.tanggal_mulai_pelatihan
                  ? format(subDays(new Date(data?.tanggal_mulai_pelatihan), 3), 'dd MMMM yyyy', {
                      locale: id,
                    })
                  : ''}
              </p>
            </div>

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
