import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { INotification } from '../data/types.ts'

interface props {
  data: INotification
}

const ButtonDeleteAcceptNotification = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/notifikasi/${data?.id_notifikasi}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['accept-notification'],
          })
          setLoading(false)
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-red-500 text-white rounded hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Hapus Asal Suret'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Unit</p>
          <p>{data?.nama_unit}</p>
          <p className="text-gray-500">Email</p>
          <p>{data?.email}</p>
          <p className="text-gray-500">Telepon</p>
          <p>{data?.no_telepon}</p>
          <p className="text-gray-500">ID Telegram</p>
          <p>{data?.id_telegram}</p>
          <p className="text-gray-500">Status</p>
          <p>{data?.status ? 'Aktif' : 'Tidak Aktif'}</p>
        </div>
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            {
              type: 'custom',
              element: (
                <>
                  <Button variant="destructive" onClick={HandleSave} disabled={loading}>
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

export default ButtonDeleteAcceptNotification
