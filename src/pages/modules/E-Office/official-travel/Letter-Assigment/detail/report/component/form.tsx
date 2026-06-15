import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import type { TReportOfficialTravel } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import { DateInputRHF } from '@/pages/modules/E-Office/component/dateInputRhf'

interface Props {
  form: UseFormReturn<TReportOfficialTravel>
  loading: boolean
  HandleSave: (e: TReportOfficialTravel) => void
}

const FormReportOfficialTravel = (props: Props) => {
  const { form, loading, HandleSave } = props
  const report = useFieldArray({
    control: form.control,
    name: 'laporan_pelaksana',
  } as any)

  useEffect(() => {
    if (report.fields.length === 0) {
      report.append('')
    }
  }, [report])

  console.log(form.formState.errors)

  return (
    <>
      <Form {...form}>
        <form
          className={'flex flex-col gap-4 bg-white p-4 rounded shadow'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          <TextInput
            name={'tempat'}
            form={form}
            label={'Tempat'}
            placeholder={'Tempat'}
            htmlFor={'tempat'}
            isRequired
            isRow
          />
          <DateInputRHF form={form} name={'tanggal'} label={'Tanggal'} />
          <TextInput
            name={'perihal'}
            form={form}
            label={'Perihal'}
            placeholder={'Perihal'}
            htmlFor={'perihal'}
            isRequired
            isRow
          />
          <TextAreaInput
            name={'isi'}
            form={form}
            label={'Isi'}
            placeholder={'Isi'}
            htmlFor={'isi'}
            isRequired
            isRow
          />
          <TextAreaInput
            form={form}
            name={'dasar_perjalanan_dinas'}
            label={'Dasar Pelaksanaan Perjalanan Dinas'}
            placeholder={'Dasar Pelaksanaan Perjalanan Dinas'}
            htmlFor={'dasar_perjalanan_dinas'}
            isRequired
            isRow
          />

          {report.fields.map((field, index) => (
            <div key={field.id} className={'flex items-center gap-1.5 w-full'}>
              <TextInput
                name={`laporan_pelaksana.${index}`}
                form={form}
                label={'Laporan Pelaksana'}
                placeholder={`Laporan Pelaksana ke ${index + 1}`}
                htmlFor={`laporan_pelaksana.${index}`}
                className={'w-full'}
                isRow
                isRequired
              />
              {report.fields.length > 1 && (
                <button
                  className={'p-1.5 text-red-500'}
                  type="button"
                  onClick={() => report.remove(index)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          <div className="grid grid-cols-[12rem_1fr] gap-4">
            <div />
            <Button
              className={'text-white w-fit'}
              type={'button'}
              onClick={() => {
                report.append('')
              }}
            >
              Tambah Laporan
            </Button>
          </div>

          <TextAreaInput
            form={form}
            name={'tindak_lanjut'}
            label={'Tindak Lanjut'}
            placeholder={'Tindak Lanjut'}
            htmlFor={'tindak_lanjut'}
            isRequired
            isRow
          />
          <TextAreaInput
            form={form}
            name={'saran'}
            label={'Saran'}
            placeholder={'Saran'}
            htmlFor={'saran'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} />
        </form>
      </Form>
    </>
  )
}
export default FormReportOfficialTravel
