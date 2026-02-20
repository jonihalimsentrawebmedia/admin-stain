import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import SettingTemplateServiceViewModel from './SettingTemplateServiceViewModel'
import { IoInformationCircle } from 'react-icons/io5'
import TableCustom from '@/components/common/table/TableCustom'
import useGetTemplatePPID from './controller/useGetTemplatePPID'

const SettingTemplateServiceView = () => {
  const { columns } = SettingTemplateServiceViewModel()
  const { loading, template } = useGetTemplatePPID({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Template Website" />

      <div className="flex gap-2 items-center w-fit px-2 py-1 text-[#2769CD] border border-[#2769CD] rounded">
        <IoInformationCircle className="size-4" />
        <div>Pilih template yang ingin anda gunakan untuk website anda.</div>
      </div>

      <TableCustom
        columns={columns}
        data={template}
        loading={loading}
        isShowFilter={false}
        isShowPagination={false}
      />
    </div>
  )
}

export default SettingTemplateServiceView
