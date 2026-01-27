import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator.tsx'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel.tsx'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { UseGetManagementEditorNewsDetail } from '../hooks/index'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdOutlineHistory } from 'react-icons/md'
import ButtonProcessManagementEditor from '../component/buttonProcess.tsx'
import ButtonAgreeManagementEditor from '../component/buttonAggree.tsx'
import { ButtonRejectNewsManagementEditor } from '../component/buttonReject.tsx'

export const DetailNewsManagementEditorPage = () => {
  const { id } = useParams()
  const { managementEditorNewsDetail: detail } = UseGetManagementEditorNewsDetail(id ?? '')

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const images = detail?.berita_gambar_tambahan ?? []

  return (
    <>
      <ButtonTitleGroup
        label={'Detail Berita'}
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <>
                <div className={'flex items-center gap-2'}>
                  Status :{' '}
                  <p className="text-blue-600 font-semibold">
                    {detail?.status_publish?.split('_').join(' ')}
                  </p>
                  <Link
                    to={`/modules/editor/public-content/news/edit/${detail?.id_berita}`}
                  >
                    <Button
                      size={'sm'}
                      variant={'outline'}
                      className={'rounded border-green-600 text-green-600 hover:text-green-600'}
                    >
                      <HiPencil />
                      Edit Data
                    </Button>
                  </Link>
                  <Link
                    to={`/modules/editor/public-content/news/log/${detail?.id_berita}`}
                  >
                    <Button
                      size={'sm'}
                      variant={'outline'}
                      className={'rounded border-blue-500 text-blue-500 hover:text-blue-500'}
                    >
                      <MdOutlineHistory />
                      Log Data
                    </Button>
                  </Link>
                  {detail?.status_publish === 'DIAJUKAN_EDITOR' && (
                    <ButtonProcessManagementEditor {...(detail as any)} />
                  )}
                  {detail?.status_publish === 'PROSES_EDITOR' && (
                    <>
                      <ButtonAgreeManagementEditor {...(detail as any)} />
                      <ButtonRejectNewsManagementEditor {...(detail as any)} />
                    </>
                  )}
                </div>
              </>
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
              'bg-white/12 rounded-lg shadow p-10 flex items- h-full gap-x-12 justify-between'
            }
          >
            <div className="flex items-start gap-2 w-8/12 h-full">
              <div className="flex gap-5 flex-col justify-between items-start h-full">
                <div
                  className={
                    'bg-white p-2 rounded-full text-primary flex items-center px-4 gap-1.5 text-sm'
                  }
                >
                  <div className="size-3.5 rounded-full bg-yellow-500" />
                  <p>{detail?.nama_kategori_berita}</p>
                </div>
                <p className={'text-3xl font-semibold text-white'}>
                  STAIN MADINA Menggelar Kegiatan Microteaching di SMP Negeri 9 Medan
                </p>
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
            dangerouslySetInnerHTML={{ __html: detail?.isi_berita ?? '' }}
          />
        </div>
      </div>
    </>
  )
}
