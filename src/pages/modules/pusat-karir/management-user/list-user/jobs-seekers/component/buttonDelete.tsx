import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { IShortJobSeeker } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/data/types.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { format } from 'date-fns'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data: IShortJobSeeker
}

export const ButtonDeleteJobSeeker = (props: Props) => {
  const { data } = props

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`pusat-karir/pencari-kerja/${data.id_pencari_kerja}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['jobs-seekers'],
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
        title={'Hapus User'}
        description={'Apakah anda yakin untuk menghapus data user berikut?'}
        open={open}
        setOpen={setOpen}
      >
        <img
          src={data?.url_profile ?? '/noimg.png'}
          alt="profile"
          className={'w-[100px] h-[150px] rounded'}
        />
        <div className={'grid grid-cols-2 gap-2'}>
          <p className="text-gray-500">Nama Lengkap</p>
          <p>{data?.nama_lengkap}</p>
          <p className="text-gray-500">TTL</p>
          <p>
            {data?.tempat_lahir},{' '}
            {data?.tanggal_lahir ? format(data?.tanggal_lahir, 'dd-MM-yyyy') : '-'}
          </p>
          <p className="text-gray-500">Jenis Kelamin</p>
          <p>{data?.jenis_kelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}</p>
          <p className="text-gray-500">No. Handphone</p>
          <p>{data?.no_handphone}</p>
          <p className="text-gray-500">Email</p>
          <p>{data?.email}</p>
          <p className="text-gray-500">Status</p>
          <p>{data?.status ? 'Aktif' : 'Tiddak Aktif'}</p>
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
