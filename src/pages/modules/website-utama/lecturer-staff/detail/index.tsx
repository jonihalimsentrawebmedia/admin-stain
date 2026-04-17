import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetEmployeeById } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { format } from 'date-fns'

const DetailEmployee = () => {
  const { id } = useParams()
  const { employee } = UseGetEmployeeById(id as string)
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/website-utama/staff-lecturer/data/edit/${id}`),
            },
          ]}
          label="Detail Data Dosen & Staff"
        />

        <p className="text-primary text-xl font-semibold">Informasi Pribadi</p>

        <div className="flex items-start gap-x-8">
          <img
            src={employee?.gambar_url}
            alt="gambar"
            className="w-[220px] h-[300px] rounded-md object-cover"
          />

          <div className={'grid grid-cols-2 gap-4'}>
            <p className="text-gray-500">Nama</p>
            <p>{employee?.nama}</p>
            <p className="text-gray-500">NIK</p>
            <p>{employee?.nik}</p>
            <p className="text-gray-500">Tempat Lahir</p>
            <p>{employee?.tanggal_lahir}</p>
            <p className="text-gray-500">Tanggal Lahir</p>
            <p>{employee?.tanggal_lahir ? format(employee?.tanggal_lahir, 'dd-MM-yyy') : ''}</p>
            <p className="text-gray-500">No. HP</p>
            <p>{employee?.no_hp}</p>
            <p className="text-gray-500">Email</p>
            <p>{employee?.email}</p>
          </div>
        </div>

        <p className="text-primary text-xl font-semibold mt-5">Informasi Kepegawaian</p>
        <div className={'grid grid-cols-2 gap-4'}>
          <p className="text-gray-500">Status</p>
          <p>{employee?.nama_status}</p>
          <p className="text-gray-500">NIP</p>
          <p>{employee?.nip}</p>
          <p className="text-gray-500">NIDN</p>
          <p>{employee?.nidn}</p>
          <p className="text-gray-500">Unit Kerja</p>
          <p>{employee?.unit_kerja}</p>
          <p className="text-gray-500">Golongan</p>
          <p>{employee?.golongan}</p>
          <p className="text-gray-500">Jabatan Struktural</p>
          <p>{employee?.jabatan_struktural}</p>
        </div>
      </div>
    </>
  )
}

export default DetailEmployee
