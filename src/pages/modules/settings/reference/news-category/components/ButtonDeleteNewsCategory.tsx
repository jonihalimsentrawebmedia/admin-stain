import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
import { useState } from 'react'
import type { NewsCategoryList } from '../model'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: NewsCategoryList
}
const ButtonDeleteNewsCategory = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleDelete() {
    setLoading(true)
    try {
      const res = await AxiosClient.delete(
        `/pengaturan/referensi/kategori-berita/${data.id_kategori}`
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-news-category'],
        })
        setOpen(false)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
    setLoading(false)
  }
  return (
    <>
      <button
        className="cursor-pointer bg-red-500 p-1.5 text-white rounded hover:bg-red-600"
        onClick={() => {
          setOpen(true)
        }}
      >
        <FaTrash />
      </button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Kategori Berita</p>}
      >
        <p>
          Anda akan menghapus kategori berita{' '}
          <span className="font-bold">“{data.nama_kategori}”</span>. Apakah Anda yakin untuk
          menghapus kategori berita yang dipilih?
        </p>

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            <Trash2 />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonDeleteNewsCategory
