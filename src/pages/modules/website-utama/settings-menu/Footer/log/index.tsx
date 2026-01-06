import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetFooterLog } from '@/pages/modules/website-utama/settings-menu/Footer/hooks'
import { FooterColumns } from '@/pages/modules/website-utama/settings-menu/Footer/data/columns.tsx'

export const LogFooterContent = () => {
  const { footerLog } = UseGetFooterLog()
  const columns = FooterColumns()

  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <p className="text-primary mt-5">History Perubahan Data</p>

      <TableCustom data={footerLog} columns={columns} />
    </>
  )
}
