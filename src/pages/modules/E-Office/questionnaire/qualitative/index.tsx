import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { QuestionnaireQualitative, type TQuestionnaireQualitative } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import FormQualitativeQuestionnaire from './component/form.tsx'

const CreateQualitativeQuestionnaire = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm<TQuestionnaireQualitative>({
    resolver: zodResolver(QuestionnaireQualitative),
    defaultValues: {
      jenis_survei: 'KUALITATIF',
    },
  })

  const HandleSave = async (value: TQuestionnaireQualitative) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/survei`, value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/e-office/guestbook/questionnaire')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <div className="space-y-6 bgwhite">
        <ButtonTitleGroup isBack label={'Buat Kuisioner Kualitatif'} buttonGroup={[
          { type: 'custom', element: <ButtonGoToGuide titleGuide={'Buat Kuisioner Kualitatif'} valueGuide="E_OFFICE_QUESTIONNAIRE" /> },
        ]} />
        <FormQualitativeQuestionnaire form={form} loading={loading} HandleSave={HandleSave} />
      </div>
    </>
  )
}
export default CreateQualitativeQuestionnaire
