import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { QuestionnaireQuantitative, type TQuestionnaireQuantitative } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import FormQuantitativeQuestionnaire from '@/pages/modules/E-Office/questionnaire/quantitative/component/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateQuantitativeQuestionnaire = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm<TQuestionnaireQuantitative>({
    resolver: zodResolver(QuestionnaireQuantitative),
    defaultValues: {
      jenis_survei: 'KUANTITATIF',
    },
  })

  const HandleSave = async (value: TQuestionnaireQuantitative) => {
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
        <ButtonTitleGroup isBack label={'Buat Kuisioner Kuantitatif'} buttonGroup={[
          { type: 'custom', element: <ButtonGoToGuide titleGuide={'Buat Kuisioner Kuantitatif'} valueGuide="E_OFFICE_QUESTIONNAIRE" /> },
        ]} />
        <FormQuantitativeQuestionnaire form={form} loading={loading} HandleSave={HandleSave} />
      </div>
    </>
  )
}
export default CreateQuantitativeQuestionnaire
