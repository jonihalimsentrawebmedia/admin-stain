import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IArtikel } from '../data/types'

export const ButtonPublishArticleLppm = (data: IArtikel) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/lppm/artikel/${data?.id_artikel}/status-publish`, {
      status_publish: 'PUBLISHED',
    })
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['article-lppm'],
          })
          queryClient.invalidateQueries({
            queryKey: ['article-lppm-status'],
          })
          toast.success(res.data.message || 'Success Mengajukan data Promosi')
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        size={'sm'}
        variant={'outline'}
        className={'border-green-500 text-green-500 hover:text-green-600'}
      >
        <Check />
        Publish Sekarang
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Publish Artikel'}
        description={'Apakah anda yakin untuk mengajukan Artikel yang dipilih ke editor?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          {data?.artikel_gambar_tambahan.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {data?.artikel_gambar_tambahan.map((item, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={item?.gambar}
                      className={'w-full h-[250px] object-cover'}
                      alt={item?.keterangan}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className={'absolute right-0 bottom-0'} />
              <CarouselPrevious className={'absolute left-0 bottom-0'} />
            </Carousel>
          ) : (
            <img src={data?.gambar} alt={'image'} className={'w-full h-[250px] object-cover'} />
          )}

          <p className="text-gray-500">Judul Artikel</p>
          <p>{data?.judul}</p>
          <p className="text-gray-500">Penulis</p>
          <p>{data?.penulis}</p>

          <div className="flex items-center justify-end">
            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
                {
                  type: 'add',
                  label: '',
                  element: (
                    <Button
                      disabled={loading}
                      className={'bg-green-500 hover:bg-green-600'}
                      onClick={HandleApprove}
                    >
                      <Check />
                      Publish Sekarang
                    </Button>
                  ),
                  onClick: () => {},
                },
              ]}
            />
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
