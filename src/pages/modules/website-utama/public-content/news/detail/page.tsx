import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetNewsDetail } from '@/pages/modules/website-utama/public-content/news/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { Separator } from '@/components/ui/separator.tsx'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ButtonSubmissionNews } from '@/pages/modules/website-utama/public-content/news/components/buttonSubmission.tsx'

export const DetailNewsPage = () => {
  const { id } = useParams()
  const { detailNews } = UseGetNewsDetail(id ?? '')
  const navigate = useNavigate()

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const images = detailNews?.berita_gambar_tambahan ?? []

  return (
    <>
      <ButtonTitleGroup
        label={'Detail Berita'}
        buttonGroup={[
          {
            type: 'edit',
            label: 'Edit Data',
            onClick: () => {},
            element: (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm">Status :</span>
                <p className="text-blue-600 font-semibold text-sm capitalize">
                  {detailNews?.status_publish?.split('_').join(' ')}
                </p>
                <Button
                  onClick={() =>
                    navigate(
                      `/modules/website-utama/public-content/news/edit/${detailNews?.id_berita}?from=detail`
                    )
                  }
                  className={'border-primary text-primary hover:text-primary'}
                  variant={'outline'}
                  size={'sm'}
                >
                  <HiPencil /> Edit Data
                </Button>
              </div>
            ),
          },
          {
            type: 'save',
            label: 'Edit Data',
            onClick: () => {},
            element:
              detailNews?.status_publish === 'DRAFT' ? (
                <ButtonSubmissionNews {...detailNews} />
              ) : (
                <></>
              ),
          },
        ]}
        isBack={true}
      />
      <Separator className={'my-5'} />

      <div className="p-3 sm:p-5">
        <div className="bg-gradient-to-r p-4 sm:p-8 from-[#3FA936] to-[#0C6939] rounded-lg shadow">
          <div className="bg-white/12 rounded-lg shadow p-4 sm:p-10 flex flex-col lg:flex-row items-start gap-6 lg:gap-x-12 lg:justify-between">
            <div className="flex items-start gap-2 w-full lg:w-1/2">
              <div className="flex gap-4 sm:gap-5 flex-col justify-between items-start w-full">
                <div className="bg-white p-2 rounded-full text-primary flex items-center px-4 gap-1.5 text-xs sm:text-sm">
                  <div className="size-3 rounded-full bg-yellow-500" />
                  <p>{detailNews?.nama_kategori_berita}</p>
                </div>
                <p className="text-xl sm:text-3xl font-semibold text-white leading-tight">
                  {detailNews?.judul ?? ''}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5 w-full">
                  <div>
                    <p className="text-white/80 text-xs sm:text-sm">Tanggal Terbit</p>
                    <p className="text-white text-sm sm:text-base font-medium">
                      {detailNews?.diterbitkan_at
                        ? format(detailNews?.diterbitkan_at, 'dd MMMM yyyy')
                        : '--:--:--'}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs sm:text-sm">Ditulis Oleh</p>
                    <p className="text-white text-sm sm:text-base font-medium">
                      {detailNews?.penulis ?? ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[484px] mx-auto">
              {/* CAROUSEL */}
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent className="pr-0">
                  {images.map((item, index) => (
                    <CarouselItem key={index} className="pr-0">
                      <img
                        src={item.gambar}
                        alt={item.keterangan}
                        className="h-48 sm:h-[345px] w-full object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* DOTS */}
              <div className="flex justify-center mt-3 sm:mt-4 gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={[
                      'h-2.5 sm:h-3 rounded-full transition-all',
                      current === index ? 'bg-green-600 w-2.5 sm:w-3' : 'bg-gray-400 w-2.5 sm:w-3',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-5">
          <div
            className={'space-y-5'}
            dangerouslySetInnerHTML={{ __html: detailNews?.isi_berita ?? '' }}
          />
        </div>
      </div>
    </>
  )
}
