import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { UseGetUserManagementContext } from '@/pages/modules/LPPM/publication-hki/book/hooks'
import { ColumnsUserManagement } from '@/pages/modules/LPPM/publication-hki/book/book-center/manangement/data/columns.tsx'

export const UserManagementHKI = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { userManagement, loading, meta } = UseGetUserManagementContext({
    context: 'pusat-hki',
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsUserManagement({
    context: 'pusat-hki',
  })

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          isBack
          label={'Pengelola - Pusat KI & Layanan Teknis'}
          buttonGroup={[
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
