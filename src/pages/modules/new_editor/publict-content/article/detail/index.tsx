import { Link, useParams } from 'react-router-dom'
import { UseGetArticleManagementEditorDetail } from '../hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { Separator } from '@/components/ui/separator.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { FaRegCalendarAlt, FaUser } from 'react-icons/fa'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel.tsx'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { MdOutlineHistory } from 'react-icons/md'
import ButtonProcessManagementEditor from '../component/buttonProcess'
import ButtonAgreeManagementEditor from '../component/buttonAggree'
import { ButtonRejectAgendaManagementEditor } from '../component/buttonReject'

export const DetailArticlePage = () => {
  const { id: ID } = useParams()
  const { articleDetail: detail, loading } = UseGetArticleManagementEditorDetail(ID ?? '')

  const images = detail?.artikel_gambar_tambahan ?? []

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <>
      <div className={'flex flex-col gap-y-4'}>
        {/* HEADER */}
        <ButtonTitleGroup
          label={'Detail Artikel'}
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
                      to={`/modules/editor/public-content/article/edit/${detail?.id_artikel}`}
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
                    <Link to={`/modules/editor/public-content/artikel/log/${detail?.id_artikel}`}>
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
                        <ButtonRejectAgendaManagementEditor {...(detail as any)} />
                      </>
                    )}
                  </div>
                </>
              ),
            },
          ]}
          isBack
        />
        <Separator />

        {/* CARD */}
        <Card className={'bg-[#F5F8FF]'}>
          <CardContent>
            <div className="flex items-center gap-5">
              {/* LEFT CONTENT */}
              <div className="w-8/12">
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <div className="grid grid-cols-[12rem_1fr] gap-y-2.5">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-semibold">{detail?.judul}</p>
                    <div className="grid-cols-[12rem_1fr] items-center mt-4 grid gap-y-2.5">
                      <p className={'flex items-center gap-1.5 text-blue-800'}>
                        <FaRegCalendarAlt /> Diupload
                      </p>
                      <p>
                        {detail?.published_at
                          ? format(detail?.published_at, 'dd MMMM yyyy', { locale: id })
                          : '-:-:-'}
                      </p>
                      <p className={'flex items-center gap-1.5 text-blue-800'}>
                        <FaUser /> Penulis
                      </p>
                      <p>{detail?.penulis}</p>
                    </div>
                  </>
                )}
              </div>

              {/* RIGHT IMAGE / CAROUSEL */}
              <div className={'w-4/12'}>
                {loading ? (
                  <>
                    <Skeleton className="h-80 w-full rounded-lg" />
                    <div className="flex justify-center mt-4 gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-3 w-3 rounded-full" />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <Carousel setApi={setApi} className="w-full">
                      <CarouselContent className="pr-0">
                        {images?.map((item, index) => (
                          <CarouselItem key={index} className="pr-0">
                            <img
                              src={item.gambar}
                              alt={item.keterangan}
                              className="h-80 w-full object-cover rounded-lg"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>

                    {/* DOTS */}
                    <div className="flex justify-center mt-4 gap-2">
                      {images?.map((_, index) => (
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
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto mt-5">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          ) : (
            <div
              className={'space-y-5'}
              dangerouslySetInnerHTML={{ __html: detail?.isi_artikel ?? '' }}
            />
          )}
        </div>
      </div>
    </>
  )
}
