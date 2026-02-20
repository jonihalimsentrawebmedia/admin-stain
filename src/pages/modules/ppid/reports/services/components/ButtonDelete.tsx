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
import type { IReportService } from '../model'
import { Link } from 'react-router-dom'
interface Props {
  data: IReportService
}
const ButtonDelete = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm()
  const fieldsConfigUrl: any = [
    {
      name: 'nama_laporan',
      label: 'Nama Laporan*',
    },
    {
      name: 'jenis',
      label: 'Jenis *',
    },
    {
      name: 'url',
      label: 'URL*',
    },

    {
      name: 'public',
      label: 'Public / Tidak*',
      component: <div>{data.public ? 'Publik' : 'Tidak Publik'}</div>,
    },
    {
      name: 'urutan',
      label: 'Urutan',
    },
  ]
  const fieldsConfigDocument: any = [
    {
      name: 'nama_laporan',
      label: 'Nama Laporan*',
    },
    {
      name: 'jenis',
      label: 'Jenis *',
    },

    {
      name: 'url_file',
      label: 'File Dokumen*',
      component: (
        <Link className="text-primary underline" to={form.watch('url_file')}>
          Buka File
        </Link>
      ),
    },
    {
      name: 'public',
      label: 'Public / Tidak*',
      component: <div>{data.public ? 'Publik' : 'Tidak Publik'}</div>,
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
      const res = await AxiosClient.delete(`/unit-ppid/laporan-layanan/${data.id_laporan_layanan}`)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['reports-service'],
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
        title={<p className="text-2xl text-red-500">Hapus Laporan</p>}
      >
        <p>Apakah anda yakin ingin menghapus Laporan ini?</p>
        <div className="my-4 ">
          <img
            src={data.url_gambar}
            className=" object-cover w-[180px] max-w-[180px] max-h-60 min-w-[180px] min-h-60 h-60 "
            alt=""
          />
          <DetailField
            data={form.watch('jenis') == 'dokumen' ? fieldsConfigDocument : fieldsConfigUrl}
            form={form}
          />
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
