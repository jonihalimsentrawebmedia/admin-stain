import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailRegistration } from '../hooks/index.tsx'
import { ButtonCall } from '../components/ButtonCall.tsx'
import { format } from 'date-fns'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const DetailRegistration = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading } = UseGetDetailRegistration(id ?? '')
  const permision = GuardCrud({ keys: 'PENDAFTARAN' })

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
        buttonGroup={
          permision?.kelola
            ? [
                { type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_SERVICES" /> },
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className={'bg-primary'}>
              <tr className="border-b bg-primay">
                <th className="py-2.5 px-3 text-left font-medium text-white">No. Rekam Medis</th>
                <th className="py-2.5 px-3 text-left font-medium text-white">Nama Pasien</th>
                <th className="py-2.5 px-3 text-left font-medium text-white">Jenis Kelamin</th>
                <th className="py-2.5 px-3 text-left font-medium text-white">Tempat Lahir</th>
                <th className="py-2.5 px-3 text-left font-medium text-white">Tanggal Lahir</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2.5 px-3 font-medium">{detail.no_rekam_medis_pasien}</td>
                <td className="py-2.5 px-3">{detail.nama_pasien}</td>
                <td className="py-2.5 px-3">{jkLabel}</td>
                <td className="py-2.5 px-3">{detail.tempat_lahir_pasien}</td>
                <td className="py-2.5 px-3">{tglLahir}</td>
              </tr>
            </tbody>
          </table>
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

      {detail.sumber_biaya && detail.sumber_biaya.length > 0 && (
        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Data Sumber Biaya Pengobatan</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary">
                  <th className="border px-3 py-2 text-white text-left w-10">#</th>
                  <th className="border px-3 py-2 text-white text-left">Kode</th>
                  <th className="border px-3 py-2 text-white text-left">Nama Sumber Biaya</th>
                  <th className="border px-3 py-2 text-white text-center">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {detail.sumber_biaya.map((item, idx) => (
                  <tr key={item.id_pendaftaran_sumber_biaya} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{idx + 1}</td>
                    <td className="border px-3 py-2">{item.kode_sumber_biaya}</td>
                    <td className="border px-3 py-2">{item.nama_sumber_biaya}</td>
                    <td className="border px-3 py-2 text-center">{item.persentase}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
