import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { Link, useParams } from 'react-router-dom'
import type { IDocumentEvent } from './hooks.tsx'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { RiShareBoxFill } from 'react-icons/ri'
import { BiX } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'

interface props {
  data: IDocumentEvent
}

export const ButtonDeleteEventFile = (props: props) => {
  const { data } = props
  const { id } = useParams()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/acara/${id}/dokumen/${data?.id_acara_dokumen}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['file-support'],
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
          <p className={'text-gray-500'}>Judul File</p>
          <p>{data?.judul}</p>
          <p className={'text-gray-500'}>File</p>
          {data?.jenis_file === 'DOKUMEN' ? (
            <Link
              to={data?.dokumen}
              className={
                'flex items-center gap-1.5 border border-primary text-primary p-1.5 w-fit rounded'
              }
            >
              <RiShareBoxFill />
              Buka Dokumen
            </Link>
          ) : (
            <Link
              to={data?.url_file}
              className={
                'flex items-center gap-1.5 border border-primary text-primary p-1.5 w-fit rounded'
              }
            >
              <RiShareBoxFill />
              Buka URL
            </Link>
          )}
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
