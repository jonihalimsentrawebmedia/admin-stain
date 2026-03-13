import type { IPartnership } from '../data/types.tsx'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data?: IPartnership
}

export const ButtonDeletePartnership = (props: Props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pusat-karir/mitra-kerja/${data?.id_mitra_kerja}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['partnership'],
          })
          toast.success(res.data.message || 'Berhasil menghapus data')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal menghapus data')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-red-500 rounded text-white hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Hapus Mitra Kerja'}
        description={'Apakah anda yakin untuk menghapus data Mitra Kerja berikut?'}
        open={open}
        setOpen={setOpen}
      >
        <img
          src={data?.url_gambar ?? '/noimg.png'}
          alt="profile"
          className={'w-[100px] h-[150px] rounded'}
        />
        <div className={'grid grid-cols-2 gap-2'}>
          <p className="text-gray-500">Nama Lengkap</p>
          <p>{data?.nama_kontak}</p>
          <p className="text-gray-500">Nama Perusahaan</p>
          <p>{data?.nama_perusahaan}</p>
          <p className="text-gray-500">No. Handphone</p>
          <p>{data?.no_handphone}</p>
          <p className="text-gray-500">Email</p>
          <p>{data?.email}</p>
          <p className="text-gray-500">Status Email</p>
          <p>{data?.status ? 'Sudah Verifkasi' : 'Belum Verifkasi'}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
            {
              type: 'custom',
              element: (
                <Button variant={'destructive'} onClick={HandleDelete} disabled={loading}>
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
