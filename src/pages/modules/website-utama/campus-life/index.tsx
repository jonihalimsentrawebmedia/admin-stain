import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useEffect } from 'react'
import { SectionIntroduction } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/Introduction.tsx'
import { FacilitiesSection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/facilities.tsx'
import { LifeActivitySection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/lifeActivity.tsx'
import { PerformanceSection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/performance.tsx'
import { TestimonialSection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/testimonial.tsx'
import { GallerySection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery'
import { UrlDirectionSection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/urlDirection.tsx'

const CampusLifePage = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const statusParams = searchParams.get('status')

  useEffect(() => {
    if (!statusParams) {
      setSearchParams({ status: 'pengantar' })
    }
  }, [statusParams])

  const DataTabs = [
    { id: 1, name: 'Pengantar', value: 'pengantar', element: <SectionIntroduction /> },
    { id: 2, name: 'fasilitas', value: 'fasilitas', element: <FacilitiesSection /> },
    { id: 3, name: 'Unit Kegiatan Mahasiswa', value: 'ukm', element: <LifeActivitySection /> },
    { id: 4, name: 'Prestasi', value: 'prestasi', element: <PerformanceSection /> },
    { id: 5, name: 'Testimoni', value: 'testimoni', element: <TestimonialSection /> },
    { id: 6, name: 'Galeri', value: 'galery', element: <GallerySection /> },
    { id: 7, name: 'Link Arahan', value: 'link', element: <UrlDirectionSection /> },
  ]

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Kehidupan Kampus'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('background')}
                  variant={'outline'}
                  className={'border border-primary text-primary hover:text-primary'}
                >
                  <IoMdImage />
                  Gambar Background
                </Button>
              ),
            },
          ]}
        />

        <TabsListCustom
          value={statusParams ?? 'pengantar'}
          onChange={(e) => {
            setSearchParams({ status: e })
          }}
          data={DataTabs}
        />
      </div>
    </>
  )
}

export default CampusLifePage
