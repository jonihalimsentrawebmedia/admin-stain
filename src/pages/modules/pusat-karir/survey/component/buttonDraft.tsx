// pusat-karir/survei/:id/kembali-ke-draft

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { RiHistoryFill } from 'react-icons/ri'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface props {
  data: ISurveyQuestion
}

export const ButtonDraft = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleDraft = async () => {
    await AxiosClient.patch(`/pusat-karir/survei/${data?.id_survei_pertanyaan}/kembali-ke-draft`)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['survey'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Berhasil mengembalikan survei ke draft')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal mengembalikan survei ke draft')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <RiHistoryFill className={'size-4'} />
        Kembalikan
      </Button>

      <DialogBasic
        title={'Kembalikan Ke Draft'}
        open={open}
        setOpen={setOpen}
        className={'rounded'}
      >
        <div className={'flex flex-col gap-4'}>
          <p>
            Survei <span className={'text-primary'}>{`"${data?.judul}"`}</span> akan dikembalikan ke
            draft. Setelah dikembalikan, Anda dapat melakukan perubahan terhadap survei.
          </p>

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
              {
                type: 'custom',
                element: (
                  <Button onClick={HandleDraft} disabled={loading}>
                    Kembalikan Ke Draft
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
