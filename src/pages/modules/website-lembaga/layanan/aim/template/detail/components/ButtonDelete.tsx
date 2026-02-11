import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconDelete } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
import type { DocumentSupportList } from '../../model'
interface Props {
  data: DocumentSupportList
}
const ButtonDelete = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm()
  const fieldsConfig = [
    {
      name: 'nama_dokumen',
      label: 'Judul*',
    },
    {
      name: 'nama_dokumen',
      label: 'Nama Dokumen*',
    },
    {
      name: 'url',
      label: 'URL*',
    },
    {
      name: 'public',
      label: 'Public / Tidak*',
    },
    {
      name: 'urutan',
      label: 'Urutan',
    },
  ]

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleDelete() {
    setLoading(true)
    try {
      const res = await AxiosClient.delete(
        `/lembaga/daftar-dokumen/${data.id_lembaga_daftar_dokumen}`
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['lembaga-daftar-dokumen'],
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
        title={<p className="text-2xl text-red-500">Hapus Dokumen</p>}
      >
        <p>Apakah anda yakin ingin menghapus dokumen ini?</p>
        <div className="my-4 ">
          <DetailField data={fieldsConfig} form={form} />
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
