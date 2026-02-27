import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import type { IUserManagement } from '@/pages/modules/LPPM/publication-hki/book/book-center/manangement/data/types.ts'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

type Context = 'pusat-buku-dan-media-masa' | 'pusat-plp' | 'pusat-ppjs' | 'pusat-hki'

interface Props {
  data: IUserManagement
  context: Context
}

export const ButtonDeleteUserManagement = (props: Props) => {
  const { data, context } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/lppm/pusat-publikasi-anggota/${context}/${data.id_anggota}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message)
          queryClient.invalidateQueries({
            queryKey: ['user-management'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal menghapus data')
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 hover:bg-red-600 text-white rounded p-1.5'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        className={'rounded max-w-2xl'}
        title={'Hapus Pengelola?'}
        description={'Apakah anda yakin untuk menghapus pengelola berikut?'}
      >
        <img src={data?.url_gambar} className={'w-[120px] h-[160px] object-cover'} />
        <div className={'grid grid-cols-[12rem_1fr] gap-x-3'}>
          <p className="text-gray-500">Nama</p>
          <p>{data?.nama}</p>
          <p className="text-gray-500">NIP</p>
          <p>{data?.nip}</p>
          <p className="text-gray-500">NIDN</p>
          <p>{data?.nidn}</p>
          <p className="text-gray-500">Pangkat</p>
          <p>{data?.pangkat}</p>
          <p className="text-gray-500">Golongan</p>
          <p>{data?.golongan}</p>
          <p className="text-gray-500">Jabatan</p>
          <p>{data?.jabatan}</p>
          <p className="text-gray-500">Email</p>
          <p>{data?.email}</p>
          <p className="text-gray-500">Publikasi</p>
          <p>{data?.publikasi.split(',').join(' | ')}</p>
          <p className="text-gray-500">Status</p>
          <p>{data?.status ? 'Aktif' : 'Tidak Aktif'}</p>
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
                <Button variant={'destructive'} onClick={HandleDelete} disabled={loading}>
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
