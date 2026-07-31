import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { QuestionnaireQualitative, type TQuestionnaireQualitative } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import FormQualitativeQuestionnaire from '../component/form.tsx'
import { UseGetDetailQuestionnaire } from '@/pages/modules/E-Office/questionnaire/hooks'

const UpdatedQualitativeQuestionnaire = () => {
  const { id } = useParams()
  const { questionnaire: detail } = UseGetDetailQuestionnaire(id as string)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm<TQuestionnaireQualitative>({
    resolver: zodResolver(QuestionnaireQualitative),
    defaultValues: {
      jenis_survei: 'KUALITATIF',
    },
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        jenis_survei: detail?.jenis_survei,
        judul: detail?.judul,
        pertanyaan: detail?.pertanyaan,
      })
    }
  }, [detail])

  const HandleSave = async (value: TQuestionnaireQualitative) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/survei/${id}`, value)
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
        <ButtonTitleGroup isBack label={'Edit Data Kuisioner Kualitatif'} buttonGroup={[
          { type: 'custom', element: <ButtonGoToGuide titleGuide={'Edit Data Kuisioner Kualitatif'} valueGuide="E_OFFICE_QUESTIONNAIRE" /> },
        ]} />
        <FormQualitativeQuestionnaire form={form} loading={loading} HandleSave={HandleSave} />
      </div>
    </>
  )
}
export default UpdatedQualitativeQuestionnaire
