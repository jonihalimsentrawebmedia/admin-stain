import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { TemplateSuratSchema, type TTemplateSuratForm } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FormTemplateSurat } from '@/pages/modules/E-Office/reference/template-surat/component/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailTemplateSurat } from '@/pages/modules/E-Office/reference/template-surat/hooks'
import { Form } from '@/components/ui/form.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { useFieldArray } from 'react-hook-form'
import { SectionFieldsUpdateSchema, type TSectionFieldsUpdateForm } from './schema'
import { TIPE_INPUT_OPTIONS } from './types'

const UpdateTemplateSurat = () => {
  const { id } = useParams()
  const { templateSurat, loading: loadingDetail } = UseGetDetailTemplateSurat(id as string)
  const [loading, setLoading] = useState(false)

  // ── Form untuk data utama template (nama, deskripsi, section) ──
  const form = useForm<TTemplateSuratForm>({
    resolver: zodResolver(TemplateSuratSchema),
    defaultValues: {
      nama_template: '',
      deskripsi: '',
      section: [],
    },
  })

  // ── Form untuk section fields ──
  const sectionFieldsForm = useForm<TSectionFieldsUpdateForm>({
    resolver: zodResolver(SectionFieldsUpdateSchema),
    defaultValues: {
      section_fields: [],
    },
  })

  const {
    fields: sectionFieldItems,
    append: appendSectionField,
    remove: removeSectionField,
    replace: replaceSectionFields,
  } = useFieldArray({
    control: sectionFieldsForm.control,
    name: 'section_fields',
  })

  // ── Isi form dari data detail ──
  useEffect(() => {
    if (templateSurat) {
      const mainData = templateSurat.template_surat
      const sections = (templateSurat.sections ?? []).map((item) => ({
        judul_section: item.judul_section,
        konten_section: item.konten_section,
      }))

      form.reset({
        nama_template: mainData.nama_template,
        deskripsi: mainData.deskripsi,
        section: sections,
      })

      // Isi section fields dari response detail
      const fields = (templateSurat.fields ?? []).map((f) => {
        const base: Record<string, any> = {
          id_section_field: f.id_section_field ?? '',
          key_placeholder: f.key_placeholder,
          label: f.label,
          tipe_input: f.tipe_input,
          is_required: f.is_required,
          urutan: f.urutan ?? 0,
        }
        // options hanya disertakan jika tipe DROPDOWN dan ada isinya
        if (f.tipe_input === 'DROPDOWN' && f.options?.length) {
          base.options = f.options
        }
        return base
      })
      replaceSectionFields(fields)
    }
  }, [templateSurat, id, form, replaceSectionFields])

  const navigate = useNavigate()

  // ── Simpan data utama template ──
  const HandleSave = async (value: TTemplateSuratForm) => {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/eoffice/template-surat/full/${id}`, value)
      if (res?.data?.status) {
        toast.success(res?.data?.message || 'Berhasil mengupdate template surat')

        // Simpan juga section fields
        const sectionFieldsValue = sectionFieldsForm.getValues()
        if (sectionFieldsValue.section_fields.length > 0) {
          await AxiosClient.put(
            `/eoffice/template-surat/section-fields/${id}`,
            sectionFieldsValue.section_fields.map((f, i) => {
              const item: Record<string, any> = {
                id_section_field: f.id_section_field,
                key_placeholder: f.key_placeholder,
                label: f.label,
                tipe_input: f.tipe_input,
                is_required: f.is_required,
                urutan: f.urutan ?? i + 1,
              }
              // options hanya dikirim untuk DROPDOWN dan jika ada isinya
              if (f.tipe_input === 'DROPDOWN' && f.options?.length) {
                item.options = f.options
              }
              return item
            })
          )
            .then((sfRes) => {
              if (sfRes?.data?.status) {
                toast.success(sfRes?.data?.message || 'Section fields berhasil diupdate')
              }
            })
            .catch((sfErr) => {
              toast.error(sfErr?.response?.data?.message || 'Gagal mengupdate section fields')
            })
        }

        navigate('/modules/e-office/reference/template-surat')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal mengupdate template surat')
    } finally {
      setLoading(false)
    }
  }

  const HandleAddSectionField = () => {
    appendSectionField({
      id_section_field: '',
      key_placeholder: '',
      label: '',
      tipe_input: 'TEXT',
      is_required: false,
      urutan: sectionFieldItems.length + 1,
    } as any)
  }

  const HandleAddOption = (fieldIndex: number) => {
    const currentFields = sectionFieldsForm.getValues('section_fields')
    const options = currentFields[fieldIndex].options ?? []
    sectionFieldsForm.setValue(`section_fields.${fieldIndex}.options`, [
      ...options,
      { label: '', value: '' },
    ])
  }

  const HandleRemoveOption = (fieldIndex: number, optionIndex: number) => {
    const currentFields = sectionFieldsForm.getValues('section_fields')
    const options = currentFields[fieldIndex].options ?? []
    sectionFieldsForm.setValue(
      `section_fields.${fieldIndex}.options`,
      options.filter((_, i) => i !== optionIndex)
    )
  }

  const HandleLoading = loading || loadingDetail

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Edit Template Surat'} buttonGroup={[]} />
        {loadingDetail ? (
          <div className="text-center py-10">Memuat data...</div>
        ) : (
          <>
            {/* Form data utama template */}
            <FormTemplateSurat loading={HandleLoading} form={form} HandleSave={HandleSave} />

            {/* Section Fields Management */}
            <Form {...sectionFieldsForm}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Section Fields</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">
                      Kelola placeholder field yang akan digunakan pada template surat. Field ini
                      bisa digunakan di konten section dengan notation{' '}
                      <code className="bg-gray-100 px-1 rounded">{'{{key_placeholder}}'}</code>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={HandleAddSectionField}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <BiPlus /> Tambah Field
                  </button>
                </CardHeader>
                <CardContent>
                  {sectionFieldItems.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      Belum ada section field. Klik "Tambah Field" untuk menambahkan.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {sectionFieldItems.map((field, index) => (
                        <div key={field.id} className="border rounded-lg p-4 space-y-4 relative">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">Field {index + 1}</p>
                            <button
                              type="button"
                              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                              onClick={() => removeSectionField(index)}
                            >
                              <BiTrash />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <TextInput
                              name={`section_fields.${index}.key_placeholder`}
                              form={sectionFieldsForm}
                              label={'Key Placeholder'}
                              placeholder={'Contoh: nama, tanggal, tempat'}
                              htmlFor={`section_fields.${index}.key_placeholder`}
                              isRequired
                            />

                            <TextInput
                              name={`section_fields.${index}.label`}
                              form={sectionFieldsForm}
                              label={'Label'}
                              placeholder={'Contoh: Nama, Tanggal, Tempat'}
                              htmlFor={`section_fields.${index}.label`}
                              isRequired
                            />

                            <SelectBasicInput
                              name={`section_fields.${index}.tipe_input`}
                              form={sectionFieldsForm}
                              label={'Tipe Input'}
                              placeholder={'Pilih tipe input'}
                              data={TIPE_INPUT_OPTIONS}
                              isRequired
                            />

                            <div className="flex items-center gap-4">
                              <CheckboxInputBasic
                                name={`section_fields.${index}.is_required`}
                                form={sectionFieldsForm}
                                label={'Required'}
                              />
                              <TextInput
                                name={`section_fields.${index}.urutan`}
                                form={sectionFieldsForm}
                                label={'Urutan'}
                                placeholder={'1'}
                                htmlFor={`section_fields.${index}.urutan`}
                                type="number"
                              />
                            </div>
                          </div>

                          {/* ── Options untuk DROPDOWN ── */}
                          {sectionFieldsForm.watch(`section_fields.${index}.tipe_input`) ===
                            'DROPDOWN' && (
                            <div className="border-t pt-4">
                              <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-semibold text-gray-600">Opsi Dropdown</p>
                                <button
                                  type="button"
                                  onClick={() => HandleAddOption(index)}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                                >
                                  <BiPlus /> Tambah Opsi
                                </button>
                              </div>

                              {(!sectionFieldsForm.watch(`section_fields.${index}.options`) ||
                                sectionFieldsForm.watch(`section_fields.${index}.options`)
                                  ?.length === 0) && (
                                <p className="text-sm text-gray-400">
                                  Belum ada opsi. Klik "Tambah Opsi" untuk menambahkan.
                                </p>
                              )}

                              {sectionFieldsForm
                                .watch(`section_fields.${index}.options`)
                                ?.map((_opt, optIndex) => (
                                  <div key={optIndex} className="flex items-end gap-3 mb-2">
                                    <TextInput
                                      name={`section_fields.${index}.options.${optIndex}.label`}
                                      form={sectionFieldsForm}
                                      label={'Label'}
                                      placeholder={'Contoh: Laki-laki'}
                                      htmlFor={`section_fields.${index}.options.${optIndex}.label`}
                                      isRequired
                                    />
                                    <TextInput
                                      name={`section_fields.${index}.options.${optIndex}.value`}
                                      form={sectionFieldsForm}
                                      label={'Value'}
                                      placeholder={'Contoh: L'}
                                      htmlFor={`section_fields.${index}.options.${optIndex}.value`}
                                      isRequired
                                    />
                                    <button
                                      type="button"
                                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 mb-1 shrink-0"
                                      onClick={() => HandleRemoveOption(index, optIndex)}
                                    >
                                      <BiTrash />
                                    </button>
                                  </div>
                                ))}
                            </div>
                          )}

                          <input
                            type="hidden"
                            {...sectionFieldsForm.register(
                              `section_fields.${index}.id_section_field`
                            )}
                          />
                        </div>
                      ))}

                      {sectionFieldsForm.formState.errors.section_fields?.message && (
                        <p className="text-sm text-red-500">
                          {sectionFieldsForm.formState.errors.section_fields.message}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Form>
          </>
        )}
      </div>
    </>
  )
}

export default UpdateTemplateSurat
