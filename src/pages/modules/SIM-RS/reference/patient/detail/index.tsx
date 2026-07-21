import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailPatient } from '../hooks/index.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

const DetailPatient = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading } = UseGetDetailPatient(id ?? '')
  const permission = GuardCrud({ keys: 'PASIEN' })

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

  const jenisKelaminLabel = detail.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'
  const tglLahir = new Date(detail.tanggal_lahir).toLocaleDateString('id-ID')

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={'Detail Pasien'}
          buttonGroup={
            permission?.kelola
              ? [
                  {
                    type: 'edit',
                    label: 'Edit',
                    onClick: () =>
                      navigate(`/modules/sim-rs/reference/patient/edit/${detail.id_pasien}`),
                  },
                ]
              : []
          }
        />

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Informasi Pasien</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">No Rekam Medis</p>
              <p className="text-base font-medium">{detail.no_rekam_medis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">NIK</p>
              <p className="text-base font-medium">{detail.nik}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama Lengkap</p>
              <p className="text-base font-medium">{detail.nama_lengkap}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempat Lahir</p>
              <p className="text-base font-medium">{detail.tempat_lahir}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal Lahir</p>
              <p className="text-base font-medium">{tglLahir}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jenis Kelamin</p>
              <p className="text-base font-medium">{jenisKelaminLabel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Golongan Darah</p>
              <p className="text-base font-medium">{detail.golongan_darah}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Agama</p>
              <p className="text-base font-medium">{detail.agama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status Perkawinan</p>
              <p className="text-base font-medium">{detail.status_perkawinan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pekerjaan</p>
              <p className="text-base font-medium">{detail.pekerjaan}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Alamat & Kontak</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="text-base font-medium">{detail.alamat}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No Telepon</p>
              <p className="text-base font-medium">{detail.no_telepon}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium">{detail.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Sumber Biaya Pengobatan</p>
          {detail.sumber_biaya_pengobatan.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada sumber biaya</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">No</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Sumber Biaya</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">No. Peserta</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.sumber_biaya_pengobatan.map((item, index) => (
                    <tr
                      key={item.id_pasien_sumber_pembiayaan}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{item.nama_sumber_biaya}</td>
                      <td className="py-3 px-4">{item.no_peserta ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Kontak Darurat</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Nama Kontak Darurat</p>
              <p className="text-base font-medium">{detail.kontak_darurat_nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telepon Kontak Darurat</p>
              <p className="text-base font-medium">{detail.telepon_kontak_darurat}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Kontak Darurat</p>
              <p className="text-base font-medium">{detail.email_kontak_darurat}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Informasi Sistem</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  detail.is_status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {detail.is_status ? 'Aktif' : 'Tidak Aktif'}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal Registrasi</p>
              <p className="text-base font-medium">
                {new Date(detail.tanggal_registrasi).toLocaleDateString('id-ID')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Diregistrasi Oleh</p>
              <p className="text-base font-medium">{detail.nama_user_created}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Terakhir Edit</p>
              <p className="text-base font-medium">
                {new Date(detail.updated_at).toLocaleDateString('id-ID')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Diedit Oleh</p>
              <p className="text-base font-medium">{detail.nama_user_updated}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPatient
