import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconDelete } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
import type { IShortcut } from '../model'
import DetailField from '@/components/common/field/DetailField'
interface Props {
  data: IShortcut
}
const ButtonDelete = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm()

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleDelete() {
    setLoading(true)
    try {
      const res = await AxiosClient.delete(`/unit-ppid/pintasan/${data.id_pintasan}`)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['shortcut'],
        })
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
          form.reset({
            ...data,
          })
        }}
      >
        <IconDelete />
      </button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Pintasan</p>}
      >
        <div className="flex gap-2 ">
          <img src={data.url_gambar} className="h-[400px] object-contain" alt="" />
          <DetailField
            form={form}
            data={[
              {
                label: 'Nama Pintasan',
                name: 'nama_pintasan',
              },
            ]}
          />
        </div>

        <div className="flex gap-4 items-center justify-center">
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

export default ButtonDelete
