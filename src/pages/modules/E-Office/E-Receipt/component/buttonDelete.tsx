import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IEreceipt } from '@/pages/modules/E-Office/E-Receipt/data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface props {
  data: IEreceipt
}

const ButtonDeleteEreceipt = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/kwitansi/${data?.id_kwitansi}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['e-receipt'],
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

      <DialogBasic title={'Hapus Kwitansi'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">No. Kwitansi</p>
          <p>{data?.no_kwitansi}</p>
          <p className="text-gray-500">Tanggal</p>
          <p>
            {data?.tanggal
              ? new Intl.DateTimeFormat('id-ID').format(new Date(data?.tanggal))
              : '-'}
          </p>
          <p className="text-gray-500">Penerima</p>
          <p>{data?.nama_penerima}</p>
          <p className="text-gray-500">Penyetor</p>
          <p>{data?.nama_penyetor}</p>
          <p className="text-gray-500">Warna</p>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-4 w-4 rounded-full border"
              style={{ backgroundColor: data?.warna }}
            />
            <span className="text-xs font-mono">{data?.warna}</span>
          </div>
          <p className="text-gray-500">Jumlah</p>
          <p>
            {data?.jumlah
              ? new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(Number(data?.jumlah))
              : '-'}
          </p>
          <p className="text-gray-500">Keterangan</p>
          <p>{data?.keterangan || '-'}</p>
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

export default ButtonDeleteEreceipt
