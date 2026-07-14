import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdSend } from 'react-icons/md'
import { Separator } from '@/components/ui/separator.tsx'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { UseGetDetailNewsProdi } from '@/pages/modules/website-utama/program-studi/detail/controller/useGetNews.tsx'

export const DetailNewsProdiPage = () => {
  const { id, detail_id } = useParams()
  const { detailNews } = UseGetDetailNewsProdi(id ?? '', detail_id ?? '')
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
    <div className={'mt-5'}>
      <ButtonTitleGroup
        label={'Detail Berita'}
        buttonGroup={[
          {
            type: 'edit',
            label: 'Edit Data',
            onClick: () => {},
            element: (
              <div className={'flex items-center gap-2'}>
                Status :{' '}
                <p className="text-blue-600 font-semibold">
                  {detailNews?.status_publish?.split('_').join(' ')}
                </p>
                <Button
                  onClick={() =>
                    navigate(
                      `/modules/website-utama/public-content/news/edit/${detailNews?.id_berita}`
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
            type: 'save',
            label: 'Edit Data',
            onClick: () => {},
            element:
              detailNews?.status_publish !== 'DIAJUKAN_EDITOR' ? (
                <div className={'flex items-center gap-1.5 border-l border-gray-500 pl-2'}>
                  <Button>
                    <MdSend /> Ajukan Ke Editor
                  </Button>
                </div>
              ) : (
                <></>
              ),
          },
        ]}
        isBack={true}
      />
      <Separator className={'my-5'} />

      <div className="p-5">
        <div className="bg-linear-to-r p-8 from-[#3FA936] to-[#0C6939] rounded-lg shadow">
          <div
            className={
              'bg-white/12 rounded-lg shadow p-4 lg:p-10 flex flex-col lg:flex-row items-start h-full gap-6 lg:gap-x-12 justify-between'
            }
          >
            <div className="flex items-start gap-2 w-full lg:w-1/2 h-full">
              <div className="flex gap-5 flex-col justify-between items-start h-full">
                <div
                  className={
                    'bg-white p-2 rounded-full text-primary flex items-center px-4 gap-1.5 text-sm'
                  }
                >
                  <div className="size-3.5 rounded-full bg-yellow-500" />
                  <p>{detailNews?.nama_kategori_berita}</p>
                </div>
                <p className={'text-xl lg:text-3xl font-semibold text-white'}>{detailNews?.judul}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5 w-full">
                  <div>
                    <p className="text-white">Tanggal Terbit</p>
                    <p className={'text-white'}>
                      {detailNews?.diterbitkan_at
                        ? format(detailNews?.diterbitkan_at, 'dd MMMM yyyy')
                        : '--:--:--'}
                    </p>
                  </div>
                  <div>
                    <p className="text-white">Ditulis Oleh</p>
                    <p className={'text-white'}>{detailNews?.penulis ?? ''}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[484px] mx-auto">
              {/* CAROUSEL */}
              <Carousel setApi={setApi} className="w-full max-w-[484px]">
                <CarouselContent className="pr-0">
                  {images.map((item: any, index: number) => (
                    <CarouselItem key={index} className="pr-0">
                      <img
                        src={item.gambar}
                        alt={item.keterangan}
                        className="h-48 lg:h-[345px] w-full object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* DOTS */}
              <div className="flex justify-center mt-3 lg:mt-4 gap-2">
                {images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={[
                      'h-2.5 lg:h-3 rounded-full transition-all',
                      current === index ? 'bg-green-600 w-2.5 lg:w-3' : 'bg-gray-400 w-2.5 lg:w-3',
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
    </div>
  )
}
