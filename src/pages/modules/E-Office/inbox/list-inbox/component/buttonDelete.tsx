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
        <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-3 sm:gap-4'}>
          <p className="text-gray-500 text-sm">Tanggal</p>
          <p className="text-sm sm:text-base">{data?.tanggal_surat ? format(data?.tanggal_surat, 'dd/MM/yyyy') : '-'}</p>
          <p className="text-gray-500 text-sm">Nomor Surat</p>
          <p className="text-sm sm:text-base break-all">{data?.nomor_surat}</p>
          <p className="text-gray-500 text-sm">Jenis Surat</p>
          <p className="text-sm sm:text-base">{data?.nama_jenis_surat}</p>
          <p className="text-gray-500 text-sm">Perihal</p>
          <p className="text-sm sm:text-base">{data?.perihal}</p>
          <p className="text-gray-500 text-sm">Asal Surat</p>
          <p className="text-sm sm:text-base">{data?.nama_asal_surat}</p>
          <p className="text-gray-500 text-sm">Penerima</p>
          <p className="text-sm sm:text-base">{data?.penerima_surat}</p>
          <p className="text-gray-500 text-sm">Disposisi</p>
          <p className="text-sm sm:text-base">{data?.list_disposisi?.map((row) => row)}</p>
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
