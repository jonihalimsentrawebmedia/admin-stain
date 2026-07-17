import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailRegistration } from '../hooks/index.tsx'
import { ButtonCall } from '../components/ButtonCall.tsx'
import { UseGetPemeriksaan } from '../diagnosis/hooks/index.tsx'
import { format } from 'date-fns'

const DetailRegistration = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading } = UseGetDetailRegistration(id ?? '')
  const { pemeriksaan } = UseGetPemeriksaan(id ?? '')

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

  return (
    <div className="space-y-5">
      <ButtonTitleGroup
        isBack
        label="Detail Pendaftaran"
        buttonGroup={[
          {
            type: 'edit',
            label: 'Edit',
            onClick: () =>
              navigate(`/modules/sim-rs/services/registration/edit/${detail.id_pendaftaran}`),
          },
          ...(detail.status === 'MENUNGGU'
            ? [
                {
                  type: 'custom' as const,
                  element: <ButtonCall data={detail} />,
                },
              ]
            : []),
          ...(detail.status === 'DIPANGGIL'
            ? [
                {
                  type: 'custom' as const,
                  label: 'Pemeriksaan',
                  element: (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/modules/sim-rs/services/registration/diagnosis/${detail.id_pendaftaran}`
                        )
                      }
                      className="px-3 py-1 rounded text-xs font-medium bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Pemeriksaan
                    </button>
                  ),
                },
              ]
            : []),
        ]}
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

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Informasi Sistem</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Diregistrasi Oleh</p>
            <p className="text-base font-medium">{detail.nama_user_created}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Registrasi</p>
            <p className="text-base font-medium">
              {format(new Date(detail.tanggal_registrasi), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Terakhir Update</p>
            <p className="text-base font-medium">
              {format(new Date(detail.updated_at), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Diupdate Oleh</p>
            <p className="text-base font-medium">{detail.nama_user_updated}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailRegistration
