import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { IconCancel } from '@/components/common/icon'
import type { IUnitFacilities } from '../data'

export const ButtonDraftFacilities = (data: IUnitFacilities) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/unit-fasilitas/${data?.id_unit_fasilitas}/status-publish`, {
      status_publish: 'DRAFT',
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-unit-facilities-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-unit-facilities-editor'],
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
        className={'text-yellow-600 border-yellow-600 hover:text-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <IconCancel />
        Kembali Ke Draft
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Kembali Ke Draft'}
        description={'Apakah anda yakin untuk mengembalikan Fasilitas Unit yang diajukan ke draft?'}
      >
        <div className="flex items-center justify-center">
          <img src={data?.gambar} alt="image" className={'w-[320px] h-60 object-cover'} />
        </div>
        <p className="text-gray-500">Nama Fasilitas</p>
        <p>{data?.nama_fasilitas}</p>

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
            className={'bg-yellow-600 hover:bg-yellow-700 text-white'}
          >
            <IconCancel />
            Kembalikan Ke Draft
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}
