import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { QuestionnaireQuantitative, type TQuestionnaireQuantitative } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import FormQuantitativeQuestionnaire from '@/pages/modules/E-Office/questionnaire/quantitative/component/form.tsx'

const CreateQuantitativeQuestionnaire = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<TQuestionnaireQuantitative>({
    resolver: zodResolver(QuestionnaireQuantitative),
  })

  const HandleSave = async (value: TQuestionnaireQuantitative) => {
    setLoading(true)
    console.log(value)
  }

  return (
    <>
      <FormQuantitativeQuestionnaire form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}
export default CreateQuantitativeQuestionnaire
