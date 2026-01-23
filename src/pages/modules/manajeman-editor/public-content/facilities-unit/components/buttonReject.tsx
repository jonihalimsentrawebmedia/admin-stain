import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { MdCancel } from 'react-icons/md'
import { Textarea } from '@/components/ui/textarea'
import type { IUnitFacilities } from '../data'

export const ButtonRejectManagementEditor = (data: IUnitFacilities) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')
  const queryClient = useQueryClient()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/unit-fasilitas/${data?.id_unit_fasilitas}/status-publish`, {
      status_publish: 'TOLAK_EDITOR',
      alasan_ditolak: reason == '' ? undefined : reason,
    })
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-unit-facilities-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-unit-facilities-editor'],
          })
          toast.success(res.data.message || 'Success Mengajukan data Fasilitas Unit')
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        size={'sm'}
        variant={'outline'}
        className={'border-red-500 text-red-500 hover:text-red-600'}
      >
        <MdCancel />
        Tolak
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Tolak Fasilitas Unit'}
        description={'Apakah anda yakin untuk menyetujui fasilitas unit?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <div className="flex items-center justify-center">
            <img src={data?.gambar} alt="image" className={'w-[320px] h-60 object-cover'} />
          </div>
          <p className="text-gray-500">Nama Fasilitas</p>
          <p>{data?.nama_fasilitas}</p>
        
        
          <div>
            <p>Alasan Ditolak</p>
            <Textarea
              placeholder="Alasan Ditolak"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
              }}
            />
          </div>

          <div className="flex items-center justify-end">
            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
                {
                  type: 'add',
                  label: '',
                  element: (
                    <Button
                      disabled={loading}
                      className={'bg-red-500 hover:bg-red-600'}
                      onClick={HandleApprove}
                    >
                      <MdCancel />
                      Tolak
                    </Button>
                  ),
                  onClick: () => {},
                },
              ]}
            />
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
