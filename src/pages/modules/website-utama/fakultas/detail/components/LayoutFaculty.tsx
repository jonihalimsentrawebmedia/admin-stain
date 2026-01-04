import { Outlet} from 'react-router-dom'
import Menu from './Menu'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetDetailFaculty from '../../controller/useGetDetailFaculty'

const LayoutFaculty = () => {

  const { detailFaculty } = useGetDetailFaculty()

  return (
    <div className="space-y-8">
      <ButtonTitleGroup buttonGroup={[]} label="Detail Program Studi" isBack />
      <div className="flex gap-4 flex-col">
        <div>
          <div>
            <div className="text-[#999999] text-sm">Program Studi</div>
            <div className="text-green-600 font-medium text-3xl">{detailFaculty?.nama}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 h-full relative w-full">
        <Menu />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LayoutFaculty
