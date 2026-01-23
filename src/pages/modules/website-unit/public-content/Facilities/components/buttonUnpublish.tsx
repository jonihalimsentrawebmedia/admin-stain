import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { MdCancel } from 'react-icons/md'
import type { IUnitFacilities } from '../data/types'

export const ButtonUnpublishFacilitiesUnit = (data: IUnitFacilities) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSubmission = async () => {
    setLoading(true)
    await AxiosClient.patch(`/unit/unit-fasilitas/${data?.id_unit_fasilitas}/status-publish`, {
      status_publish: 'UNPUBLISH',
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Mengajukan data Pengumuman')
          queryClient.invalidateQueries({
            queryKey: ['facilities-unit'],
          })
          queryClient.invalidateQueries({
            queryKey: ['facilities-unit-status'],
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
        className={'text-red-500 border-red-500 hover:text-red-500'}
      >
        <MdCancel />
        Unpublish
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        isAuto
        className={'rounded lg:max-w-xl'}
        title={'Publish Fasilitas'}
        description={'Apakah anda yakin untuk mempublish Fasilitas yang dipilih?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <div className={'text-center flex justify-center'}>
            <img src={data?.gambar} alt="image" className={'w-[200px] h-[150px] object-cover'} />
          </div>
          <p className="text-gray-500">Nama Fasilitas</p>
          <p>{data?.nama_fasilitas}</p>
          <p className="text-gray-500">Deskripsi</p>
          <div
            className={'tiptap ProseMirror simple-editor'}
            dangerouslySetInnerHTML={{ __html: data?.deskripsi ?? '' }}
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
                      onClick={HandleSubmission}
                    >
                      <MdCancel />
                      Unpublish Pengumuman
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
