import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useState } from 'react'
import { VideoSectionCampusLife } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/video/videoSection.tsx'
import { PhotoSection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/photo/photoSection.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const GallerySection = () => {
  const DataTabs = [
    { id: 1, name: 'Video', value: 'video', element: <VideoSectionCampusLife /> },
    { id: 2, name: 'Foto', value: 'foto', element: <PhotoSection /> },
  ]

  const [tabsActive, setTabsActive] = useState('video')

  return (
    <>
      <div className="flex pb-5  items-center gap-4 justify-between">
        <p className={'text-2xl font-semibold capitalize'}>Gallery - {tabsActive}</p>

        <ButtonGoToGuide
          valueGuide={
            tabsActive == 'video'
              ? 'WEBSITE_UTAMA_KEHIDUPAN_KAMPUS_GALERI_VIDEO'
              : 'WEBSITE_UTAMA_KEHIDUPAN_KAMPUS_GALERI_FOTO'
          }
        />
      </div>

      <TabsListCustom data={DataTabs} value={tabsActive} onChange={setTabsActive} />
    </>
  )
}
