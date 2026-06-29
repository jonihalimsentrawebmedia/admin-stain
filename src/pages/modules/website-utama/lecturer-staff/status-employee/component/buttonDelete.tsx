import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/types.ts'
import { FaTrash } from 'react-icons/fa'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data: IStatusEmployee
}

const ButtonDeleteEmployeeStatus = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm-status/${data?.id_status_sdm}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['status-employee'],
          })
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
        className={'bg-red-500 p-1.5 text-white hover:bg-red-600 rounded'}
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Hapus Status Karyawan'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-2 gap-5'}>
          <p className="text-gray-500">Kode</p>
          <p>{data?.kode_status}</p>
          <p className="text-gray-500">Nama Status</p>
          <p>{data?.nama_status}</p>
          <p className="text-gray-500">Ada NIDN</p>
          <p>{data?.is_ada_nidn ? 'Ada' : 'TIdak Ada'}</p>
          <p className="text-gray-500">Jenis Status</p>
          <p>{data?.is_dosen ? 'Dosen' : 'Staff'}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            {
              type: 'custom',
              element: (
                <Button disabled={loading} onClick={HandleSave} variant={'destructive'}>
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

export default ButtonDeleteEmployeeStatus
