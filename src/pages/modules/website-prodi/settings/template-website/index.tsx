import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { UseGetTemplateProdi } from '@/pages/modules/website-prodi/settings/template-website/hooks'
import { ColumnsTemplateWebsite } from '@/pages/modules/website-prodi/settings/template-website/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const TemplateWebsite = () => {
  const { templateProdi, loading, meta } = UseGetTemplateProdi()
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

        <TableCustom data={templateProdi} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
