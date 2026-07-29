import { BiX } from 'react-icons/bi'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import type { IProgramList } from '../data/types'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { format } from 'date-fns'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'

interface Props {
  data: IProgramList
}

export const ButtonCloseProgram = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()
  const HandleClose = async (value: any) => {
    setLoading(true)
    await AxiosClient.patch(`/pusilkom/program/${data?.id_program}/close-registration`, value)
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
        setLoading(false)
        toast.error(err.response.data.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 p-1.5 text-white rounded hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <BiX className={'size-4'} />
      </button>

      <DialogBasic title={'Tutup Pendaftaran'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Pelatihan</p>
          <p>{data?.nama_program}</p>
          <p className="text-gray-500">Tanggal Terbit</p>
          <p>{data?.terbit_at ? format(data?.terbit_at, 'dd-MM-yyyy, HH:mm:ss') : ''}</p>
          <p className="text-gray-500">Periode Pendaftaran</p>
          <p>
            {data?.tgl_buka_pendaftaran ? format(data?.tgl_buka_pendaftaran, 'dd-MM-yyyy') : ''}
            s.d
            {data?.tgl_tutup_pendaftaran ? format(data?.tgl_tutup_pendaftaran, 'dd-MM-yyyy') : ''}
          </p>

          <p className="col-span-1 sm:col-span-2 font-semibold text-primary">Pendaftar</p>
          <p className="text-gray-500">Minimal</p>
          <p>{data?.minimal_pendaftar}</p>
          <p className="text-gray-500">Maksimal</p>
          <p>{data?.is_tidak_ada_batas ? 'Tidak Ada Batas' : data?.maksimal_pendaftar}</p>
          <p className="text-gray-500">Pending</p>
          <p>{data?.pending}</p>
          <p className="text-gray-500">Terkonfirmasi</p>
          <p>{data?.terkonfirmasi}</p>
        </div>

        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleClose)}>
            <InputRadio
              form={form}
              name={'alasan_tutup'}
              label={'Pilih Alasan Tutup'}
              className={'items-start'}
              isRow
              data={[
                {
                  value: 'kouto_penuh',
                  label: 'Kouto Penuh',
                },
                {
                  value: 'melewati_batas_pendaftaran',
                  label: 'Melewati Batas Pendaftaran',
                },
                {
                  value: 'dibatalkan',
                  label: 'Dibatalkan',
                },
              ]}
            />
            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                {
                  type: 'cancel',
                  label: 'Batal',
                  onClick: () => setOpen(false),
                },
                {
                  type: 'custom',
                  element: <Button disabled={loading}>Tutup Pendaftaran</Button>,
                },
              ]}
            />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
