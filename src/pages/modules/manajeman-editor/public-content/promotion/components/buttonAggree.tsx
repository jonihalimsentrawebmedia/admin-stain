import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'

import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import type { IPromotion } from '../data/types'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const ButtonAggreManagementEditor = (data: IPromotion) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/promosi/${data?.id_promosi}/status-publish`, {
      status_publish: 'DISETUJUI_EDITOR',
    })
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['promotion-prodi-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['promotion-prodi-status-editor'],
          })
          toast.success(res.data.message || 'Success Mengajukan data pengumuman')
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
        Setujui 
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Setujui Promosi'}
        description={'Apakah anda yakin untuk menyetujui Promosi?'}
      >
        <div className={'flex flex-col gap-2.5'}>
           {data?.promosi_gambar_tambahan.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {data?.promosi_gambar_tambahan.map((item, index) => (
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

          <p className="text-gray-500">Judul Promosi</p>
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
                      className={'border-green-500 text-white hover:text-white'}
                      onClick={HandleApprove}
                    >
                      <Check />
                      Setujui
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

export default ButtonAggreManagementEditor
