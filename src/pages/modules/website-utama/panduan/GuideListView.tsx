import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonAddGuide from './components/ButtonAddGuide'
import TableCustom from '@/components/common/table/TableCustom'
import GuideListViewModel from './GuideListViewModel'
import { UseGetListGuide } from './hooks'
import Cookies from 'js-cookie'

const GuideListView = () => {
  const { columns } = GuideListViewModel()
  const {listGuide,loading}=UseGetListGuide()
  const title=Cookies.get('title-guide')
  return (
    <div className='flex flex-col gap-4'>
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: <ButtonAddGuide />,
          },
        ]}
        label={`Panduan ${title}`}
        isBack
      />
      <TableCustom loading={loading}  columns={columns} data={listGuide} isShowFilter={false} isShowPagination={false} />
    </div>
  )
}

export default GuideListView
