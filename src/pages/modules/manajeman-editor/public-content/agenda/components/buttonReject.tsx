import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { MdCancel } from 'react-icons/md'
import { Textarea } from '@/components/ui/textarea'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import { format } from 'date-fns'

export const ButtonRejectAgendaManagementEditor = (data: IAgendaDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')
  const queryClient = useQueryClient()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/agenda/${data?.id_agenda}/status-publish`, {
      status_publish: 'TOLAK_EDITOR',
      alasan_ditolak: reason == '' ? undefined : reason,
    })
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['agenda-management-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['agenda-management-editor-status'],
          })
          toast.success(res.data.message || 'Success Mengajukan data berita')
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
        title={'Tolak Penguguman'}
        description={'Apakah anda yakin untuk menolak penguguman yang dipilih?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <div className={'text-center flex justify-center'}>
            <img src={data?.gambar} alt="image" className={'w-40 h-[215px] object-cover'} />
          </div>
          <p className="text-gray-500">Nama Kegiatan</p>
          <p>{data?.judul}</p>
          <p className="text-gray-500">Lokasi Kegiatan</p>
          <p>{data?.lokasi_kegiatan}</p>
          <p className="text-gray-500">Waktu Kegiatan</p>
          <div className="flex gap-1.5">
            <p>
              {data?.waktu_mulai
                ? format(new Date(data?.waktu_mulai), 'dd-MM-yyyy, HH:mm:ss')
                : '-'}
            </p>
            {data?.waktu_selesai && (
              <>
                <p className="text-gray-500">s/d</p>
                <p>
                  {data?.waktu_selesai
                    ? format(new Date(data?.waktu_selesai), 'dd-MM-yyyy, HH:mm:ss')
                    : '-'}
                </p>
              </>
            )}
          </div>
          <p className="text-gray-500">Penulis</p>
          <p>{data?.penulis}</p>

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
