import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import {
  AcreditationResolver,
  type IAcreditationTypeForm,
} from '@/pages/modules/website-utama/acreditation/model/resolver.tsx'
import type { AcreditationList } from '@/pages/modules/website-utama/acreditation/model'
import { formatDateTime } from '@/utils/date.tsx'
import { HiPencil } from 'react-icons/hi'
import AccreditationFormProdi from '@/pages/modules/website-prodi/accreditation/components/form.tsx'

interface Props {
  data?: AcreditationList
}

const ButtonEditAccreditationProdi = (props: Props) => {
  const { data } = props

  const form = useForm<IAcreditationTypeForm>({
    resolver: zodResolver(AcreditationResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      const startAt = formatDateTime(data.mulai_berlaku)
      const endAt = formatDateTime(data.akhir_berlaku)
      form.reset({
        id_satuan_organisasi_akreditas: data?.id_satuan_organisasi_akreditas,
        uraian: data?.uraian,
        lembaga_penilaian: data?.lembaga_penilaian,
        no_surat_keputusan: data?.no_surat_keputusan,
        nilai_akreditas: data?.nilai_akreditas,
        akhir_berlaku: endAt.date.split('-').reverse().join('-'),
        mulai_berlaku: startAt.date.split('-').reverse().join('-'),
        gambar: data?.gambar,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const handleSave = async (e: IAcreditationTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/prodi/akreditas/${data?.id_akreditas}`, {
      ...e,
      akhir_berlaku: new Date(e.akhir_berlaku).toISOString(),
      mulai_berlaku: new Date(e.mulai_berlaku).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['accreditation-prodi'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          form.reset()
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
        className={'bg-yellow-500 hover:bg-yellow-500 text-white p-1.5'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Tambah Akreditasi'}
        width="50%"
      >
        <AccreditationFormProdi
          form={form}
          loading={loading}
          handleSave={handleSave}
          handleCancel={() => {
            setOpen(false)
          }}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonEditAccreditationProdi
