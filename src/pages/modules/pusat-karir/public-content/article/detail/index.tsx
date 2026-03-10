import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { Separator } from '@/components/ui/separator.tsx'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { UseGetCarrierArticleDetail } from '../hooks/index'
import { ButtonSubmissionArticle } from '../components/buttonSubmission'

export const DetailArticleCarrierPage = () => {
  const { id } = useParams()
  const { unitNewsDetail: detail } = UseGetCarrierArticleDetail(id ?? '')
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

  const images = detail?.artikel_gambar_tambahan ?? []

  return (
    <>
      <ButtonTitleGroup
        label={'Detail Berita'}
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <div className={'flex items-center gap-2'}>
                Status :{' '}
                <p className="text-blue-600 font-semibold">
                  {detail?.status_publish?.split('_').join(' ')}
                </p>
                <Button
                  onClick={() =>
                    navigate(
                      `/modules/pusat-karir/public-content/article/edit/${detail?.id_artikel}`
                    )
                  }
                  className={'border-primary text-primary hover:text-primary'}
                  variant={'outline'}
                >
                  <HiPencil /> Edit Data
                </Button>
              </div>
            ),
          },
          {
            type: 'edit',
            label: 'Edit Data',
            onClick: () => {
              navigate(`/modules/pusat-karir/public-content/article/edit/${detail?.id_artikel}`)
            },
            element:
              detail?.status_publish === 'DRAFT' ? (
                <ButtonSubmissionArticle {...(detail as any)} />
              ) : (
                <></>
              ),
          },
        ]}
        isBack={true}
      />
      <Separator className={'my-5'} />

      <div className="p-5">
        <div className="bg-gradient-to-r p-8 from-[#3FA936] to-[#0C6939] rounded-lg shadow">
          <div
            className={
              'bg-white/12 rounded-lg shadow p-10 flex items- h-full gap-x-12 justify-between'
            }
          >
            <div className="flex items-start gap-2 w-8/12 h-full">
              <div className="flex gap-5 flex-col justify-between items-start h-full">
                <p className={'text-3xl font-semibold text-white'}>{detail?.judul}</p>
                <div className="flex items-center justify-between gap-5 w-full">
                  <div>
                    <p className="text-white">Tanggal Terbit</p>
                    <p className={'text-white'}>
                      {detail?.diterbitkan_at
                        ? format(detail?.diterbitkan_at, 'dd MMMM yyyy')
                        : '--:--:--'}
                    </p>
                  </div>
                  <div>
                    <p className="text-white">Ditulis Oleh</p>
                    <p className={'text-white'}>{detail?.penulis ?? ''}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-4/12 mx-auto">
              {/* CAROUSEL */}
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent className="pr-0">
                  {images.map((item, index) => (
                    <CarouselItem key={index} className="pr-0">
                      <img
                        src={item.gambar}
                        alt={item.keterangan}
                        className="h-[345px] w-full object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* DOTS */}
              <div className="flex justify-center mt-4 gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={[
                      'h-3 rounded-full transition-all',
                      current === index ? 'bg-green-600 w-3' : 'bg-gray-400 w-3',
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
            dangerouslySetInnerHTML={{ __html: detail?.isi_artikel ?? '' }}
          />
        </div>
      </div>
    </>
  )
}
