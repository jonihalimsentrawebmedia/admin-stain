import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { IInboxList } from '../data/types.ts'
import { format } from 'date-fns'

interface props {
  data: IInboxList
}

const ButtonDeleteInbox = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/surat-masuk/${data?.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['inbox'],
          })
          setLoading(false)
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
        className={'p-1.5 bg-red-500 text-white rounded hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Hapus Surat'}
        description={'Surat akan dihapus dan tidak bisa diakses lagi. Apakah Anda yakin?'}
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Tanggal</p>
          <p>{data?.tanggal_surat ? format(data?.tanggal_surat, 'dd/MM/yyyy') : '-'}</p>
          <p className="text-gray-500">Nomor Surat</p>
          <p>{data?.nomor_surat}</p>
          <p className="text-gray-500">Jenis Surat</p>
          <p>{data?.nama_jenis_surat}</p>
          <p className="text-gray-500">Perihal</p>
          <p>{data?.perihal}</p>
          <p className="text-gray-500">Asal Surat</p>
          <p>{data?.nama_asal_surat}</p>
          <p className="text-gray-500">Penerima</p>
          <p>{data?.penerima_surat}</p>
          <p className="text-gray-500">Disposisi</p>
          <p>{data?.list_disposisi?.map((row) => row)}</p>
        </div>
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            {
              type: 'custom',
              element: (
                <>
                  <Button variant="destructive" onClick={HandleSave} disabled={loading}>
                    <FaTrash />
                    Hapus
                  </Button>
                </>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonDeleteInbox
