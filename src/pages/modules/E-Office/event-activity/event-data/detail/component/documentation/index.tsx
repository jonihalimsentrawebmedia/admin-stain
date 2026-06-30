import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { UseGetDocumentation } from './hooks.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import ButtonEditDocumentation from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation/buttonEdit.tsx'
import { ButtonDeleteDocumentation } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation/buttonDelete.tsx'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils.ts'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'
import ButtonUploadMultiple from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation/UploadMultiple'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { useQueryClient } from '@tanstack/react-query'
import { MdPrint } from 'react-icons/md'
import { generateDocumentationPdf } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation/printImage'
import pdfMake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'

interface props {
  detail?: IEvent
}

const DocumentationEventActivity = (props: props) => {
  const { detail } = props
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const { file } = UseGetDocumentation({
    id_acara: id as string,
    page: '0',
    limit: '0',
    search,
  })
  const [idSelected, setIdSelected] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const [current, setCurrent] = useState(0)
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!mainApi || !thumbApi) return

    const onSelect = () => {
      const index = mainApi.selectedScrollSnap()

      setCurrent(index)

      thumbApi.scrollTo(index)
    }

    onSelect()

    mainApi.on('select', onSelect)

    return () => {
      mainApi.off('select', onSelect)
    }
  }, [mainApi, thumbApi])

  const allIds = file.map((row) => row.id_acara_dokumentasi)

  const isAllSelected = file.length > 0 && allIds.every((id) => idSelected.includes(id))
  const selectedCount = idSelected.length

  const HandleSelectAll = () => {
    if (isAllSelected) {
      setIdSelected([])
      return
    }
    setIdSelected([...new Set(allIds)])
  }
  const HandleToggleSelect = (id: string) => {
    setIdSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      }

      return [...new Set([...prev, id])]
    })
  }

  const queryClient = useQueryClient()
  const HandleDeleteList = async () => {
    if (idSelected.length > 0) {
      await AxiosClient.delete(`/eoffice/acara/${id}/dokumentasi`, {
        data: {
          ids: [...idSelected],
        },
      })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message || 'Success')
            setIdSelected([])
            queryClient.invalidateQueries({
              queryKey: ['documentation'],
            })
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Error')
        })
    }
  }

  return (
    <>
      <Card className={'shadow-none p-3 rounded-lg'}>
        <CardContent className={'p-3 flex flex-col gap-3'}>
          <ButtonTitleGroup
            label={'Dokumentasi'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <>
                    <Button
                      variant={isAllSelected ? 'outline' : 'default'}
                      className={cn(
                        isAllSelected ? 'text-primary border-primary' : 'text-white',
                        'rounded-full'
                      )}
                      onClick={HandleSelectAll}
                    >
                      {isAllSelected ? 'Batalkan Pilihan' : `Pilih Semua (${selectedCount})`}
                    </Button>
                  </>
                ),
              },
              {
                type: 'custom',
                element: (
                  <>
                    {idSelected.length > 0 && (
                      <Button
                        onClick={HandleDeleteList}
                        variant={'destructive'}
                        className={'rounded-full'}
                      >
                        <FaTrash />
                        Hapus Gambar ({idSelected.length})
                      </Button>
                    )}
                  </>
                ),
              },
              { type: 'custom', element: <ButtonUploadMultiple /> },
              {
                type: 'custom',
                element: (
                  <>
                    {idSelected.length > 0 && (
                      <Button
                        className={'text-white'}
                        onClick={async () => {
                          const temp: any = file.filter((row) =>
                            idSelected.includes(row.id_acara_dokumentasi)
                          )
                          const { docDefinition } = await generateDocumentationPdf({
                            documentation: temp,
                            detail: detail,
                          })

                          const pdf = pdfMake.createPdf(docDefinition)
                          pdf.open()
                        }}
                      >
                        <MdPrint />
                        Cetak
                      </Button>
                    )}
                  </>
                ),
              },
            ]}
          />

          <div className="grid grid-cols-4 gap-4">
            {file.map((row, k) => (
              <div
                key={k}
                onClick={() => setOpen(true)}
                className={
                  'relative border rounded-lg shadow overflow-hidden w-full cursor-pointer'
                }
              >
                <div className="top-0 right-0 absolute flex gap-1.5 w-full">
                  <div className="flex items-center justify-between w-full p-2">
                    <div
                      onClick={() => HandleToggleSelect(row.id_acara_dokumentasi)}
                      className={cn(
                        'w-5 h-5 size-5 rounded-full bg-gray-100',
                        'flex items-center justify-center shadow border border-primary',
                        idSelected.includes(row?.id_acara_dokumentasi) && 'bg-blue-500'
                      )}
                    >
                      {idSelected.includes(row?.id_acara_dokumentasi) && (
                        <Check className={'size-3.5 text-white'} />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ButtonEditDocumentation data={row} />
                      <ButtonDeleteDocumentation data={row} />
                    </div>
                  </div>
                </div>
                <img
                  src={row?.url_file}
                  alt="gambar"
                  className="w-full h-[200px] object-cover bg-gray-100 shadow"
                />
                <div className={'bg-white p-2'}>
                  <p className={'text-sm'}>{row?.key_file}</p>
                  <p className={'text-gray-500 text-xs'}>Dokumentassi #{k + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DialogBasic className="min-w-6xl" title="Preview Dokumentasi" open={open} setOpen={setOpen}>
        <div className="space-y-5">
          <Carousel
            setApi={setMainApi}
            opts={{
              align: 'center',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {file.slice(1).map((row, index) => (
                <CarouselItem key={index}>
                  <div className="flex justify-center">
                    <img
                      alt={'gambar'}
                      src={row.url_file}
                      className="w-full h-[450px] object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <Carousel
            setApi={setThumbApi}
            opts={{
              align: 'start',
              dragFree: true,
              containScroll: 'keepSnaps',
            }}
            className="w-full"
          >
            <CarouselContent>
              {file.slice(1).map((row, index) => (
                <CarouselItem key={index} className="basis-1/12">
                  <img
                    src={row.url_file}
                    alt={'gambar'}
                    onClick={() => mainApi?.scrollTo(index)}
                    className={`h-[50px] w-full rounded-md object-cover cursor-pointer border-2 transition-all
                    ${
                      current === index
                        ? 'border-primary opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className={'left-0'} />
            <CarouselNext className={'right-0'} />
          </Carousel>
        </div>
      </DialogBasic>
    </>
  )
}

export default DocumentationEventActivity
