import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IMemberStaff } from '@/pages/modules/LPPM/about/staff/member/hooks/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data: IMemberStaff
}

export const ButtonDeleteMemberStaff = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleDeleteMember = async () => {
    setLoading(true)
    await AxiosClient.delete(`lppm/staff-anggota/${data?.id_staff_anggota}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success hapus anggota staff')
          queryClient.invalidateQueries({
            queryKey: ['member-staff'],
          })
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal hapus anggota staff')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        disabled={loading}
        className={'text-white p-1.5 rounded bg-red-500 hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        className={'rounded max-w-2xl'}
        setOpen={setOpen}
        description={'Apakah anda yakin untuk menghapus anggota staff berikut?'}
        title={<p className={'text-2xl text-red-500'}>Hapus Anggota Staff</p>}
      >
        <div>
          <img src={data?.url_gambar} className={'w-[120px] h-[160px] object-cover'} />
          <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
            <p className="text-gray-500">Nama Kelompok*</p>
            <p>{data?.nama_staff}</p>
            <p className="text-gray-500">Nama*</p>
            <p>{data?.nama_anggota}</p>
            <p className="text-gray-500">Nip*</p>
            <p>{data?.nip}</p>
            <p className="text-gray-500">Jabatan*</p>
            <p>{data?.jabatan}</p>
            <p className="text-gray-500">Status*</p>
            <p>{data?.status ? 'Aktif' : 'Tidak Aktif'}</p>
          </div>

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
              {
                type: 'custom',
                element: (
                  <Button onClick={HandleDeleteMember} disabled={loading}>
                    <FaTrash />
                    Hapus
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </DialogCustom>
    </>
  )
}
