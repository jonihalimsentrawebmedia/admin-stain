import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { MdCancel } from 'react-icons/md'
import { Textarea } from '@/components/ui/textarea'
import type { IFacilitiesDetail } from '../data'

export const ButtonRejectManagementEditor = (data: IFacilitiesDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')
  const queryClient = useQueryClient()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/fasilitas/${data?.id_fasilitas}/status-publish`, {
      status_publish: 'TOLAK_EDITOR',
      alasan_ditolak: reason == '' ? undefined : reason,
    })
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-facilities-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-facilities-editor'],
          })
          toast.success(res.data.message || 'Success Mengajukan data inovasi')
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
        title={'Tolak Fasilitas'}
        description={'Apakah anda yakin untuk menyetujui fasilitas?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <div className="flex items-center justify-center">
            <img src={data?.gambar} alt="image" className={'w-[320px] h-60 object-cover'} />
          </div>
          <p className="text-gray-500">Nama Fasilitas</p>
          <p>{data?.nama_fasilitas}</p>
          <p className="text-gray-500">Alamat</p>
          <p>{data?.alamat}</p>
          <p className="text-gray-500">No. Hp</p>
          <p>{data?.no_hp_pembantu}</p>
          <p className="text-gray-500">Email</p>
          <p>{data?.email_pembantu}</p>
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
