import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetUserManagementContext } from '../../hooks/index'
import { ColumnsUserManagement } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const UserManagementBook = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { userManagement, loading, meta } = UseGetUserManagementContext({
    context: 'pusat-buku-dan-media-masa',
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsUserManagement({
    context: 'pusat-buku-dan-media-masa',
  })

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          isBack
          label={'Pengelola - Pusat Buku dan Media Massa'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Pengelola - Pusat Buku dan Media Massa'}
                  valueGuide="LPPM_PUBLIKASI_BUKU_PUSAT_ANGGOTA"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Pengelola',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
        />

        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'w-[120px]'}
              name="limit"
              label="Jlh Data"
              options={[10, 25, 50, 100].map((item) => {
                return {
                  label: item.toString(),
                  value: item.toString(),
                }
              })}
            />
          }
          data={userManagement}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
