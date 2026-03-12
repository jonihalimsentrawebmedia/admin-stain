import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ICompanySize } from '../data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: ICompanySize
}

export const ButtonDeleteCompanySize = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pusat-karir/ukuran-perusahaan/${data?.id_ukuran_perusahaan}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['company-size'],
          })
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
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
        className={'lg:min-w-2xl rounded'}
        title={'Tambah Ukuran Perusahaan'}
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid gap-5 grid-cols-[12rem_1fr]'}>
          <p className="text-gray-500"> Jlh Karyawan (Paling Sedikit)</p>
          <p>{data.jumlah_terendah}</p>
          <p className="text-gray-500"> Jlh Karyawan (Paling Banyak)</p>
          <p>{data.jumlah_teratas}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data.urutan}</p>
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
