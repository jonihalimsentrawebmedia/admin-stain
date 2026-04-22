import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddPublication from '@/pages/modules/website-utama/publication/component/buttonAdd.tsx'
import { UseGetYearPublication } from '@/pages/modules/website-utama/publication/hooks'
import { ColumnsPublication } from '@/pages/modules/website-utama/publication/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../panduan/components/ButtonGoToGuide'

const PublicationPage = () => {
  const { meta, loading, year } = UseGetYearPublication()
  const columns = ColumnsPublication()

  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide="Publikasi" valueGuide="WEBSITE_UTAMA_PUBLIKASI" />
              ),
            },
            { type: 'custom', element: <ButtonAddPublication /> },
          ]}
          label="Publikasi"
        />
        <TableCustom columns={columns} data={year} loading={loading} meta={meta} />
      </div>
    </>
  )
}
export default PublicationPage
