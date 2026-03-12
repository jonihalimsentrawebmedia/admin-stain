import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data: ISurveyQuestion
}

export const ButtonDeleteSurvey = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleDeleteSurvey = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pusat-karir/survei/${data.id_survei_pertanyaan}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['survey'],
          })
          setLoading(false)
        }
        toast.success(res.data.message || 'Berhasil menghapus data survey')
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal menghapus data survey')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'p-1.5 rounded bg-red-500 text-white hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash className={'size-4'} />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        className={'rounded max-w-xl'}
        title={'Hapus Survey?'}
        description={`Survei “${data?.judul}” akan dihapus. Apakah anda yakin untuk melanjutkan?`}
      >
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
            {
              type: 'custom',
              element: (
                <Button variant={'destructive'} disabled={loading} onClick={HandleDeleteSurvey}>
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
