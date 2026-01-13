import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
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
import { MdCancel } from 'react-icons/md'
import { Textarea } from '@/components/ui/textarea'

export const ButtonRejectNewsManagementEditor = (data: INewsDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')
  const queryClient = useQueryClient()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/berita/${data?.id_berita}/status-publish`, {
      status_publish: 'TOLAK_EDITOR',
      alasan_ditolak: reason == '' ? undefined : reason,
    })
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['management-editor-news'],
          })
          queryClient.invalidateQueries({
            queryKey: ['management-editor-news-status'],
          })
          toast.success(res.data.message || 'Success Mengajukan data berita')
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
        className={'border-red-500 text-red-500 hover:text-red-600'}
      >
        <MdCancel />
        Tolak
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Tolak Berita'}
        description={'Apakah anda yakin untuk menolak berita yang dipilih?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          {data?.berita_gambar_tambahan.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {data?.berita_gambar_tambahan.map((item, index) => (
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
          <p className="text-gray-500">Kategori</p>
          <p>{data?.nama_kategori_berita}</p>
          <p className="text-gray-500">Penulis</p>
          <p>{data?.penulis}</p>

          <Textarea
            placeholder="Alasan "
            value={reason}
            onChange={(e) => {
              setReason(e.target.value)
            }}
          />

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
                      className={'bg-red-500 hover:bg-red-600'}
                      onClick={HandleApprove}
                    >
                      <MdCancel />
                      Tolak
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
