import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { differenceInDays, format } from 'date-fns'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UseGetDetailRegistration } from '../../register/hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

const kondisiOptions = [
  { value: 'MEMBAIK', label: 'Membaik' },
  { value: 'BELUM_SEMBUH', label: 'Belum Sembuh' },
  { value: 'DIRUJUK', label: 'Dirujuk' },
  { value: 'MENINGGAL', label: 'Meninggal' },
]

const ResolverBackHome = z.object({
  tanggal_keluar: z.string().min(1, 'Tanggal Keluar harus diisi'),
  status_kondisi: z.string().min(1, 'Kondisi Pasien harus dipilih'),
  catatan_kepulangan: z.string().optional().nullable(),
})

type TResolverBackHome = z.infer<typeof ResolverBackHome>

const BackHomeInpatient = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { detail, loading } = UseGetDetailRegistration(id ?? '')
  const [saveLoading, setSaveLoading] = useState(false)

  const form = useForm<TResolverBackHome>({
    resolver: zodResolver(ResolverBackHome),
    defaultValues: {
      tanggal_keluar: '',
      status_kondisi: '',
      catatan_kepulangan: '',
    },
  })

  const watchedTanggalKeluar = form.watch('tanggal_keluar')

  const activeRoom = detail?.riwayat_ruangan?.find((r) => r.status === 'AKTIF')
  const tanggalMasuk = detail?.tanggal_masuk_ruangan_aktif ?? activeRoom?.tanggal_masuk ?? ''

  const lamaRawat = useMemo(() => {
    if (!tanggalMasuk || !watchedTanggalKeluar) return 0
    const start = new Date(tanggalMasuk)
    const end = new Date(watchedTanggalKeluar)
    return differenceInDays(end, start)
  }, [tanggalMasuk, watchedTanggalKeluar])

  const handleSave = async (value: TResolverBackHome) => {
    setSaveLoading(true)
    try {
      const payload = {
        tanggal_keluar: new Date(value.tanggal_keluar).toISOString(),
        status_kondisi: value.status_kondisi,
        catatan_kepulangan: value.catatan_kepulangan || null,
      }
      const res = await AxiosClient.put(
        `/simrs/pelayanan/pendaftaran-ruangan/pendaftaran/${id}/pulang`,
        payload
      )
      if (res?.data?.status) {
        toast.success(res?.data?.message || 'Berhasil memulangkan pasien')
        queryClient.invalidateQueries({ queryKey: ['registration'] })
        queryClient.invalidateQueries({ queryKey: ['registration-status-inap-count'] })
        navigate('/modules/sim-rs/services/inpatient')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal memulangkan pasien')
    } finally {
      setSaveLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Data tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <ButtonTitleGroup isBack label="Pasien Pulang" buttonGroup={[]} />

      <div className="bg-white rounded-lg border p-6">
        <TitleLine className="text-lg font-semibold text-primary" title="1. Informasi Pasien" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">No. Registrasi</p>
            <p className="text-base font-medium">{detail.no_pendaftaran}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Registrasi</p>
            <p className="text-base font-medium">
              {format(new Date(detail.tanggal_pendaftaran), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">No. Rekam Medis</p>
            <p className="text-base font-medium">{detail.no_rekam_medis_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nama Pasien</p>
            <p className="text-base font-medium">{detail.nama_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jenis Ruangan</p>
            <p className="text-base font-medium">{detail.nama_jenis_ruangan_aktif ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ruangan</p>
            <p className="text-base font-medium">
              {detail.nama_ruangan_aktif
                ? `${detail.nama_ruangan_aktif} (${detail.nomor_ruangan_aktif})`
                : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Masuk</p>
            <p className="text-base font-medium">
              {tanggalMasuk
                ? format(new Date(tanggalMasuk), 'dd-MM-yyyy HH:mm')
                : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Catatan Rawat Inap</p>
            <p className="text-base font-medium">{activeRoom?.catatan ?? '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <TitleLine className="text-lg font-semibold text-primary" title="2. Informasi Kepulangan" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="tanggal_keluar"
                form={form}
                label="Tanggal Keluar"
                type="datetime-local"
                isRequired
              />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Lama Rawat
                </label>
                <input
                  type="text"
                  value={`${lamaRawat} Hari`}
                  disabled
                  className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
              <SelectBasicInput
                name="status_kondisi"
                form={form}
                label="Kondisi Pasien Saat Pulang"
                placeholder="Pilih Kondisi"
                data={kondisiOptions}
                usePortal
                isRequired
              />
              <div className="col-span-2">
                <TextAreaInput
                  name="catatan_kepulangan"
                  form={form}
                  label="Catatan Kepulangan (Opsional)"
                  placeholder="Masukkan catatan kepulangan"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50"
              >
                {saveLoading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default BackHomeInpatient
