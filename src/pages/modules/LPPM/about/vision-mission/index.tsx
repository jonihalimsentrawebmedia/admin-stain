import { useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetProfileVisionMission } from '@/pages/modules/LPPM/about/vision-mission/hooks'
import { FormVisionMission } from '@/pages/modules/LPPM/about/vision-mission/component/form.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const VisionMissionAbout = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { visionMission } = UseGetProfileVisionMission()

  return (
    <>
      {isEdit ? (
        <>
          <FormVisionMission isEdit={isEdit} setIsEdit={setIsEdit} data={visionMission} />
        </>
      ) : (
        <>
          <div className={'mt-5'}>
            <ButtonTitleGroup
              label={'Visi & Misi'}
              buttonGroup={[
                {
                  type: 'edit',
                  label: 'Edit Konten',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />

            <div className="flex flex-col gap-5 mt-5">
              <p className="text-yellow-500">Visi</p>
              <div className="flex items-start gap-x-5">
                {visionMission?.url_gambar_visi && (
                  <img
                    src={visionMission?.url_gambar_visi}
                    alt="visi"
                    className={'size-[240px] w-[240px]'}
                  />
                )}
                <RenderHTMLContent content={visionMission?.visi ?? ''} />
              </div>

              <p className="text-yellow-500">Misi</p>
              <div className="flex items-start gap-x-5">
                {visionMission?.url_gambar_misi && (
                  <img
                    src={visionMission?.url_gambar_misi}
                    alt="visi"
                    className={'size-[240px] w-[240px]'}
                  />
                )}
                <RenderHTMLContent content={visionMission?.misi ?? ''} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
