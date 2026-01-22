import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { UseGetMainListService } from '@/pages/modules/website-unit/services/main/hooks'
import { AddMainService } from './component/AddMainService'
import { ButtonEditMainService } from './component/buttonEdit'
import { ButtonDeleteMainService } from '@/pages/modules/website-unit/services/main/component/buttonDelete.tsx'

export const MainServiceList = () => {
  const { mainService } = UseGetMainListService()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup label={'Layanan Utama'} buttonGroup={[]} />
        <div className="bg-blue-100 border-blue-500 p-1.5 border rounded-full flex items-center gap-1.5 text-blue-500 w-fit px-3 text-sm">
          <MdInfo />
          Layanan utama adalah layanan yang ditampilkan di beranda website. Maksimal 4 Layanan
        </div>

        <div className="grid grid-cols-4 gap-5 w-fit">
          {mainService?.map((item, index) => (
            <div key={index} className={'flex-col flex items-center gap-1.5'}>
              <div className="flex flex-col justify-center border-gray-300 rounded border p-5 items-center gap-1 size-[250px]">
                <img src={item?.gambar_layanan} alt="asd" className={'size-24 object-contain'} />
                <p className={'text-green-500 line-clamp-1'}>{item?.nama_layanan}</p>
                <p className={'line-clamp-3 text-center text-gray-500 text-sm'}>
                  {item?.uraian_layanan}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ButtonEditMainService data={item} />
                <ButtonDeleteMainService data={item} />
              </div>
            </div>
          ))}
          {mainService.length < 4 && <AddMainService />}
        </div>
      </div>
    </>
  )
}
