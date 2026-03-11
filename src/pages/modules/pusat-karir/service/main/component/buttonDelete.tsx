import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainService } from '../data/types.ts'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'

interface Props {
  data?: IMainService
}

export const ButtonDeleteService = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pusat-karir/layanan-utama/${data?.id_layanan}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['main-service'],
          })
          toast.success(res.data.message || 'Success menghapus data universitas')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal menghapus data universitas')
      })
  }

  return (
    <>
      <Button
        className={'border-red-500 text-red-500 hover:text-red-500'}
        variant={'outline'}
        disabled={loading}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </Button>

      <DialogBasic
        open={open}
        setOpen={setOpen}
        className={'rounded max-w-2xl'}
        title={'Hapus Layanan Utama?'}
        description={'Apakah Anda yakin ingin menghapus layanan utama ini?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <img src={data?.url_gambar} alt="gambar" className={'size-10 object-cover col-span-2'} />
          <p className="text-gray-500">Nama Layanan</p>
          <p>{data?.nama_layanan}</p>
          <p className="text-gray-500">Uraian Singkat</p>
          <p>{data?.uraian_singkat}</p>
          <p className="text-gray-500">URL</p>
          <p>{data?.url}</p>
          <p className="text-gray-500">Ururtan</p>
          <p>{data?.urutan}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(!open),
            },
            {
              type: 'custom',
              element: (
                <>
                  <Button variant={'destructive'} onClick={handleDelete} disabled={loading}>
                    <FaTrash />
                    Hapus
                  </Button>
                </>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
