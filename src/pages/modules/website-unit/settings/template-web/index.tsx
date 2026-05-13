import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsTemplateWebsite } from './data/columns.tsx'
import { UseGetTemplateUnit } from './hooks/index.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'

export const TemplateWebSettings = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { templateUnit, loading } = UseGetTemplateUnit({
    page,
    limit,
    search,
  })
  const columns = ColumnsTemplateWebsite()
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Template Website'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide="Template Website" valueGuide="THEME" />,
            },
          ]}
        />
        <div
          className={`text-blue-500 w-fit p-1.5 text-sm border border-blue-500 rounded-md flex items-center gap-1.5`}
        >
          <MdInfo />
          Pilih template yang ingin anda gunakan untuk website anda.
        </div>

        <TableCustom isShowFilter={false} data={templateUnit} columns={columns} loading={loading} />
      </div>
    </>
  )
}
