import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import type { IOfficial } from '../data/types'

interface Props {
  data: IOfficial
}

export const ButtonDeleteOfficial = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/spi/pimpinan/${data?.id_kelompok_pimpinan}/${data?.id_pimpinan}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['chief-official-spi'],
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
      <button
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
        onClick={() => setOpen(true)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Hapus Pejabat'}
        description={'Apakah anda yakin untuk menghapus data dibawah ini?'}
        open={open}
        setOpen={setOpen}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-3 sm:gap-5">
          <img
            src={data?.url_gambar}
            alt="image"
            className={'w-full sm:w-[150px] h-auto sm:h-[200px] object-cover rounded sm:col-span-2'}
          />
          <p className="text-gray-500">Nama Kelompok</p>
          <p>{data?.nama_kelompok_pimpinan}</p>
          <p className="text-gray-500">Nama Pejabat</p>
          <p>{data?.nama_penjabat}</p>
          <p className="text-gray-500">NIP</p>
          <p>{data?.nip}</p>
          <p className="text-gray-500">Jabatan</p>
          <p>{data?.jabatan}</p>
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
