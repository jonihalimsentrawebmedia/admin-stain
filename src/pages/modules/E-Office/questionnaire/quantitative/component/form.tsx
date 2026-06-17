import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import type { TQuestionnaireQuantitative } from '@/pages/modules/E-Office/questionnaire/quantitative/data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonAddQuestion from '@/pages/modules/E-Office/questionnaire/quantitative/component/addQuestion.tsx'
import { ColumnsQuestion } from '@/pages/modules/E-Office/questionnaire/quantitative/component/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

interface props {
  form: UseFormReturn<TQuestionnaireQuantitative>
  loading: boolean
  HandleSave: (e: TQuestionnaireQuantitative) => void
}

const FormQuantitativeQuestionnaire = (props: props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()

  const question = form.watch('pertanyaan') ?? []
  const columns = ColumnsQuestion({
    form: form,
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5'}>
          <TextInput
            name={'judul'}
            form={form}
            label={'Judul Kuisioner'}
            className={'bg-white'}
            placeholder={'JUdul Kuisioner'}
            htmlFor={'judul_kuisioner'}
            isRequired
          />

          <div className={'p-5 bg-white shadow rounded-lg space-y-4'}>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">Daftar Pertanyaan</p>
              <ButtonAddQuestion
                HandleAddQuestion={(e) => {
                  const valueFOrm = form.getValues('pertanyaan')
                  const temp = valueFOrm ? [...valueFOrm] : []
                  temp.push(e)
                  form.setValue('pertanyaan', temp)
                }}
              />
            </div>
            {question.length > 0 ? (
              <TableCustom
                isShowFilter={false}
                isShowPagination={false}
                columns={columns}
                data={question}
              />
            ) : (
              <p className={'text-red-500'}>Belum Ada Pertayaan</p>
            )}
          </div>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
export default FormQuantitativeQuestionnaire
