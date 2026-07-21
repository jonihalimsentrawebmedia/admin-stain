import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailUser } from '../hooks/index.tsx'
import { format } from 'date-fns'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

const DetailUser = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading } = UseGetDetailUser(id ?? '')
  const permission = GuardCrud({ keys: 'DAFTAR_USER' })

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
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={'Detail User'}
          buttonGroup={
            permission?.kelola
              ? [
                  {
                    type: 'edit',
                    label: 'Edit',
                    onClick: () =>
                      navigate(`/modules/sim-rs/user-management/user-list/edit/${detail.id_user}`),
                  },
                ]
              : []
          }
        />

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Informasi User</p>
          {detail.gambar && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Foto Profil</p>
              <img
                alt={'image'}
                src={detail.gambar}
                className="size-32 object-contain rounded border"
              />
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Nama</p>
              <p className="text-base font-medium">{detail.nama_lengkap}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium">{detail.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No. Telepon</p>
              <p className="text-base font-medium">{detail.telepon ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jenis Kelamin</p>
              <p className="text-base font-medium">
                {detail.jenis_kelamin === 'L'
                  ? 'Laki-Laki'
                  : detail.jenis_kelamin === 'P'
                    ? 'Perempuan'
                    : '-'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Informasi Role</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-base font-medium">{detail.nama_role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Satuan Organisasi</p>
              <p className="text-base font-medium">{detail.nama_satuan_organisasi}</p>
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
                {format(new Date(detail.tanggal_registrasi), 'dd-MM-yyyy HH:mm')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Diregistrasi Oleh</p>
              <p className="text-base font-medium">{detail.nama_user_created}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Terakhir Edit</p>
              <p className="text-base font-medium">
                {format(new Date(detail.updated_at), 'dd-MM-yyyy HH:mm')}
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

export default DetailUser
