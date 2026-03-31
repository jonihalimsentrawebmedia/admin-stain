import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import type { IRegisterPricing } from '../../data/types'

interface Props {
  data: IRegisterPricing
}

export const ButtonDeleteRegisterPricing = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const id = window.localStorage.getItem('id_training')

  const queryClient = useQueryClient()
  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/pusilkom/training/${id}/biaya-pendaftaran/${data?.id_biaya_pendaftaran}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['register-pricing'],
          })
          toast.success(res.data.message || 'Success menghapus data')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-red-500 text-red-500 hover:text-red-600'}
        onClick={() => setOpen(true)}
      >
        <FaTrash /> Hapus
      </Button>

      <DialogBasic
        title={'Hapus Layanan'}
        description={'Apakah anda yakin untuk menghapus data dibawah ini?'}
        open={open}
        setOpen={setOpen}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Judul</p>
          <p>{data?.nama_biaya}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
          <p className="text-gray-500">Biaya</p>
          <p>
            {data?.harga
              ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                  data?.harga
                )
              : ''}
          </p>
          <p className="text-gray-500">Keuntungan</p>
          <p>{data?.keuntungan}</p>
        </div>

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
              element: (
                <Button variant={'destructive'} onClick={handleDelete} disabled={loading}>
                  <FaTrash />
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
