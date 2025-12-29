import { useForm } from 'react-hook-form'
import type { CalloborationList } from '../model'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconDelete } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'

interface Props {
  data: CalloborationList
}

const ButtonDeleteCalloborationList = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const field: any = [
    {
      name: 'nama_unit',
      label: 'Unit',
    },
    {
      name: 'alamat_mitra',
      label: 'Mitra',
    },
    {
      name: 'nama_kategori_kerjasama',
      label: 'Kategori',
    },
    {
      name: 'nama_sub_kategori_kerjasama',
      label: 'Sub Kategori',
    },
    {
      name: 'nama_jenis_kerjasama',
      label: 'Jenis',
    },
    {
      name: 'nama_bidang_kerjasama',
      label: 'Bidang',
    },
    {
      name: 'nama_bidang_kerjasama',
      label: 'Periode',
      component:<div>{data.tanggal_mulai} s/d {data.tanggal_selesai} ({data.periode} Tahun)</div>
    },
     {
      name: 'nama_negara',
      label: 'Negara',
    },
  ]

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/kerjasama/${data?.id_kerjasama}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data  kerjasama')
          queryClient.invalidateQueries({
            queryKey: ['list-calloboration'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(!open)
          form.reset({
            ...data,
          })
        }}
      >
        <IconDelete />
      </button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        width="50%"
        title={<p className="text-2xl text-red-500">Hapus Data Kerjasama</p>}
        description={'Apakah anda yakin untuk menghapus data kerjasama berikut?'}
      >
        <DetailField data={field} form={form} />
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

export default ButtonDeleteCalloborationList
