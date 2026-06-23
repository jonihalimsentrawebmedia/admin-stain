import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { IPurposeGuest } from '../data/types'

interface props {
  data: IPurposeGuest
}

const ButtonDeletePurposeGuest = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/tujuan-bertamu/${data.id_tujuan_bertamu}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['purpose-guest'],
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

      <DialogBasic title={'Hapus Tujuan Bertamu'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Tujuan Bertamu</p>
          <p>{data?.tujuan_bertamu}</p>
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

export default ButtonDeletePurposeGuest
