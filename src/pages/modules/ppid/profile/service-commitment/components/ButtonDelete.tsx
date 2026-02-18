import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconDelete } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
import DetailField from '@/components/common/field/DetailField'
import type { ServiceCommitmentList } from '../model'
interface Props {
  data: ServiceCommitmentList
}
const ButtonDelete = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm()

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const field = [
    {
      name: 'deskripsi',
      label: 'Deskripsi',
      component: <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />,
    },

    {
      name: 'public',
      label: 'Status Publik',
      component: <div>{data.public ? 'Aktif' : 'Tidak Aktif'}</div>,
    },
  ]
  async function handleDelete() {
    setLoading(true)
    try {
      const res = await AxiosClient.delete(
        `/unit-ppid/maklumat-layanan/${data.id_maklumat_layanan}`
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['service-commitment-unit-ppid'],
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
        title={<p className="text-2xl text-red-500">Hapus Maklumat Layanan</p>}
        description="Apakah anda yakin untuk menghapus konten berikut?"
      >
        <img
          className="min-w-[360px] max-w-[360px] text-center mx-auto max-h-[360px] min-h-[360px] w-full h-full"
          src={data.url_gambar}
          alt={data.key_gambar}
        />
        <div className="my-4 ">
          <DetailField data={field} form={form} />
        </div>

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

export default ButtonDelete
