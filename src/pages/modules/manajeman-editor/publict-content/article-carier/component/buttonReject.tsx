import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useQueryClient } from '@tanstack/react-query'
import type { IArticleCarrier } from '@/pages/modules/pusat-karir/public-content/article/data/types.ts'
import { useNavigate } from 'react-router-dom'
import { BiX } from 'react-icons/bi'

export const ButtonRejectEditor = (data: IArticleCarrier) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const HandleSubmission = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/pusat-karir-artikel/${data?.id_artikel}/status-publish`, {
      status_publish: 'DITOLAK_EDITOR',
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Mengajukan data berita')
          queryClient.invalidateQueries({
            queryKey: ['carrier-article'],
          })
          navigate('/modules/editor/dashboard')
          queryClient.invalidateQueries({
            queryKey: ['carrier-article-status'],
          })
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
        className={'border-red-500 text-red-500 hover:text-red-600'}
      >
        <BiX />
        Tolak
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Proses Konten'}
        description={'Apakah anda yakin untuk Menolak Konten Artikel yang diajukan ?'}
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

          <p className="text-gray-500">Judul</p>
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
                      className={
                        'border-red-500 text-white hover:text-white bg-red-500 hover:bg-red-600'
                      }
                      onClick={HandleSubmission}
                    >
                      <BiX />
                      Tolak
                    </Button>
                  ),
                  onClick: () => setOpen(!open),
                },
              ]}
            />
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
