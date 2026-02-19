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
import type { PublicInformationRegistry } from '../model'
interface Props {
  data: PublicInformationRegistry
}
const ButtonDeleteInformationPublic = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm()
  const fieldsConfig = [
    {
      name: 'ringkasan_isi_informasi',
      label: 'Ringkasan Isi Informasi*',
    },
    {
      name: 'nama_kelompok_organisasi',
      label: 'Pejabat / Unit /Fakultas yang menguasai*',
    },
    {
      name: 'nama_pejabat',
      label: 'Penanggung jawab Pembuatan / Penerbitan  Informasi*',
    },
    {
      name: 'waktu_dan_tempat_pembuatan_informasi',
      label: 'Waktu dan Tempat Pembuatan Informasi*',
    },
    {
      name: 'format_informasi_tersedia',
      label: 'Format Informasi yang Tersedia*',
    },
    {
      name: 'jangka_aktif',
      label: 'Jangka dan Waktu Penyimpanan',
      component: (
        <div>
          Aktif{form.watch('jangka_aktif')} <br /> inaktif {form.watch('jangka_inaktif')}
        </div>
      ),
    },
  ]

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleDelete() {
    setLoading(true)
    try {
      const res = await AxiosClient.delete(
        `/unit-ppid/daftar-informasi-public/${data.id_daftar_informasi_public}`
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['unit-ppid-daftar-informasi-public'],
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
        className="max-w-2xl! w-[90wdv] md:w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Daftar Informasi Publik</p>}
      >
        <p>Apakah anda yakin ingin menghapus daftar Informasi publik ini?</p>
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

export default ButtonDeleteInformationPublic
