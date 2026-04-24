import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsTemplateWebsite } from './data/columns.tsx'
import { UseGetTemplateUnit } from './hooks/index.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const TemplateWebCarrierSettings = () => {
  const { templateUnit, loading } = UseGetTemplateUnit()
  const columns = ColumnsTemplateWebsite()
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Template Website'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Template Website'}
                  valueGuide="THEMA"
                />
              ),
            },
          ]}
        />
        <div
          className={`text-blue-500 w-fit p-1.5 text-sm border border-blue-500 rounded-md flex items-center gap-1.5`}
        >
          <MdInfo />
          Pilih template yang ingin anda gunakan untuk website anda.
        </div>

        <TableCustom data={templateUnit} columns={columns} loading={loading} />
      </div>
    </>
  )
}
