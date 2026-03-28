import { UseGetChiefOfficerDetail } from '@/pages/modules/Pulsikom/about/chief-officer/hooks'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

export const OfficiallyData = () => {
  const { id } = useParams()
  const { detail } = UseGetChiefOfficerDetail((id as string) ?? '')
  console.log(detail)

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={`Lihat Pejabat - ${detail?.nama_kelompok}`}
          buttonGroup={[]}
        />
      </div>
    </>
  )
}
