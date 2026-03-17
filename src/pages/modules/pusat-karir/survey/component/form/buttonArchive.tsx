import { MdArchive } from 'react-icons/md'
import { useState } from 'react'
import type { ISurveyQuestion } from '../../data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface props {
  data: ISurveyQuestion
  complete?: boolean
}

export const ButtonArchive = (props: props) => {
  const { data, complete } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleArchive = async () => {
    setLoading(true)
    await AxiosClient.patch(`/pusat-karir/survei/${data?.id_survei_pertanyaan}/arsip-survei`)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['survey'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Berhasil mengarsipkan survei')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengarsipkan survei')
      })
  }

  return (
    <>
      {complete ? (
        <button
          className={'flex items-center gap-1.5 text-sm text-red-500'}
          onClick={() => setOpen(!open)}
        >
          <MdArchive className={'size-4'} />
          Arsipkan Survei
        </button>
      ) : (
        <button
          className={'bg-red-500 text-white p-1.5 rounded hover:bg-red-600'}
          onClick={() => setOpen(!open)}
        >
          <MdArchive className={'size-4'} />
        </button>
      )}

      <DialogBasic title={'Arsipkan Survei'} open={open} setOpen={setOpen} className={'rounded'}>
        <div className={'flex flex-col gap-4'}>
          <p>
            Survei <span className={'text-primary'}>{`“${data.judul}”`}</span> akan diarsipkan dan
            tidak dapat diakses oleh pengisi. Apakah anda yakin untuk melanjutkan?
          </p>

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
              {
                type: 'custom',
                element: (
                  <Button onClick={HandleArchive} disabled={loading}>
                    Ya, Saya Yakin.
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </DialogBasic>
    </>
  )
}
