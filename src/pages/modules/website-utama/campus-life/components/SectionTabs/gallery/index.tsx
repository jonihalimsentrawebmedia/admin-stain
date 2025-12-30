import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useState } from 'react'
import { VideoSectionCampusLife } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/video/videoSection.tsx'
import { PhotoSection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/photo/photoSection.tsx'

export const GallerySection = () => {
  const DataTabs = [
    { id: 1, name: 'Video', value: 'video', element: <VideoSectionCampusLife /> },
    { id: 2, name: 'Foto', value: 'foto', element: <PhotoSection /> },
  ]

  const [tabsActive, setTabsActive] = useState('video')

  return (
    <>
      <p className={'pb-5 text-2xl font-semibold capitalize'}>Gallery - {tabsActive}</p>

      <TabsListCustom data={DataTabs} value={tabsActive} onChange={setTabsActive} />
    </>
  )
}
