import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { CountryList } from '../model'
import { toast } from 'react-toastify'
import { IconDelete } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
interface Props {
  data: CountryList
}
const ButtonDeleteCountry = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleDelete() {
    setLoading(true)
    try {
      const res = await AxiosClient.delete(`/pengaturan/referensi/negara/${data.id_negara}`)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-country'],
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
        className="cursor-pointer"
        onClick={() => {
          setOpen(true)
        }}
      >
        {' '}
        <IconDelete />
      </button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Negara</p>}
      >
        <p>
          Anda akan menghapus Negara <span className="font-bold">“{data.nama_negara}”</span>. Apakah
          Anda yakin untuk menghapus Negara yang dipilih?
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

export default ButtonDeleteCountry
