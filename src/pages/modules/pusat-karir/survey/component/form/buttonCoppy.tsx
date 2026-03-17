import { MdOutlineContentCopy } from 'react-icons/md'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { useNavigate } from 'react-router-dom'

interface Props {
  data?: ISurveyQuestion
}

export const ButtonCopy = (props: Props) => {
  const { data } = props
  const navigate = useNavigate()

  const HandleCopy = async () => {
    window.localStorage.setItem('uuid', data?.id_survei_pertanyaan ?? '')
    navigate('/modules/pusat-karir/survey/add')
  }

  return (
    <>
      <button className={'border p-1.5 border-primary text-primary rounded'} onClick={HandleCopy}>
        <MdOutlineContentCopy className={'size-4'} />
      </button>
    </>
  )
}
