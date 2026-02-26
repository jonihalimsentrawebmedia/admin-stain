import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IGroupStaff } from '@/pages/modules/LPPM/about/staff/hooks/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

export const ButtonDeleteStaffLPPM = (data?: IGroupStaff) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const HandleAddStaff = async () => {
    await AxiosClient.delete(`/lppm/staff/${data?.id_staff}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success tambah kelompok')
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['about-staff'],
          })
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal tambah kelompok')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'text-white p-1.5 rounded bg-red-500 hover:bg-red-600'}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Hapus Kelompok Staff'}
        description={'Apakah anda yakin untuk menghapus kelompok staff berikut?'}
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Kelompok</p>
          <p>{data?.nama_kelompok}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(false),
            },
            {
              type: 'custom',
              label: 'Hapus',
              element: (
                <Button
                  onClick={HandleAddStaff}
                  disabled={loading}
                  className={'bg-red-500 hover:bg-red-600 text-white'}
                >
                  <FaTrash />
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
