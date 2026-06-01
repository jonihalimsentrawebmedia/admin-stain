import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import type { TQuestionnaireQuantitative } from '@/pages/modules/E-Office/questionnaire/quantitative/data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'

interface props {
  form: UseFormReturn<TQuestionnaireQuantitative>
  loading: boolean
  HandleSave: (e: TQuestionnaireQuantitative) => void
}

const FormQuantitativeQuestionnaire = (props: props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5'}>
          <TextInput
            name={'judul_kuisioner'}
            form={form}
            label={'Judul Kuisioner'}
            className={'bg-white'}
            placeholder={'JUdul Kuisioner'}
            htmlFor={'judul_kuisioner'}
            isRequired
          />
          <SelectBasicInput
            name={'id_kategori'}
            form={form}
            className={'w-1/2'}
            placeholder={'Kategori Pengisi'}
            label={'Kategori Pengisi'}
            isRequired
            data={[]}
          />

          <div className={'p-5 bg-white shadow rounded-lg'}>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">Daftar Pertayaan</p>
              <Button className={'text-white'}>
                <FaCirclePlus />
                Tambah Pertayaan
              </Button>
            </div>
          </div>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
export default FormQuantitativeQuestionnaire
