import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import type { EntranceUkt } from '@/pages/modules/website-utama/cost-education/detail-ukt/data/types.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface Props {
  data: EntranceUkt
  nama_prodi: string
  nama_fakultas: string
}

export const ButtonDeleteUTKEntrance = (props: Props) => {
  const { data, nama_prodi, nama_fakultas } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/website-utama/biaya-pendidikan-ukt/jalur-masuk/${data?.id_ukt_jalur_masuk}`
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          queryClient.invalidateQueries({
            queryKey: ['list_price_ukt'],
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
      <Button variant={'destructive'} onClick={() => setOpen(!open)}>
        <FaTrash />
        Hapus
      </Button>

      <DialogBasic
        title={'Hapus Jalur Masuk'}
        open={open}
        setOpen={setOpen}
        className={'lg:max-w-2xl'}
      >
        <div>
          Apakah Anda yakin ingin menghapus jalur masuk untuk Program Studi S1 ${nama_prodi},{' '}
          {nama_fakultas}, Jalur Masuk ${data?.nama_jalur_masuk} ?
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
