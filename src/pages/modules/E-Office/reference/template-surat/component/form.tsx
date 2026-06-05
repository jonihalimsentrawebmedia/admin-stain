import type { UseFormReturn } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import type { TTemplateSuratForm } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { RichText } from '@/components/common/richtext'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<TTemplateSuratForm>
  HandleSave: (e: TTemplateSuratForm) => void
}

export const FormTemplateSurat = (props: Props) => {
  const { loading, form, HandleSave } = props

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'section',
  })

  const HandleAddSection = () => {
    append({ judul_section: '', konten_section: '' })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextInput
                name={'nama_template'}
                form={form}
                label={'Nama Template'}
                placeholder={'Masukkan nama template'}
                htmlFor={'nama_template'}
                isRequired
              />

              <TextAreaInput
                name={'deskripsi'}
                form={form}
                label={'Deskripsi'}
                placeholder={'Masukkan deskripsi template'}
                htmlFor={'deskripsi'}
                isRequired
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Section Template</CardTitle>
              <Button type="button" onClick={HandleAddSection} className="text-white rounded">
                <BiPlus />
                Tambah Section
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.length === 0 && (
                <p className="text-sm text-gray-400">Belum ada section, tambah section terlebih dahulu.</p>
              )}

              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      Section {index + 1}
                    </p>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => remove(index)}
                      >
                        <BiTrash />
                      </button>
                    )}
                  </div>

                  <TextInput
                    name={`section.${index}.judul_section`}
                    form={form}
                    label={'Judul Section'}
                    placeholder={'Masukkan judul section'}
                    htmlFor={`section.${index}.judul_section`}
                    isRequired
                  />

                  <RichText
                    name={`section.${index}.konten_section`}
                    form={form}
                    label={'Konten Section'}
                    required
                  />
                </div>
              ))}

              {form.formState.errors.section?.message && (
                <p className="text-sm text-red-500">{form.formState.errors.section.message}</p>
              )}
            </CardContent>
          </Card>

          <ButtonForm loading={loading} />
        </form>
      </Form>
    </>
  )
}
