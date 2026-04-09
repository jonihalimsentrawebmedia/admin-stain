import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ICategoryDocument } from '../data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: ICategoryDocument
}

export const ButtonDeleteCategory = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleAdd = async () => {
    setLoading(true)
    await AxiosClient.delete(`/spi/kategori-sistem-dokumen/${data?.id_kategori_sistem_dokumen}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['category-document'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
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

      <DialogBasic
        title={'Hapus Kategori Dokumen'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Nama Kategori</p>
          <p>{data?.nama_sistem_dokumen}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(false),
            },
            {
              type: 'custom',
              element: (
                <Button disabled={loading} variant={'destructive'} onClick={HandleAdd}>
                  <FaTrash /> Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
