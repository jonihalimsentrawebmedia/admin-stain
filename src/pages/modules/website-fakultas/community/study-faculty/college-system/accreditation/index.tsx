import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetAccreditation } from './hooks/index.tsx'
import { AccreditationColumns } from './data/columns.tsx'
import ButtonAddAccreditationFaculty from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/component/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'
import Search from '@/components/common/table/Search.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const AccreditationFacultyCommunity = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { accreditation, loading, meta } = UseGetAccreditation({
    page,
    limit,
    search,
  })
  const columns = AccreditationColumns()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Akreditasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Akreditasi'}
                  valueGuide="FAKULTAS_KOMUNITAS_KULIAH_AKREDITASI"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddAccreditationFaculty />,
            },
          ]}
        />

        <Search
          onSearch={(e) => {
            const params = new URLSearchParams(searchParams)
            params.set('search', e)
            if (e === '') {
              params.delete('search')
            }
            setSearchParams(params.toString())
          }}
        />
        <TableCustom
          isShowFilter={false}
          data={accreditation}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
