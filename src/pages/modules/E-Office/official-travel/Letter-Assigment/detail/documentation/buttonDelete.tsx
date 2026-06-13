import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import type { IDokumentasi } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/hooks.tsx'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiX } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data: IDokumentasi
  id_mail_surat_tugas?: string
}

export const ButtonDeleteDocumentation = (props: Props) => {
  const { data, id_mail_surat_tugas } = props
  const { id } = useParams()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleDelete = async () => {
    setLoading(true)
    const idTugas = id_mail_surat_tugas ?? id
    await AxiosClient.delete(
      `/eoffice/mail-surat-tugas/${idTugas}/dokumentasi/${data?.id_dokumentasi}`
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['documentation-tugas'],
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

      <DialogBasic title={'Hapus Dokumentasi'} open={open} setOpen={setOpen}>
        <div className={'flex flex-col gap-4'}>
          <p className="text-gray-500">Apakah anda yakin ingin menghapus dokumentasi ini?</p>
          {data?.url_file && (
            <img
              className={'w-full max-w-[300px] h-[200px] object-contain border rounded'}
              src={data?.url_file}
              alt={'Dokumentasi'}
            />
          )}
        </div>
        <div className="flex gap-1.5 items-center justify-end mt-4">
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
