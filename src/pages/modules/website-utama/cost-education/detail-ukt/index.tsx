import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetUktByEntranceProdi } from '@/pages/modules/website-utama/cost-education/detail-ukt/hooks'
import { useParams } from 'react-router-dom'

export const DetailUktByEntrance = () => {
  const { idUkt } = useParams()
  const { listPriceUkt } = UseGetUktByEntranceProdi(idUkt as string)
  console.log(listPriceUkt)
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup isBack label={'Lihat UKT'} buttonGroup={[]} />
        <p className="text-gray-500">Belum ada Jalur Masuk</p>
      </div>
    </>
  )
}
