import { FaTrash } from 'react-icons/fa'
import type { ISurvey } from '@/pages/modules/E-Office/questionnaire/data/types.ts'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { BiX } from 'react-icons/bi'

interface Props {
  data: ISurvey
}

const ButtonDeleteQuestionnaire = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleDelete = async () => {
    await AxiosClient.delete(`/eoffice/survei/${data?.id_survei}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['questionnaire'],
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
        className="p-1.5 bg-red-500 text-white hover:bg-red-600 rounded"
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Hapus Kuisioner'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p>Jenis Kuisioner</p>
          <p>{data?.jenis_survei}</p>
          <p>Judul Kuisioner</p>
          <p>{data?.judul}</p>
          <p>Jumlah Pertayaan</p>
          <p>{data?.jumlah_pertanyaan}</p>
          <p>Diisi</p>
          <p>{data?.diisi}</p>
        </div>
        <div className="flex gap-1.5 items-center justify-end">
          <Button
            variant={'outline'}
            className={'border border-primary text-primary'}
            onClick={() => setOpen(!open)}
          >
            <BiX /> Batal
          </Button>
          <Button variant={'destructive'} onClick={HandleDelete} disabled={loading}>
            <FaTrash /> Hapus
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}
export default ButtonDeleteQuestionnaire
