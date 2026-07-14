import { Outlet } from 'react-router-dom'
import Menu from './Menu'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetDetailFaculty from '../../controller/useGetDetailFaculty'

interface Props {
  title?: string
}

const LayoutFaculty = (props: Props) => {
  const { title = 'Program Studi' } = props
  const { detailFaculty } = useGetDetailFaculty()

  return (
    <div className="space-y-8">
      <ButtonTitleGroup buttonGroup={[]} label={`Detail ${title}`} isBack />
      <div className="flex gap-4 flex-col">
        <div>
          <div>
            <div className="text-[#999999] text-sm">{title}</div>
            <div className="text-green-600 font-medium text-3xl">{detailFaculty?.nama}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 h-full relative w-full">
        <Menu />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LayoutFaculty
