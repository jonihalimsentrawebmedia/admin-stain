import { UseGetTopicAndSchedule } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import { ButtonAddTopicSchedule } from '@/pages/modules/Pulsikom/training/list-training/component/topic-schedule/buttonAdd.tsx'
import { format } from 'date-fns'
import { ButtonEditTopicSchedule } from '@/pages/modules/Pulsikom/training/list-training/component/topic-schedule/buttonEdit.tsx'
import { ButtonDeleteTopicSchedule } from '@/pages/modules/Pulsikom/training/list-training/component/topic-schedule/buttonDelete.tsx'

export const TopicScheduleSection = () => {
  const id = window.localStorage.getItem('id_training')
  const { topic } = UseGetTopicAndSchedule(id as string)

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
      </div>
    </>
  )
}
