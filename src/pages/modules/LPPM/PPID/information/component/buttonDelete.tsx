import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IListInformationTree } from '../data/types'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data?: IListInformationTree
  isChild: boolean
}

export const ButtonDeleteInformation = (props: Props) => {
  const { data, isChild } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/lppm/daftar-informasi/${data?.id_daftar_informasi}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message)
          queryClient.invalidateQueries({
            queryKey: ['information-tree'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal tambah data')
      })
  }

  return (
    <>
      <button
        className={'text-white p-1.5 bg-red-500 hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded max-w-4xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Informasi'}
        description={'Jika Informasi Memiliki Sub Informasi, maka URL Dikosongkan Saja'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-3'}>
          {isChild && (
            <>
              <p className="text-gray-500">Judul Informasi*</p>
              <p>{data?.nama_parent}</p>
            </>
          )}
          <p className="text-gray-500">Judul</p>
          <p>{data?.judul}</p>
          <p className="text-gray-500">URL</p>
          <p>{data?.url ?? 'Tidak ada'}</p>
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
                <Button variant={'destructive'} onClick={HandleSave} disabled={loading}>
                  <FaTrash />
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogCustom>
    </>
  )
}
