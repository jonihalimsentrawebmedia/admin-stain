import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetTrainingParticipant } from '@/pages/modules/Pulsikom/training/list-training/participant/hooks'
import { useParams } from 'react-router-dom'
import {
  ColumnsParticipant,
  DummyParticipant,
} from '@/pages/modules/Pulsikom/training/list-training/participant/data'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'

export const Participant = () => {
  const { id } = useParams()
  const { participant } = UseGetTrainingParticipant({
    status: 'PENDING',
    id_training: id as string,
  })
  console.log(participant)

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup isBack label={'Lihat Pendaftar'} buttonGroup={[]} />
        <TableBasic columns={ColumnsParticipant} data={DummyParticipant} />
      </div>
    </>
  )
}
