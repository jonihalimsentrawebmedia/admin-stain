import { useState } from 'react'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/data/types.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props {
  rootData: IUnitTeamGroup
  data: IDivisionTeam
}

export const ButtonDeleteDivisionTeam = (props: Props) => {
  const { rootData, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()
  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `unit/profil/tim-pejabat/${data?.id_unit_tim}/pejabat/${data?.id_unit_tim_pejabat}`
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['division-team'],
          })
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Menambahkan Data Tim')
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
        title={<p className={'text-2xl text-red-500'}>Hapus Divisi</p>}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Unit</p>
          <p>{session?.nama_unit}</p>
          <p className="text-gray-500">Divisi</p>
          <p>{rootData?.nama_divisi}</p>
          <p className="text-gray-500">Nama Lengkap</p>
          <p>{data?.nama}</p>
          <p className="text-gray-500">Jabatan</p>
          <p>{data?.jabatan}</p>
          <p className="text-gray-500">Kepala UNit</p>
          <p>{data?.is_kepala_unit ? 'Ya' : 'Tidak'}</p>

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
