import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Form } from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { FaFilePdf } from 'react-icons/fa'
import { UseGetDetailTemplateSurat } from '@/pages/modules/E-Office/reference/template-surat/hooks'
import { UseGetSumberList, UseGetSumberDetail, UseGenerateSurat } from './hooks'
import { generatePdfBlobUrl } from '@/pages/modules/E-Office/surat-generated/utils/pdf'
import { toast } from 'react-toastify'

const GenerateSuratSchema = z.object({
  sumber: z.string({ error: 'Sumber harus dipilih' }),
  parameter: z.array(
    z.object({
      key_parameter: z.string(),
      value: z.string().optional(),
    })
  ),
  value_map: z.array(
    z.object({
      field: z.string(),
      label: z.string(),
      value: z.string().min(1, { message: 'Value harus diisi' }),
      is_sumber: z.boolean(),
    })
  ),
})

type TGenerateSuratForm = z.infer<typeof GenerateSuratSchema>

const GenerateSuratView = () => {
  const { id } = useParams<{ id: string }>()

  // --- ViewModel state ---
  const { templateSurat, loading: loadingDetail } = UseGetDetailTemplateSurat(id as string)
  const { data: sumberList = [], isLoading: loadingSumber } = UseGetSumberList()
  const [selectedSumber, setSelectedSumber] = useState<string | null>(null)
  const { data: sumberDetail, isLoading: loadingSumberDetail } = UseGetSumberDetail(selectedSumber)
  const { mutateAsync: generateSurat, isPending: loadingGenerate } = UseGenerateSurat()

  const [generatedPdf, setGeneratedPdf] = useState<string | null>(null)
  const generatedId = useRef<string | null>(null)
  const prevBlobUrl = useRef<string | null>(null)

  // Cleanup blob URL saat component unmount
  useEffect(() => {
    return () => {
      if (prevBlobUrl.current) {
        URL.revokeObjectURL(prevBlobUrl.current)
      }
    }
  }, [])

  const isManual = selectedSumber === 'MANUAL'

  // --- Form ---
  const form = useForm<TGenerateSuratForm>({
    resolver: zodResolver(GenerateSuratSchema),
    defaultValues: {
      sumber: '',
      parameter: [],
      value_map: [],
    },
  })

  const {
    fields: parameterFields,
    append: appendParameter,
    remove: removeParameter,
  } = useFieldArray({ control: form.control, name: 'parameter' })

  const {
    fields: valueMapFields,
    update: updateValueMap,
    remove: removeValueMap,
    replace: replaceValueMap,
  } = useFieldArray({ control: form.control, name: 'value_map' })

  // Reset parameter & value_map when sumber changes
  useEffect(() => {
    form.setValue('parameter', [])
    if (sumberDetail && !isManual) {
      const params = (sumberDetail.parameter ?? []).map((p) => ({
        key_parameter: p.key_parameter,
        value: '',
      }))
      form.setValue('parameter', params)
    }
  }, [sumberDetail, isManual, form])

  // Init value_map from template fields
  useEffect(() => {
    if (templateSurat) {
      const fields = templateSurat.fields ?? []
      const initialMap = fields.map((f) => ({
        field: f.key_placeholder,
        label: f.label,
        value: '',
        is_sumber: !isManual,
      }))
      replaceValueMap(initialMap)
    }
  }, [templateSurat, isManual, replaceValueMap])

  const sumberOptions = [
    { value: 'MANUAL', label: 'Manual Input' },
    ...sumberList.map((s) => ({ value: s, label: s })),
  ]

  const getDataMapOptions = () => {
    if (!sumberDetail || isManual) return []
    return (sumberDetail.data_map ?? []).map((d) => ({
      value: d,
      label: d,
    }))
  }

  const HandleGenerate = async (value: TGenerateSuratForm) => {
    if (!id) return
    try {
      const result = await generateSurat({
        idTemplateSurat: id,
        body: {
          sumber: value.sumber,
          parameter: value.parameter
            .filter((p) => p.value && p.value.trim() !== '')
            .map((p) => ({ key_parameter: p.key_parameter, value: p.value! })),
          value_map: value.value_map.map((v) => ({
            field: v.field,
            value: v.value,
            is_sumber: v.is_sumber,
          })),
        },
      })

      if (result?.status) {
        toast.success(result?.message || 'Surat berhasil digenerate')

        const pdfUrl = result?.data?.pdf_url || result?.data?.file_url

        if (pdfUrl) {
          setGeneratedPdf(pdfUrl)
        } else if (result?.data?.surat_generated && result?.data?.section_values) {
          // Generate PDF client-side dari data surat
          const blobUrl = await generatePdfBlobUrl(result.data)
          // Cleanup blob URL sebelumnya
          if (prevBlobUrl.current) {
            URL.revokeObjectURL(prevBlobUrl.current)
          }
          prevBlobUrl.current = blobUrl
          setGeneratedPdf(blobUrl)
          generatedId.current = result.data.surat_generated.id_surat_generated
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal generate surat')
    }
  }

  if (loadingDetail) {
    return (
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Generate Surat'} buttonGroup={[]} />
        <div className="text-center py-10">Memuat data template...</div>
      </div>
    )
  }

  if (!templateSurat) {
    return (
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Generate Surat'} buttonGroup={[]} />
        <div className="text-center py-10">Template tidak ditemukan</div>
      </div>
    )
  }

  const mainData = templateSurat.templateSurat
  const sections = templateSurat.sections ?? []
  const fields = templateSurat.fields ?? []

  return (
    <div className="space-y-5">
      <ButtonTitleGroup isBack label={'Generate Surat'} buttonGroup={[]} />

      {/* Template Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[12rem_1fr] gap-4">
            <p className="text-gray-500">Nama Template</p>
            <p className="font-medium">{mainData.nama_template}</p>
            <p className="text-gray-500">Deskripsi</p>
            <p>{mainData.deskripsi}</p>
          </div>
        </CardContent>
      </Card>

      {/* Generate Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleGenerate)} className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Konfigurasi Generate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sumber */}
              <SelectBasicInput
                name={'sumber'}
                form={form}
                label={'Sumber Data'}
                placeholder={'Pilih sumber data'}
                data={sumberOptions}
                isRequired
                isLoading={loadingSumber}
                fx={(opt: any) => {
                  setSelectedSumber(opt?.value ?? null)
                }}
              />

              {/* Parameters (only if sumber selected and not manual) */}
              {selectedSumber && !isManual && (
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">Parameter Filter</p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => appendParameter({ key_parameter: '', value: '' })}
                    >
                      <BiPlus /> Tambah Parameter
                    </Button>
                  </div>

                  {loadingSumberDetail ? (
                    <p className="text-sm text-gray-400">Memuat parameter...</p>
                  ) : (
                    <>
                      {parameterFields.map((field, index) => (
                        <div key={field.id} className="flex items-end gap-3">
                          <div className="flex-1">
                            <TextInput
                              name={`parameter.${index}.key_parameter`}
                              form={form}
                              label={'Key Parameter'}
                              placeholder={'Contoh: ID_STATUS_AKTIF'}
                              isRequired
                            />
                          </div>
                          <div className="flex-1">
                            <TextInput
                              name={`parameter.${index}.value`}
                              form={form}
                              label={'Value'}
                              placeholder={'Nilai parameter'}
                            />
                          </div>
                          <button
                            type="button"
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 mb-1"
                            onClick={() => removeParameter(index)}
                          >
                            <BiTrash />
                          </button>
                        </div>
                      ))}

                      {parameterFields.length === 0 && (
                        <p className="text-sm text-gray-400">
                          Tidak ada parameter. Klik "Tambah Parameter" jika diperlukan.
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Value Mapping */}
          <Card>
            <CardHeader>
              <CardTitle>Mapping Field Template</CardTitle>
              <p className="text-sm text-gray-400">
                Mapping placeholder template dengan value dari sumber data atau input manual.
              </p>
            </CardHeader>
            <CardContent>
              {fields.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Tidak ada field/placeholder pada template ini.
                </p>
              ) : (
                <div className="space-y-4">
                  {valueMapFields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-600">{field.label}</span>
                          <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-blue-600">
                            {'{{'}
                            {field.field}
                            {'}}'}
                          </code>
                        </div>
                        {!isManual && (
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input
                              type="checkbox"
                              checked={field.is_sumber}
                              onChange={(e) => {
                                const checked = e.target.checked
                                updateValueMap(index, {
                                  ...valueMapFields[index],
                                  is_sumber: checked,
                                  value: '',
                                })
                              }}
                              className="rounded"
                            />
                            Dari Sumber
                          </label>
                        )}
                        <button
                          type="button"
                          className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => removeValueMap(index)}
                        >
                          <BiTrash />
                        </button>
                      </div>

                      {isManual || !field.is_sumber ? (
                        <TextInput
                          name={`value_map.${index}.value`}
                          form={form}
                          label={'Value Manual'}
                          placeholder={'Masukkan nilai manual'}
                          isRequired
                        />
                      ) : (
                        <SelectBasicInput
                          name={`value_map.${index}.value`}
                          form={form}
                          label={'Pilih Field Sumber'}
                          placeholder={'Pilih field dari sumber'}
                          data={getDataMapOptions()}
                          isRequired
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <ButtonForm loading={loadingGenerate || loadingSumberDetail} />
        </form>
      </Form>

      {/* Template Sections Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview Template</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.map((item, index) => (
            <div key={item.id_template_section ?? index} className="border rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Section {item.urutan ?? index + 1}: {item.judul_section}
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.konten_section}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Result PDF Preview */}
      {generatedPdf && (
        <Card>
          <CardHeader>
            <CardTitle>Preview PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-green-600 font-medium">
                ✓ Surat berhasil digenerate
              </span>
              <a
                href={generatedPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                download
              >
                <FaFilePdf className="size-4" />
                Download PDF
              </a>
            </div>
            <iframe
              src={generatedPdf}
              className="w-full border border-gray-200 rounded-lg"
              style={{ height: '70vh' }}
              title="Preview PDF"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default GenerateSuratView
