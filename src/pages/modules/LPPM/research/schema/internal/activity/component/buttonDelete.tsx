import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import type { IActivityProgram } from '../data/types'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface props {
  data?: IActivityProgram
}

export const ButtonDeleteActivity = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/lppm/daftar-program-kegiatan/${data?.id_daftar_program_kegiatan}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['activity-program'],
          })
          toast.success(res.data.message || 'Success hapus data')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal hapus data')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-red-500 text-white hover:bg-red-600 p-1.5 rounded'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        className={'rounded max-w-2xl'}
        setOpen={setOpen}
        title={'Hapus Program Kegiatan'}
        description={'Apakah anda yakin ingin menghapus Program Kegiatan ini?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Judul*</p>
          <p>{data?.judul}</p>
          <p className="text-gray-500">Urutan*</p>
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
                <Button onClick={HandleDelete} disabled={loading} variant={'destructive'}>
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
