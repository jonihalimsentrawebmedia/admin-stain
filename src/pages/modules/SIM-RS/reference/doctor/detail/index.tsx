import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailDoctor } from '../hooks/index.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

const DetailDoctor = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading } = UseGetDetailDoctor(id ?? '')
  const permission = GuardCrud({ keys: 'DOKTER' })

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

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={'Detail Dokter'}
          buttonGroup={
            permission?.kelola
              ? [
                  {
                    type: 'edit',
                    label: 'Edit',
                    onClick: () =>
                      navigate(`/modules/sim-rs/reference/doctor/edit/${detail.id_dokter}`),
                  },
                ]
              : []
          }
        />

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Informasi Dokter</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Nama Dokter</p>
              <p className="text-base font-medium">{detail.nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No SIP</p>
              <p className="text-base font-medium">{detail.no_sip}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Spesialis</p>
              <p className="text-base font-medium">{detail.nama_spesialis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Poli</p>
              <p className="text-base font-medium">
                {detail.daftar_poli
                  ?.map((p: { id_poli: string; nama_poli: string }) => p.nama_poli)
                  .join(', ')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jenis Kelamin</p>
              <p className="text-base font-medium">{jenisKelaminLabel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telepon</p>
              <p className="text-base font-medium">{detail.telepon}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium">{detail.email}</p>
            </div>
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
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Informasi Sistem</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

export default DetailDoctor
