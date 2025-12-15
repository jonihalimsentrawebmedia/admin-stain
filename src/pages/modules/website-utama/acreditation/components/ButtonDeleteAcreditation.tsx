import { useForm } from 'react-hook-form'
import type { AcreditationList } from '../model'
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
  data: AcreditationList
}
const ButtonDeleteAcreditation = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const field: any = [
    {
      name: 'nama_satuan_organisasi',
      label: 'Pilih Universitas / Prodi*',
    },
    {
      name: 'uraian',
      label: 'Uraian',
    },
    {
      name: 'nilai_akreditas',
      label: 'Nilai Akreditasi*',
    },
    {
      name: 'lembaga_penilaian',
      label: 'Lembaga Penilai*',
    },
    {
      name: 'no_surat_keputusan',
      label: 'No. Surat Keputusan*',
    },
    {
      name: 'mulai_berlaku',
      label: 'Mulai Berlaku*',
    },
    {
      name: 'akhir_berlaku',
      label: 'Akhir Berlaku*',
    },
  ]

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/website-utama/akreditas/${data?.id_akreditas}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Tahun Akademik')
          queryClient.invalidateQueries({
            queryKey: ['list-acreditation'],
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
            akhir_berlaku: data.akhir_berlaku.split("-").reverse().join("-"),
            mulai_berlaku: data.mulai_berlaku.split("-").reverse().join("-"),
          })
        }}
      >
        <IconDelete />
      </button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
           width='50%'
        title={<p className="text-2xl text-red-500">Hapus Akreditasi</p>}
        description={'Anda yakin ingin menghapus akreditasi ini?'}
      >
        <img
          src={data.gambar}
          className="w-[339px] h-[220px] mx-auto object-center object-cover"
          alt=""
        />
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

export default ButtonDeleteAcreditation
