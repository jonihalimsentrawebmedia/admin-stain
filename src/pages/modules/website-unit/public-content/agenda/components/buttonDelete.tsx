import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import { format } from 'date-fns'

export const ButtonDeleteAgendaUnit = (data: IAgendaDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/agenda/${data?.id_agenda}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Agenda')
          queryClient.invalidateQueries({
            queryKey: ['agenda-unit'],
          })
          queryClient.invalidateQueries({
            queryKey: ['agenda-unit-status'],
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Hapus Agenda?'}
        description={'Apakah anda yakin untuk menghapus Agenda yang ditulis?'}
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
                    <Button disabled={loading} variant={'destructive'} onClick={HandlerDelete}>
                      <FaTrash />
                      Hapus
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
