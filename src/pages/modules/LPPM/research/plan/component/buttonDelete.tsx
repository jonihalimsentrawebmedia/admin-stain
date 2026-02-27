import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IPLanResearchCategory } from '../data/types'
import { FaTrash } from 'react-icons/fa'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface props {
  data?: IPLanResearchCategory
}

export const ButtonDeletePlanning = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleAddPlanning = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/lppm/rencana-induk-penelitian-kategori/${data?.id_rencana_induk_penelitian_kategori}`
    )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success tambah kategori')
          queryClient.invalidateQueries({
            queryKey: ['research-plan'],
          })
          setLoading(false)
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal tambah kategori')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'text-white p-1.5 rounded bg-red-500 hover:bg-red-600'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        description={'Apakah anda yakin untuk menghapus kategori berikut?'}
        title={<p className={'text-2xl text-red-500'}>Hapus Kategori</p>}
        className={'rounded max-w-2xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Kelompok</p>
          <p>{data?.nama_kategori}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
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
              label: 'Hapus',
              element: (
                <Button
                  onClick={HandleAddPlanning}
                  disabled={loading}
                  className={'bg-red-500 hover:bg-red-600 text-white'}
                >
                  <FaTrash />
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogCustom>
    </>
  )
}
