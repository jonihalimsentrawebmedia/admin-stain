import { UseGetTopicAndScheduleProgram } from '../../hooks/index'
import { ButtonAddTopicSchedule } from './buttonAdd.tsx'
import { format } from 'date-fns'
import { ButtonEditTopicSchedule } from './buttonEdit.tsx'
import { ButtonDeleteTopicSchedule } from './buttonDelete.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  prev_value: string
  next_value: string
}

export const TopicScheduleSection = (props: Props) => {
  const { prev_value, next_value } = props
  const [_, setSearchParams] = useSearchParams()

  const id = window.localStorage.getItem('id_program')
  const { topic } = UseGetTopicAndScheduleProgram(id as string)

  const HandlePrev = () => {
    const Params = new URLSearchParams()
    Params.append('step', prev_value)
    setSearchParams(Params)
  }

  const queryClient = useQueryClient()
  const HandleNext = async () => {
    if (prev_value) {
      await queryClient.invalidateQueries({
        queryKey: ['status-program'],
      })
      const Params = new URLSearchParams()
      Params.append('step', next_value)
      setSearchParams(Params)
    }
  }

  return (
    <>
      <div className={'space-y-5'}>
        <p className="text-xl font-semibold">2. Topik Bahasan & Jadwal</p>
        {topic?.length === 0 ? (
          <p className={'text-red-500'}>Belum ada topik bahasan & jadwal</p>
        ) : (
          <>
            <ul className={'flex flex-col gap-2'}>
              {topic?.map((row, k) => (
                <li key={k} className={'flex border p-2 border-primary rounded flex-col gap-1.5'}>
                  <p className="text-primary font-semibold text-xl">
                    {k + 1}. {row?.judul_topik_bahasan}{' '}
                    {row?.tanggal_mulai_bahasan ? format(row?.tanggal_mulai_bahasan, 'dd MMM') : ''}{' '}
                    -{' '}
                    {row?.tanggal_selesai_bahasan
                      ? format(row?.tanggal_selesai_bahasan, 'dd MMM-yyyy')
                      : ''}
                  </p>
                  <p>{row?.deskripsi}</p>
                  <div className="flex items-center gap-2 w-fit">
                    <ButtonEditTopicSchedule data={row} />
                    <ButtonDeleteTopicSchedule data={row} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <ButtonAddTopicSchedule />

        <div className="flex items-center justify-between">
          <Button
            variant={'outline'}
            className={'border-primary text-primary hover:text-primary'}
            onClick={HandlePrev}
          >
            <ArrowLeft className={'size-4'} />
            Informasi Training
          </Button>
          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
              },
              {
                type: 'custom',
                element: (
                  <Button onClick={HandleNext}>
                    Lanjutkan <ChevronRight className={'size-4'} />
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}
