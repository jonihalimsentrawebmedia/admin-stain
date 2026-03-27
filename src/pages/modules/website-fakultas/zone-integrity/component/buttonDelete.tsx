import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import type { IZoneIntegrity } from '../data/types'

interface Props {
  data: IZoneIntegrity
}

export const ButtonDeleteZoneIntegrity = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/fakultas/zona-integritas-kategori/${data?.id_zona_integritas_kategori}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['zone-integrity'],
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
        title={'Hapus Kateogri Zona Integritas'}
        description={'Apakah anda yakin untuk menghapus Kateogri Zona Integritas dibawah ini?'}
        open={open}
        setOpen={setOpen}
      >
        <div className="grid grid-cols-[12rem_1fr]">
          <p className="text-gray-500">Nama Kategori</p>
          <p>{data?.nama_kategori}</p>
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
