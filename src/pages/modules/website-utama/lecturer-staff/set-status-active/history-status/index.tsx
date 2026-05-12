import { UseGetHistoryStatusActive } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/hook'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetEmployeeById } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { ColumnsHistoryStatusActive } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const HistoryStatusPage = () => {
  const { id } = useParams()
  const { employee } = UseGetEmployeeById(id as string)
  const { historyStatusActive, meta, loading } = UseGetHistoryStatusActive({
    id_sdm: id as string,
  })
  const navigate = useNavigate()

  const columns = ColumnsHistoryStatusActive()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup label="Riwayat Status Aktif" buttonGroup={[]} />
        <p className="text-xl font-semibold text-green-500">Informasi Dosen / Staff</p>
        <div className="flex items-start gap-4">
          <img
            src={employee?.gambar_url}
            alt="image user"
            className={'w-[180px] h-[240px] object-cover'}
          />

          <div className="grid grid-cols-[12rem_1fr] gap-4">
            <p className="text-gray-500">Nama</p>
            <p>{employee?.nama}</p>
            <p className="text-gray-500">NIK</p>
            <p>{employee?.nik}</p>
            <p className="text-gray-500">NIP</p>
            <p>{employee?.nip}</p>
            <p className="text-gray-500">Golongan</p>
            <p>{employee?.nama_pangkat_golongan}</p>
            <p className="text-gray-500">Unit Kerja</p>
            <p>{employee?.nama_unit_kerja}</p>
            <p className="text-gray-500">Status</p>
            <p>{employee?.nama_status}</p>
          </div>
        </div>

        <ButtonTitleGroup
          label={'Riwayat Status Aktif'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Status',
              onClick: () => navigate(`add`),
            },
          ]}
        />
        <TableCustom columns={columns} data={historyStatusActive} loading={loading} meta={meta} />
      </div>
    </>
  )
}
