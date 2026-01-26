import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import type { IFloorPlan } from '@/pages/modules/website-unit/floor-plan/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props {
  session?: ISessionUnit
  data?: IFloorPlan
}

export const ButtonDeleteFloorPlan = (props: Props) => {
  const { session, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/denah-lantai/${data?.id_unit_denah_lantai}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['floor-plan'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Denah Lantai')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'hover:bg-red-600 text-white p-1.5 bg-red-500'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        disableOutsideDialog
        className={'rounded lg:max-w-4xl'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500 text-2xl'}>Hapus Denah</p>}
        description={'Apakah anda yakin ingin menghapus denah ini?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className="text-gray-500">Pilih Unit</p>
          <p>{session?.nama_unit}</p>
          <p className="text-gray-500"></p>
          <img
            src={data?.denah_lantai_url}
            alt="denah lantai"
            className={'object-contain w-[360px] h-[475px]'}
          />
          <p className="text-gray-500">Nama Lantai</p>
          <p>{data?.nama_lantai}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
          <div className="col-span-2 flex items-center justify-end gap-2">
            <Button variant={'outline'} className={'border-primary'} onClick={() => setOpen(false)}>
              <BiX />
              Batal
            </Button>
            <Button disabled={loading} variant={'destructive'} onClick={HandleSave}>
              <FaTrash />
              Hapus
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
