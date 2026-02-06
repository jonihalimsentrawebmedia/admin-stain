import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { UseGetTemplateProdi } from '@/pages/modules/website-prodi/settings/template-website/hooks'
import { ColumnsTemplateWebsite } from '@/pages/modules/website-prodi/settings/template-website/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const TemplateWebsite = () => {
  const { templateProdi, loading } = UseGetTemplateProdi()
  const columns = ColumnsTemplateWebsite()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup label={'Template Website'} buttonGroup={[]} />

        <div
          className={`text-blue-500 w-fit p-1.5 text-sm border border-blue-500 rounded-md flex items-center gap-1.5`}
        >
          <MdInfo />
          Pilih template yang ingin anda gunakan untuk website anda.
        </div>

        <TableCustom data={templateProdi} columns={columns} loading={loading} />
      </div>
    </>
  )
}
