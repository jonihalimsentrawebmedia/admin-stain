import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IAchievementCategory } from '@/pages/modules/website-unit/profile/achievement/data/types.tsx'
import type { IReward } from '@/pages/modules/website-unit/profile/achievement/reward/data/types.ts'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'

interface Props {
  rootData?: IAchievementCategory
  data?: IReward
}

export const ButtonDeleteReward = (props: Props) => {
  const { rootData, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/unit/profil/unit-kategori-penghargaan-penghargaan/${rootData?.id_kategori_penghargaan}/penghargaan/${data?.id_penghargaan}`
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['reward'],
          })
          toast.success(res.data.message || 'Success Menghapus Data Penghargaan')
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
        onClick={() => setOpen(!open)}
        className={'p-1.5 bg-red-500 hover:bg-red-600 text-white'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Penghargaan'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Pilih Unit</p>
          <p>{session?.nama_unit}</p>
          <p className="text-gray-500">Kategori</p>
          <p>{rootData?.nama_kategori}</p>
          <p className="text-gray-500">Keterangan</p>
          <p>{data?.keterangan}</p>

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
