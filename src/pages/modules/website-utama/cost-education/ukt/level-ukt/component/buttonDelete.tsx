import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ILevelUkt } from '@/pages/modules/website-utama/cost-education/ukt/level-ukt/data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface props {
  data: ILevelUkt
}

export const ButtonDeleteLevelUkt = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/tingkatan-ukt/${data?.id_tingkatan_ukt}`)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['level_ukt'],
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
        title={'Hapus Tingkat UKT'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className="text-gray-500">Jenjang</p>
          <p>{data?.nama_jenjang_pendidikan}</p>
          <p className="text-gray-500">Nama Tingkat</p>
          <p>{data?.nama_tingkatan_ukt}</p>
          <p className="text-gray-500">Jenjang</p>
          <p>
            {data?.jumlah_bawaan_ukt
              ? new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }).format(data?.jumlah_bawaan_ukt)
              : ''}
          </p>
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
