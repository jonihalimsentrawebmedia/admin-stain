import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import type { IHistoryUnit } from '@/pages/modules/website-unit/profile/history/data/types.ts'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data?: IHistoryUnit
}

export const ButtonDeleteHistory = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/profil/sejarah/${data?.id_unit_sejarah}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['history-unit'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Sejarah')
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
        className={'p-1.5 bg-red-500 hover:bg-red-600 text-white'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={'Hapus Sejarah'}
        description={'Apakah anda yakin ingin menghapus data ini?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <div className="col-span-2">
            <img
              src={data?.gambar_url}
              alt="gambar"
              className="w-full max-w-[250px] h-[12rem] object-cover rounded-lg"
            />
          </div>
          <p className="text-gray-500">Pilihan Unit</p>
          <p>{session?.nama_unit}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
          <p className="text-gray-500">Tahun</p>
          <p>{data?.tahun}</p>
          <p className="text-gray-500">Isi / Uraian</p>
          <p>{data?.isi_sejarah}</p>

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
