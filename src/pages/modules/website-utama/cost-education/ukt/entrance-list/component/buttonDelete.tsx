import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { IUktEntrance } from '@/pages/modules/website-utama/cost-education/ukt/entrance-list/data/types.ts'

interface props {
  data: IUktEntrance
}

export const ButtonDeleteEntranceUkt = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/jalur-masuk/${data?.id_jalur_masuk}`)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['entrance_ukt'],
          })
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
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
        className={'bg-red-500 p-1.5 text-white hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Hapus Jalur Masuk'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className="text-gray-500">Nama Jalur Masuk</p>
          <p>{data?.nama_jalur_masuk}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
        </div>
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal' },
            {
              type: 'custom',
              element: (
                <Button variant={'destructive'} onClick={handleSave} disabled={loading}>
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
