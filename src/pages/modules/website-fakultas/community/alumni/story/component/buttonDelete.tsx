import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import type { IStoryAlumni } from '../data/types'

interface Props {
  data: IStoryAlumni
}

export const ButtonDeleteStoryAlumni = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/fakultas/cerita-alumni/${data?.id_cerita_alumni}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['story-alumni'],
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
        title={'Hapus Cerita Alumni'}
        description={'Apakah anda yakin untuk menghapus data dibawah ini?'}
        open={open}
        setOpen={setOpen}
      >
        <div className="grid grid-cols-[12rem_1fr]">
          <p className="text-gray-500">Nama Alumni</p>
          <p>{data?.nama_lengkap}</p>
          <p className="text-gray-500">Program Studi</p>
          <p>{data?.nama_prodi}</p>
          <p className="text-gray-500">Tahun Lulus</p>
          <p>{data?.tahun_masuk}</p>
          <p className="text-gray-500">Nama Alumni</p>
          <RenderHTMLContent content={data?.cerita ?? ''} />
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
