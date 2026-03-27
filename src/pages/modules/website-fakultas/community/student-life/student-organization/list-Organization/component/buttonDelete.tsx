import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import type { IListStudentOrganization } from '../data/types'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

interface Props {
  data: IListStudentOrganization
}

export const ButtonDeleteStudentOrganization = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/fakultas/daftar-organisasi-mahasiswa/${data?.id_daftar_organisasi_mahasiswa}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['student-organization'],
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
          <p className="text-gray-500">Nama Organisasi Mahasiswa</p>
          <p>{data?.nama}</p>
          <p className="text-gray-500">Tentang</p>
          <RenderHTMLContent className={'line-clamp-3'} content={data?.tentang} />
          <p className="text-gray-500">Sekretariat</p>
          <RenderHTMLContent content={data?.seketariat} />
          <p className="text-gray-500">Kegiatan</p>
          <RenderHTMLContent content={data?.kegiatan} />
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
