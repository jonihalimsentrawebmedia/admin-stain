import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { UseGetDoctorSchedule } from '../hooks/index.tsx'
import { ButtonAddJadwal } from '../component/buttonAddJadwal.tsx'
import { ButtonEditJadwal } from '../component/buttonEditJadwal.tsx'
import { ButtonDeleteJadwal } from '../component/buttonDeleteJadwal.tsx'

const DetailJadwalDokter = () => {
  const { id } = useParams<{ id: string }>()
  const { detail, loading } = UseGetDoctorSchedule(id ?? '')

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
          label={'Detail Jadwal Dokter'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide={'Detail Jadwal Dokter'} valueGuide="SIM_RS_SCHEDULE" />
              ),
            },
          ]}
        />

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Informasi Dokter</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Nama</p>
              <p className="text-base font-medium">{detail.nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jenis Kelamin</p>
              <p className="text-base font-medium">{jenisKelaminLabel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Spesialisasi</p>
              <p className="text-base font-medium">{detail.nama_spesialis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No. SIP</p>
              <p className="text-base font-medium">{detail.no_sip}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <p className="text-lg font-semibold text-primary mb-4">Kontak</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Telepon</p>
              <p className="text-base font-medium">{detail.telepon}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium">{detail.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-primary">Daftar Jadwal</p>
            <ButtonAddJadwal id_dokter={detail.id_dokter} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={'bg-primary'}>
                <tr className="border-b text-left hover:bg-primary">
                  <th className="p-1.5 font-medium text-white w-12">#</th>
                  <th className="p-1.5 font-medium text-white">Hari</th>
                  <th className="p-1.5 font-medium text-white">Jam Mulai</th>
                  <th className="p-1.5 font-medium text-white">Jam Selesai</th>
                  <th className="p-1.5 font-medium text-white w-24" />
                </tr>
              </thead>
              <tbody>
                {detail.jadwal_dokter?.map((item, index) => (
                  <tr key={item.id_jadwal_dokter} className="border-b last:border-b-0">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{item.nama_hari}</td>
                    <td className="p-2">{item.jam_mulai}</td>
                    <td className="p-2">{item.jam_selesai}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <ButtonEditJadwal data={item} id_dokter={detail.id_dokter} />
                        <ButtonDeleteJadwal data={item} id_dokter={detail.id_dokter} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailJadwalDokter
