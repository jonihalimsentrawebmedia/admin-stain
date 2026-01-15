import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'

import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ButtonAggreManagementEditor = (data: IAgendaDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/agenda/${data?.id_agenda}/status-publish`, {
      status_publish: 'DISETUJUI_EDITOR',
    })
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['agenda-management-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['agenda-management-editor-status'],
          })
          toast.success(res.data.message || 'Success Mengajukan data pengumuman')
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
        className={'border-green-500 text-green-500 hover:text-green-600'}
      >
        <Check />
        Setujui
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Setujui Agenda'}
        description={'Apakah anda yakin untuk menyetujui agenda?'}
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
                      className={'border-green-500 text-white hover:text-white'}
                      onClick={HandleApprove}
                    >
                      <Check />
                      Setujui
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

export default ButtonAggreManagementEditor
