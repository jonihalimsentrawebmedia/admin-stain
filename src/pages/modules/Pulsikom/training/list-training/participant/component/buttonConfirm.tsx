import type { IParticipant } from '@/pages/modules/Pulsikom/training/list-training/participant/data'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface props {
  data: IParticipant
  is_icon: boolean
}

export const ButtonConfirm = (props: props) => {
  const { is_icon, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  console.log(form.watch('is_valid_pembayaran'))

  const queryClient = useQueryClient()
  const HandleCancel = async (value: any) => {
    setLoading(true)
    await AxiosClient.patch(
      `/pusilkom/training/${data?.id_training}/peserta/${data?.id_peserta}/konfirmasi`,
      {
        is_valid_pembayaran: value?.is_valid_pembayaran,
      }
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Cancelled')
          queryClient.invalidateQueries({
            queryKey: ['list-training-participant'],
          })
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || 'Error')
        setLoading(false)
      })
  }

  return (
    <>
      {is_icon ? (
        <button className={'text-white p-1.5 bg-green-700 rounded'} onClick={() => setOpen(true)}>
          <FaCheck className={'size-4'} />
        </button>
      ) : (
        <Button
          variant={'outline'}
          className={'border-green-700 text-green-700 hover:text-green-600'}
          onClick={() => setOpen(true)}
        >
          Konfrimasi Pendaftar
        </Button>
      )}

      <DialogBasic
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-4xl rounded'}
        title={<p className={'text-gray-800 text-xl font-semibold'}>Konfrimasi Pendaftar</p>}
        description={'Apakah anda yakin untuk mengkonfirmasi pendaftar berikut?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4 text-sm'}>
          <p className="text-gray-500">Nama Lengkap</p>
          <p>{data?.nama_lengkap}</p>
          <p className="text-gray-500">Email</p>
          <p>{data?.email}</p>
          <p className="text-gray-500">No. Handphone (WhatsApp)</p>
          <p>{data?.no_handphone}</p>
          <p className="text-gray-500">Institusi atau Perusahaan</p>
          <p>{data?.institusi}</p>
          <p className="text-gray-500">Asal Kampus</p>
          <p>{data?.asal_kampus}</p>
          <p className="text-gray-500">Jenjang Pendidikan</p>
          <p>{data?.jenjang_pendidikan}</p>
          <p className="text-gray-500">Paket Biaya</p>
          <p>
            {data?.nama_biaya_pendaftaran} -{' '}
            {data?.harga_biaya_pendaftaran
              ? new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(data?.harga_biaya_pendaftaran)
              : ''}
          </p>
          <p className="text-gray-500">Rekening Pembayaran</p>
          <p>
            {data?.nama_rekening_pembayaran}-{data?.no_rekening_pembayaran}-
            {data?.nama_rekening_pembayaran}
          </p>
          <p className="text-gray-500">Waktu Pembayaran</p>
          <p>{data?.tanggal_bayar ? format(data?.tanggal_bayar, 'dd-MM-yyyy, HH:mm:ss') : ''}</p>
          <p className="text-gray-500">Bukti Pembayaran</p>
          <img
            src={data.file_upload_pembayaran}
            alt="gambar"
            className={'object-contain h-[200px]'}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleCancel)} className={'flex flex-col gap-y-4'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className={'text-sm'}>Pembayaran sudah valid</p>
              <CheckboxInputBasic
                name={'is_valid_pembayaran'}
                form={form}
                label={'Ya, Bukti Pembayaran sudah valid dan sesuai'}
                isRequired
              />
            </div>
            <ButtonForm
              className={'bg-green-700!'}
              label={'Ya, Konfirmasi'}
              loading={loading}
              onCancel={() => setOpen(false)}
            />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
