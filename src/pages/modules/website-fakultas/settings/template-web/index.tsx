import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsTemplateWebsite } from './data/columns.tsx'
import { UseGetTemplateFaculty } from './hooks/index.tsx'

export const TemplateWebFacultySettings = () => {
  const { template, loading } = UseGetTemplateFaculty()
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

        <TableCustom data={template} columns={columns} loading={loading} />
      </div>
    </>
  )
}
