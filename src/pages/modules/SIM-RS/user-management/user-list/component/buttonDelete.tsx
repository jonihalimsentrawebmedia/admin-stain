import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IUserList } from '../data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: IUserList
}

export const ButtonDeleteUser = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/simrs/manajemen-user/user/${data?.id_user}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menghapus user')
          queryClient.invalidateQueries({ queryKey: ['user-list'] })
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
        title={'Hapus User'}
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid gap-5 grid-cols-[12rem_1fr]'}>
          <p className="text-gray-500">Nama</p>
          <p>{data.nama}</p>
          <p className="text-gray-500">Email</p>
          <p>{data.email}</p>
          <p className="text-gray-500">No. Telepon</p>
          <p>{data.nomor_telepon}</p>
          <p className="text-gray-500">Role</p>
          <p>{data.nama_role}</p>
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
                <button
                  disabled={loading}
                  onClick={HandleSave}
                  className={
                    'bg-red-500 flex items-center gap-1.5 px-3 text-white hover:bg-red-600 p-1.5 rounded'
                  }
                >
                  <FaTrash />
                  Hapus
                </button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
