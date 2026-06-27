import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi'
import { UseGetStudentData, UseGetYearLevel } from './hooks'
import { ColumnsStudentData } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'
import { UseGetAdmissionProcess } from '@/pages/modules/E-Office/students/admission-process/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'

const ListStudentData = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const angkatan = searchParams.get('angkatan') ?? ''
  const id_jalur_masuk = searchParams.get('id_jalur_masuk') ?? ''
  const id_fakultas = searchParams.get('id_fakultas') ?? ''
  const id_prodi = searchParams.get('id_prodi') ?? ''

  const columns = ColumnsStudentData()
  const navigate = useNavigate()
  const { yearLevel } = UseGetYearLevel()
  const { admissionProcess } = UseGetAdmissionProcess({ page: '0', limit: '0' })
  const { loading, studentData, meta } = UseGetStudentData({
    limit,
    page,
    search,
    angkatan,
    id_jalur_masuk,
    id_fakultas,
    id_prodi: id_prodi,
  })
  const { institution } = UseGetUnitInstitution({
    kelompok: 'FAKULTAS',
  })
  const { institution: prodi } = UseGetUnitInstitution({
    kelompok: 'PRODI',
    parent_id: id_fakultas,
  })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Data Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Link to={'import'}>
                  <Button className="rounded-full text-primary border-primary" variant="outline">
                    <BiPlus />
                    Import Data Mahasiswa
                  </Button>
                </Link>
              ),
            },
            {
              type: 'custom',
              element: (
                <Button onClick={() => navigate('add')} className={'rounded-full text-white'}>
                  <BiPlus />
                  Tambah Mahasiswa
                </Button>
              ),
            },
          ]}
        />

        <div className="flex items-center gap-4 w-full">
          <FilterSelect
            className={'w-full'}
            label={'Fakultas'}
            placeholder={'Fakultas'}
            data={
              institution?.map((row) => ({
                label: row.nama,
                value: row.id_satuan_organisasi,
              })) ?? []
            }
            name={'id_fakultas'}
          />
          <FilterSelect
            className={'w-full'}
            label={'Program Studi'}
            placeholder={'Program Studi'}
            data={
              prodi?.map((row) => ({
                label: row.nama,
                value: row.id_satuan_organisasi,
              })) ?? []
            }
            name={'id_prodi'}
          />
          <FilterSelect
            className={'w-full'}
            label={'Angkatan'}
            placeholder={'Angkatan'}
            data={yearLevel?.map((row) => ({
              label: row.toString(),
              value: row.toString(),
            }))}
            name={'angkatan'}
          />
          <FilterSelect
            className={'w-full'}
            label={'Jalur Masuk'}
            placeholder={'Jalur Masuk'}
            data={admissionProcess?.map((row) => ({
              label: row?.nama,
              value: row?.id_mahasiswa_jalur_masuk,
            }))}
            name={'id_jalur_masuk'}
          />
        </div>

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={studentData}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default ListStudentData
