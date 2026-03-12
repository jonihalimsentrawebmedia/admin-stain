import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ICategoryIndustry } from '../data/type'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data?: ICategoryIndustry
}

export const ButtonDeleteIndustryCategory = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pusat-karir/kategori-industri/${data?.id_kategori_industri}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['industry-category'],
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
        className={'p-1.5 rounded text-white bg-red-500 hover:bg-red-600'}
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Tambah Kategori Industri'} open={open} setOpen={setOpen}>
        <div className={'grid gap-5 grid-cols-[12rem_1fr]'}>
          <p className="text-gray-500">Nama Kategori Industri</p>
          <p>{data?.nama_kategori_industri}</p>
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
