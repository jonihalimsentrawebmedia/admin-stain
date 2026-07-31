import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UseGetDetailRegistration } from '../../register/hooks/index.tsx'
import { UseGetPemeriksaan } from '../../register/diagnosis/hooks/index.tsx'
import { UseGetRoom } from '@/pages/modules/SIM-RS/reference/room/hooks/index.tsx'
import { UseGetRoomType } from '@/pages/modules/SIM-RS/reference/room-type/hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const kondisiOptions = [
  { value: 'MEMBAIK', label: 'Membaik' },
  { value: 'BELUM_SEMBUH', label: 'Belum Sembuh' },
  { value: 'DIRUJUK', label: 'Dirujuk' },
  { value: 'MENINGGAL', label: 'Meninggal' },
]

const ResolverUpdated = z.object({
  id_ruangan: z.string().min(1, 'Ruangan harus dipilih'),
  id_jenis_ruangan: z.string().min(1, 'Jenis Ruangan harus dipilih'),
  catatan: z.string().optional().nullable(),
  tanggal_masuk: z.string().min(1, 'Tanggal Masuk harus diisi'),
  tanggal_keluar: z.string().optional().nullable(),
  status_kondisi: z.string().optional().nullable(),
  catatan_kepulangan: z.string().optional().nullable(),
})

type TResolverUpdated = z.infer<typeof ResolverUpdated>

const UpdatedInpatient = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [saveLoading, setSaveLoading] = useState(false)

  const { detail, loading } = UseGetDetailRegistration(id ?? '')
  const { pemeriksaan } = UseGetPemeriksaan(id ?? '')

  const form = useForm<TResolverUpdated>({
    resolver: zodResolver(ResolverUpdated),
    defaultValues: {
      id_ruangan: '',
      id_jenis_ruangan: '',
      catatan: '',
      tanggal_masuk: '',
      tanggal_keluar: '',
      status_kondisi: '',
      catatan_kepulangan: '',
    },
  })

  const watchedJenisRuangan = form.watch('id_jenis_ruangan')

  const { roomType } = UseGetRoomType({ limit: '0', page: '0' })
  const { room } = UseGetRoom({
    limit: '0',
    page: '0',
    id_jenis_ruangan: watchedJenisRuangan,
  })

  useEffect(() => {
    if (detail) {
      const activeRoom = detail.riwayat_ruangan?.find(
        (r) => r.id_ruangan === detail.id_ruangan_aktif
      )
      form.reset({
        id_ruangan: detail.id_ruangan_aktif ?? '',
        id_jenis_ruangan: detail.id_jenis_ruangan ?? '',
        catatan: activeRoom?.catatan ?? '',
        tanggal_masuk: activeRoom?.tanggal_masuk ? activeRoom.tanggal_masuk.slice(0, 16) : '',
        tanggal_keluar: activeRoom?.tanggal_keluar ? activeRoom.tanggal_keluar.slice(0, 16) : '',
        status_kondisi: activeRoom?.status_kondisi ?? '',
        catatan_kepulangan: activeRoom?.catatan_kepulangan ?? '',
      })
    }
  }, [detail, form])

  const roomTypeData =
    roomType?.map((rt) => ({
      label: rt.nama,
      value: rt.id_jenis_ruangan.toString(),
    })) ?? []

  const roomData =
    room?.map((r) => ({
      label: `${r.nama} - ${r.nomor}`,
      value: r.id_ruangan.toString(),
    })) ?? []

  const handleSave = async (value: TResolverUpdated) => {
    setSaveLoading(true)
    try {
      const payload = {
        id_ruangan: value.id_ruangan,
        id_jenis_ruangan: value.id_jenis_ruangan,
        catatan: value.catatan || null,
        tanggal_masuk: new Date(value.tanggal_masuk).toISOString(),
        tanggal_keluar: value.tanggal_keluar ? new Date(value.tanggal_keluar).toISOString() : null,
        status_kondisi: value.status_kondisi || null,
        catatan_kepulangan: value.catatan_kepulangan || null,
      }
      const res = await AxiosClient.put(
        `/simrs/pelayanan/pendaftaran-ruangan/pendaftaran/${id}/ruangan`,
        payload
      )
      if (res?.data?.status) {
        toast.success(res?.data?.message || 'Berhasil memperbarui data rawat inap')
        queryClient.invalidateQueries({ queryKey: ['registration'] })
        queryClient.invalidateQueries({ queryKey: ['detail-registration', id] })
        navigate('/modules/sim-rs/services/inpatient')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal memperbarui data rawat inap')
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
      <ButtonTitleGroup isBack label="Edit Rawat Inap" buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_SERVICES" /> }]} />

      <div className="bg-white rounded-lg border p-6">
        <TitleLine className="text-lg font-semibold text-primary" title="1. Informasi Pasien" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
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
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <TitleLine className="text-lg font-semibold text-primary" title="2. Informasi Rawat Inap" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SelectBasicInput
                name="id_jenis_ruangan"
                form={form}
                label="Jenis Ruangan"
                placeholder="Pilih Jenis Ruangan"
                data={roomTypeData}
                usePortal
                isRequired
              />
              <SelectBasicInput
                name="id_ruangan"
                form={form}
                label="Ruangan"
                placeholder="Pilih Ruangan"
                data={roomData}
                usePortal
                isRequired
              />
              <TextInput
                name="tanggal_masuk"
                form={form}
                label="Tanggal Masuk"
                type="datetime-local"
                isRequired
              />
              <TextInput
                name="tanggal_keluar"
                form={form}
                label="Tanggal Keluar"
                type="datetime-local"
              />
              <SelectBasicInput
                name="status_kondisi"
                form={form}
                label="Kondisi Pasien Saat Pulang"
                placeholder="Pilih Kondisi"
                data={kondisiOptions}
                usePortal
              />
              <div className="col-span-2">
                <TextAreaInput
                  name="catatan"
                  form={form}
                  label="Catatan (Opsional)"
                  placeholder="Masukkan catatan"
                />
              </div>
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

      {pemeriksaan && (
        <>
          <div className="bg-white rounded-lg border p-6">
            <TitleLine
              className="text-lg font-semibold text-primary"
              title="3. Hasil Pemeriksaan"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Keluhan</p>
                <p className="text-base font-medium">{pemeriksaan.keluhan_utama}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Diagnosa</p>
                <p className="text-base font-medium">
                  {pemeriksaan.daftar_diagnosis?.length > 0
                    ? pemeriksaan.daftar_diagnosis.map((d) => d.nama_diagnosis).join(', ')
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tindakan</p>
                <p className="text-base font-medium">
                  {pemeriksaan.daftar_procedure?.length > 0
                    ? pemeriksaan.daftar_procedure.map((p) => p.nama_procedure).join(', ')
                    : '-'}
                </p>
              </div>
              {pemeriksaan.catatan && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Catatan (Opsional)</p>
                  <p className="text-base font-medium">{pemeriksaan.catatan}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <TitleLine
              className="text-lg font-semibold text-primary"
              title="4. Keputusan Perawatan"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Keputusan Yang Diberikan</p>
                <p className="text-base font-medium">
                  {pemeriksaan.keputusan === 'RAWAT_JALAN' ? 'Rawat Jalan' : 'Rawat Inap'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UpdatedInpatient
