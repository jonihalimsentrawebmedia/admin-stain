import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { UseGetDetailRegistration } from '../../register/hooks/index.tsx'
import { UseGetPemeriksaan } from '../../register/diagnosis/hooks/index.tsx'
import { UseGetRoom } from '@/pages/modules/SIM-RS/reference/room/hooks/index.tsx'
import { UseGetRoomType } from '@/pages/modules/SIM-RS/reference/room-type/hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'

const ResolverRoom = z.object({
  id_ruangan: z.string().min(1, 'Ruangan harus dipilih'),
  id_jenis_ruangan: z.string().min(1, 'Jenis Ruangan harus dipilih'),
  catatan: z.string().optional().nullable(),
  tanggal_masuk: z.string().min(1, 'Tanggal Masuk harus diisi'),
})

type TResolverRoom = z.infer<typeof ResolverRoom>

const DetailInpatient = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { detail, loading } = UseGetDetailRegistration(id ?? '')
  const { pemeriksaan } = UseGetPemeriksaan(id ?? '')
  const [isEdit, setIsEdit] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  const form = useForm<TResolverRoom>({
    resolver: zodResolver(ResolverRoom),
  })

  const watchedJenisRuangan = form.watch('id_jenis_ruangan')

  const { roomType } = UseGetRoomType({ limit: '0', page: '0' })
  const { room } = UseGetRoom({
    limit: '0',
    page: '0',
    id_jenis_ruangan: watchedJenisRuangan,
  })

  useEffect(() => {
    if (detail && isEdit) {
      form.reset({
        id_ruangan: detail.id_ruangan_aktif ?? '',
        id_jenis_ruangan: detail.id_jenis_ruangan ?? '',
        catatan: detail.riwayat_ruangan?.find((r) => r.status === 'AKTIF')?.catatan ?? '',
        tanggal_masuk: detail.tanggal_masuk_ruangan_aktif
          ? detail.tanggal_masuk_ruangan_aktif.slice(0, 16)
          : '',
      })
    }
  }, [detail, isEdit, form])

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

  const HandleSave = async (value: TResolverRoom) => {
    if (!detail) return
    setSaveLoading(true)
    await AxiosClient.put(
      `/simrs/pelayanan/pendaftaran-ruangan/pendaftaran/${detail.id_pendaftaran}`,
      {
        ...value,
        tanggal_masuk: new Date(value.tanggal_masuk).toISOString(),
      }
    )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Berhasil memperbarui ruangan')
          queryClient.invalidateQueries({ queryKey: ['registration'] })
          queryClient.invalidateQueries({ queryKey: ['detail-registration', id] })
          setIsEdit(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal memperbarui ruangan')
      })
      .finally(() => {
        setSaveLoading(false)
      })
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

  const badgeColor =
    detail.status === 'MENUNGGU'
      ? 'bg-yellow-100 text-yellow-700'
      : detail.status === 'DIPANGGIL'
        ? 'bg-blue-100 text-blue-700'
        : detail.status === 'SELESAI'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'

  const statusLabel =
    detail.status === 'MENUNGGU'
      ? 'Menunggu'
      : detail.status === 'DIPANGGIL'
        ? 'Dipanggil'
        : detail.status === 'SELESAI'
          ? 'Selesai'
          : 'Dibatalkan'

  const jkLabel = detail.jenis_kelamin_pasien === 'L' ? 'Laki-laki' : 'Perempuan'
  const tglLahir = format(new Date(detail.tanggal_lahir_pasien), 'dd-MM-yyyy')
  const isPulang = detail.status_rawat_inap === 'PULANG'
  const isMenungguRuangan = detail.status_rawat_inap === 'MENUNGGU_RUANGAN'
  const activeRoom = detail.riwayat_ruangan?.find((r) => r.status === 'AKTIF')
  const pulangRoom = isPulang
    ? [...(detail.riwayat_ruangan ?? [])].reverse().find((r) => r.tanggal_keluar)
    : null

  return (
    <div className="space-y-5">
      <ButtonTitleGroup
        isBack
        label="Detail Rawat Inap"
        buttonGroup={
          isPulang
            ? [
                {
                  type: 'edit' as const,
                  label: 'Edit Rawat Inap',
                  onClick: () => navigate(`/modules/sim-rs/services/inpatient/edit/${id}`),
                },
              ]
            : !isEdit
              ? [
                  ...(isMenungguRuangan
                    ? [
                        {
                          type: 'edit' as const,
                          label: 'Tentukan Ruangan',
                          onClick: () => setIsEdit(true),
                        },
                      ]
                    : []),
                  {
                    type: 'edit' as const,
                    label: 'Edit Data',
                    onClick: () =>
                      navigate(
                        `/modules/sim-rs/services/outpatient/detail/${id}/edit-pemeriksaan`
                      ),
                  },
                ]
              : []
        }
      />

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Informasi Pendaftaran</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">No. Pendaftaran</p>
            <p className="text-base font-medium">{detail.no_pendaftaran}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Pendaftaran</p>
            <p className="text-base font-medium">
              {format(new Date(detail.tanggal_pendaftaran), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Informasi Pasien</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">No. Rekam Medis</p>
            <p className="text-base font-medium">{detail.no_rekam_medis_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nama Pasien</p>
            <p className="text-base font-medium">{detail.nama_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jenis Kelamin</p>
            <p className="text-base font-medium">{jkLabel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tempat Lahir</p>
            <p className="text-base font-medium">{detail.tempat_lahir_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Lahir</p>
            <p className="text-base font-medium">{tglLahir}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Informasi Ruangan</p>
        {isEdit ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SelectBasicInput
                  name="id_jenis_ruangan"
                  form={form}
                  label="Jenis Ruangan"
                  placeholder="Pilih Jenis Ruangan"
                  data={roomTypeData}
                  usePortal
                />
                <SelectBasicInput
                  name="id_ruangan"
                  form={form}
                  label="Ruangan"
                  placeholder="Pilih Ruangan"
                  data={roomData}
                  usePortal
                />
                <TextInput
                  name="tanggal_masuk"
                  form={form}
                  label="Tanggal Masuk"
                  type="datetime-local"
                  className="col-span-2"
                  isRequired
                />
                <TextAreaInput
                  name="catatan"
                  form={form}
                  label="Catatan (Opsional)"
                  placeholder="Masukkan catatan"
                  className="col-span-2"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            {detail.tanggal_masuk_ruangan_aktif && (
              <div>
                <p className="text-sm text-gray-500">Tanggal Masuk</p>
                <p className="text-base font-medium">
                  {format(new Date(detail.tanggal_masuk_ruangan_aktif), 'dd-MM-yyyy HH:mm')}
                </p>
              </div>
            )}
            {activeRoom?.catatan && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Catatan</p>
                <p className="text-base font-medium">{activeRoom.catatan}</p>
              </div>
            )}
            {isPulang && pulangRoom && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Masuk</p>
                  <p className="text-base font-medium">
                    {format(new Date(pulangRoom.tanggal_masuk), 'dd-MM-yyyy HH:mm')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Keluar / Pulang</p>
                  <p className="text-base font-medium">
                    {pulangRoom.tanggal_keluar
                      ? format(new Date(pulangRoom.tanggal_keluar), 'dd-MM-yyyy HH:mm')
                      : '-'}
                  </p>
                </div>
                {pulangRoom.catatan && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Catatan</p>
                    <p className="text-base font-medium">{pulangRoom.catatan}</p>
                  </div>
                )}
                {pulangRoom.catatan_kepulangan && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Catatan Kepulangan</p>
                    <p className="text-base font-medium">{pulangRoom.catatan_kepulangan}</p>
                  </div>
                )}
                {pulangRoom.status_kondisi && (
                  <div>
                    <p className="text-sm text-gray-500">Kondisi Pulang</p>
                    <p className="text-base font-medium">
                      {pulangRoom.status_kondisi === 'MEMBAIK'
                        ? 'Membaik'
                        : pulangRoom.status_kondisi === 'BELUM_SEMBUH'
                          ? 'Belum Sembuh'
                          : pulangRoom.status_kondisi === 'DIRUJUK'
                            ? 'Dirujuk'
                            : pulangRoom.status_kondisi === 'MENINGGAL'
                              ? 'Meninggal'
                              : pulangRoom.status_kondisi}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Tujuan Pelayanan</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Poli</p>
            <p className="text-base font-medium">{detail.nama_poli}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dokter</p>
            <p className="text-base font-medium">{detail.nama_dokter}</p>
          </div>
        </div>
      </div>

      {pemeriksaan && (
        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Data Pemeriksaan</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">No. Pemeriksaan</p>
              <p className="text-base font-medium">{pemeriksaan.no_pemeriksaan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-base font-medium">{pemeriksaan.status}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Keluhan Utama</p>
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
              <p className="text-sm text-gray-500">Rencana Tindakan</p>
              <p className="text-base font-medium">
                {pemeriksaan.daftar_procedure?.length > 0
                  ? pemeriksaan.daftar_procedure.map((p) => p.nama_procedure).join(', ')
                  : '-'}
              </p>
            </div>
            {pemeriksaan.catatan && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Catatan</p>
                <p className="text-base font-medium">{pemeriksaan.catatan}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Keputusan</p>
              <p className="text-base font-medium">
                {pemeriksaan.keputusan === 'RAWAT_JALAN' ? 'Rawat Jalan' : 'Rawat Inap'}
              </p>
            </div>
          </div>
        </div>
      )}

      {detail.riwayat_ruangan && detail.riwayat_ruangan.length > 0 && (
        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Riwayat Ruangan</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Ruangan</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Jenis</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Tanggal Masuk</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Tanggal Keluar</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Status</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {detail.riwayat_ruangan.map((r) => (
                  <tr key={r.id_pendaftaran_ruangan} className="border-b last:border-0">
                    <td className="py-2 px-3">
                      {r.nama_ruangan} ({r.nomor_ruangan})
                    </td>
                    <td className="py-2 px-3">{r.nama_jenis_ruangan}</td>
                    <td className="py-2 px-3">
                      {format(new Date(r.tanggal_masuk), 'dd-MM-yyyy HH:mm')}
                    </td>
                    <td className="py-2 px-3">
                      {r.tanggal_keluar
                        ? format(new Date(r.tanggal_keluar), 'dd-MM-yyyy HH:mm')
                        : '-'}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          r.status === 'AKTIF'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">{r.catatan ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailInpatient
