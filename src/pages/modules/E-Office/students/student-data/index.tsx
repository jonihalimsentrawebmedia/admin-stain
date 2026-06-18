import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi'
import { UseGetStudentData, UseGetYearLevel } from './hooks'
import { ColumnsStudentData } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'
import { UseGetAdmissionProcess } from '@/pages/modules/E-Office/students/admission-process/hooks'

const ListStudentData = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const angkatan = searchParams.get('angkatan') ?? ''
  const id_jalur_masuk = searchParams.get('id_jalur_masuk') ?? ''

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
