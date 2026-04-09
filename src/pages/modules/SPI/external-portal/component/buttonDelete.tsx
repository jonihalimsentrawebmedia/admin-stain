import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IExternalPortal } from '../data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: IExternalPortal
}

export const ButtonDeletePortal = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/spi/portal-eksternal/${data?.id_portal_eksternal}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['external-portal'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Tambah Portal Eksternal'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-3xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Gambar</p>
          <img
            src={data?.url_gambar}
            alt="gambar"
            className={'w-[200px] h-[100px] object-contain'}
          />
          <p className="text-gray-500">URL</p>
          <p>{data?.url}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
            {
              type: 'custom',
              element: (
                <Button variant={'destructive'} onClick={HandleSave} disabled={loading}>
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
