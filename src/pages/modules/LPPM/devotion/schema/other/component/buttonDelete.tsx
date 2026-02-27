import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import AxiosClient from '@/provider/axios.tsx'
import type { IOtherFunding } from '../data/types'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

export const ButtonDeleteOtherFunding = (data: IOtherFunding) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/lppm/pendanaan-lainnya/${data?.id_pendanaan_lainnya}`)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['other-funding'],
          })
          setLoading(false)
          setOpen(false)
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
        className={'text-white p-1.5 rounded bg-red-500 hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        className={'rounded max-w-2xl'}
        description={'Apakah anda yakin ingin menghapus skema ini?'}
        title={<p className={'text-2xl text-red-500'}>Hapus Skema</p>}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Judul *</p>
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
                <Button
                  disabled={loading}
                  onClick={HandleDelete}
                  className={'bg-red-500 hover:bg-red-600 text-white'}
                >
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
