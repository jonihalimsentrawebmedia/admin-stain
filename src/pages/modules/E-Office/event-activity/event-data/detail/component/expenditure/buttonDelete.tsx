import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { Link, useParams } from 'react-router-dom'
import type { IExpenditureEvent } from './hooks.tsx'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiX } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'
import { format } from 'date-fns'

interface props {
  data: IExpenditureEvent
}

export const ButtonDeleteEventFile = (props: props) => {
  const { data } = props
  const { id } = useParams()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/acara/${id}/pengeluaran/${data?.id_acara_pengeluaran}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['expenditure'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-red-500 text-white hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash className={'size-4'} />
      </button>

      <DialogBasic title={'Hapus Dokumen'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className={'text-gray-500'}>Uraian Pengeluaran</p>
          <p>{data?.uraian_pengeluaran}</p>
          <p className={'text-gray-500'}>Tanggal Pengeluaran</p>
          <p>{data?.tanggal_pengeluaran ? format(data?.tanggal_pengeluaran, 'dd-MM-yyyy') : ''}</p>
          <p className={'text-gray-500'}>Yang Membayarkan</p>
          <p>{data?.yang_membayar}</p>
          <p className={'text-gray-500'}>Tempat Pembelian</p>
          <p>{data?.tempat_pembelian}</p>
          <p className={'text-gray-500'}>Jumlah Pembelian</p>
          <p>
            {data?.jumlah_pengeluaran
              ? new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }).format(Number(data?.jumlah_pengeluaran))
              : '0'}
          </p>
          <p className={'text-gray-500'}>Bukti Bayar</p>
          <Link to={data?.url_file_pengeluaran ?? '#'} target={'_blank'} className={'border border-primary text-primary p-1.5 w-fit rounded'}>
            Bukti Bayar
          </Link>
        </div>
        <div className="flex gap-1.5 items-center justify-end">
          <Button
            variant={'outline'}
            className={'border border-primary text-primary hover:text-primary'}
            onClick={() => setOpen(!open)}
          >
            <BiX />
            Batal
          </Button>
          <Button variant={'destructive'} onClick={HandleDelete} disabled={loading}>
            <FaTrash className={'size-4'} />
            Hapus
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}
