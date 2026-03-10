import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useQueryClient } from '@tanstack/react-query'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import { format } from 'date-fns'
import { IconCancel } from '@/components/common/icon'

export const ButtonDraftAgendaUnit = (data: IAgendaDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSubmission = async () => {
    setLoading(true)
    await AxiosClient.patch(`/pusat-karir/agenda/${data?.id_agenda}/status-publish`, {
      status_publish: 'DRAFT',
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Mengajukan data Pengumuman')
          queryClient.invalidateQueries({
            queryKey: ['agenda-carrier'],
          })
          queryClient.invalidateQueries({
            queryKey: ['agenda-carrier-status'],
          })
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
        className={'text-yellow-500 border-yellow-500 hover:text-yellow-500'}
      >
        <IconCancel />
        Kembali Ke Draft
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        isAuto
        className={'rounded lg:max-w-xl'}
        title={'Kembali Ke Draft'}
        description={'Apakah anda yakin untuk mengembalikan Agenda yang diajukan ke draft?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <div className={'text-center flex justify-center'}>
            <img src={data?.gambar} alt="image" className={'w-[160px] h-[215px] object-cover'} />
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
                      className={'bg-yellow-500 hover:bg-yellow-600'}
                      onClick={HandleSubmission}
                    >
                      <IconCancel color={'fill-white'} />
                      Kembalikan Ke Draft
                    </Button>
                  ),
                  onClick: () => setOpen(!open),
                },
              ]}
            />
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
