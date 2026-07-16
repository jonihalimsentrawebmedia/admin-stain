import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IRole } from '../data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: IRole
}

export const ButtonDeleteRole = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/simrs/manajemen-user/role/${data?.id_role}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menghapus role')
          queryClient.invalidateQueries({ queryKey: ['role'] })
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal menghapus data')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={'bg-red-500 text-white hover:bg-red-600 p-1.5 rounded'}
      >
        <FaTrash />
      </button>

      <DialogBasic
        className={'lg:min-w-xl rounded'}
        title={'Hapus Role'}
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid gap-5 grid-cols-[12rem_1fr]'}>
          <p className="text-gray-500">Kode Role</p>
          <p>{data.kode_role}</p>
          <p className="text-gray-500">Nama Role</p>
          <p>{data.nama_role}</p>
          <p className="text-gray-500">Hak Akses</p>
          <div className="flex flex-wrap gap-1">
            {data.hak_akses.map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(!open),
            },
            {
              type: 'custom',
              element: (
                <>
                  <button
                    disabled={loading}
                    onClick={HandleSave}
                    className={'bg-red-500 flex items-center gap-1.5 px-3 text-white hover:bg-red-600 p-1.5 rounded'}
                  >
                    <FaTrash />
                    Hapus
                  </button>
                </>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
