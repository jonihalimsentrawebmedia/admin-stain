import { useState } from 'react'
import type { IFacilitiesDetail } from '@/pages/modules/website-utama/public-content/facilities/data'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { MdSend } from 'react-icons/md'

export const ButtonSubmissionFacilities = (data: IFacilitiesDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.patch(`/website-utama/fasilitas/${data?.id_fasilitas}/status-publish`, {
      status_publish: 'DIAJUKAN_EDITOR',
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-facilities'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-facilities'],
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
        variant={'outline'}
        className={'text-blue-600 border-blue-600 hover:text-blue-600'}
        onClick={() => setOpen(!open)}
      >
        <MdSend />
        Ajukan ke Editor
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-2xl text-blue-600'}>Ajukan ke Editor</p>}
        description={'Apakah anda yakin untuk mengajukan Fasilitas yang ditulis ke editor?'}
      >
        <div className="flex items-center justify-center">
          <img src={data?.gambar} alt="image" className={'w-[320px] h-[240px] object-cover'} />
        </div>
        <p className="text-gray-500">Nama Fasilitas</p>
        <p>{data?.nama_fasilitas}</p>
        <p className="text-gray-500">Alamat</p>
        <p>{data?.alamat}</p>
        <p className="text-gray-500">No. Hp</p>
        <p>{data?.no_hp_pembantu}</p>
        <p className="text-gray-500">Email</p>
        <p>{data?.email_pembantu}</p>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant={'outline'}
            onClick={() => setOpen(!open)}
            className={'border border-primary text-primary hover:text-primary'}
          >
            <BiX />
            Batal
          </Button>
          <Button
            disabled={loading}
            onClick={HandlerDelete}
            className={'bg-blue-600 hover:bg-blue-700 text-white'}
          >
            <MdSend />
            Ajukan
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}
