import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { IYearPublication } from '../data/types.ts'

interface props {
  data: IYearPublication
}

const ButtonDeletePublication = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/tahun-publikasi/${data?.id_tahun_publikasi}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          queryClient.invalidateQueries({
            queryKey: ['publication-year'],
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

      <DialogBasic title={'Hapus UKK UKM'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-2 gap-5'}>
          <p className="text-gray-500">Tahun Publikasi</p>
          <p>{data?.nama_tahun_publikasi}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
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
                <Button variant={'destructive'} disabled={loading} onClick={HandleSave}>
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

export default ButtonDeletePublication
