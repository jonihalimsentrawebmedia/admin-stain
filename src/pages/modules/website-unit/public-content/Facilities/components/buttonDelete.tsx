import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IUnitFacilities } from '../data/types'

export const ButtonDeleteFacilitiesUnit = (data: IUnitFacilities) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/unit-fasilitas/${data?.id_unit_fasilitas}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data facilities')
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Hapus Fasilitas?'}
        description={'Apakah anda yakin untuk menghapus Fasilitas yang ditulis?'}
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
                    <Button disabled={loading} variant={'destructive'} onClick={HandlerDelete}>
                      <FaTrash />
                      Hapus
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
