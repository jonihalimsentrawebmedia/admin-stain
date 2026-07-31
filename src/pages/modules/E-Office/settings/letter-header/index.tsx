import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { UseGetUnitActive } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { cn } from '@/lib/utils.ts'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { SettingLetterHeadSchema, type TSettingLetterHeadForm } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import {
  ConvertUrlToBase64,
  UseGetLetterHeader,
} from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { useQueryClient } from '@tanstack/react-query'
import LetterHeaderPDF from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig.ts'
import { Button } from '@/components/ui/button.tsx'
import { MdDownload } from 'react-icons/md'
import { IoMdEye } from 'react-icons/io'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import pdfMake from '@/utils/pdfmake'

export const LetterHeader = () => {
  const [idSelected, setIdSelected] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [urlPDf, setUrlPDf] = useState<string>()

  const PDF_FONT_FAMILIES = [
    'Arial',
    'Bookman Old Style',
    'Courier New',
    'Georgia',
    'Impact',
    'Roboto',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
  ]
  const { institution } = UseGetUnitActive()
  const { letterHeader } = UseGetLetterHeader(idSelected)
  const { base64 } = ConvertUrlToBase64(letterHeader?.url_logo as string)

  useEffect(() => {
    if (institution) {
      setIdSelected(institution?.[0]?.id_satuan_organisasi)
    }
  }, [institution])

  const form = useForm<TSettingLetterHeadForm>({
    resolver: zodResolver(SettingLetterHeadSchema),
  })

  useEffect(() => {
    if (letterHeader) {
      form.reset({
        url_logo: letterHeader?.url_logo,
        pengaturan: letterHeader?.pengaturan ?? [],
      })
    }
  }, [letterHeader])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TSettingLetterHeadForm) => {
    setLoading(true)
    const normalizeColor = (warna?: string): string | undefined => {
      if (!warna || warna.trim() === '') return undefined
      let color = warna.trim().replace(/^#/, '')
      if (color.length === 8) color = color.slice(0, 6)
      if (!/^[0-9A-Fa-f]{6}$/.test(color)) return undefined
      return `#${color.toUpperCase()}`
    }

    const filtered = value.pengaturan
      .map((item: any) => {
        const normalized = normalizeColor(item.warna)
        if (normalized) {
          return { ...item, warna: normalized }
        }
        const { warna, ...rest } = item
        return rest
      })
      .filter((item: any) => item.isi && item.isi.trim() !== '')
    await AxiosClient.post(`/eoffice/kop-surat/${idSelected}`, {
      url_logo: value.url_logo,
      key_logo: `logo-${idSelected}`,
      pengaturan: filtered,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['letter-header'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  console.log(form.watch('pengaturan'))

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Kop Surat'} buttonGroup={[
          { type: 'custom', element: <ButtonGoToGuide titleGuide={'Kop Surat'} valueGuide="E_OFFICE_LETTER_HEADER" /> },
        ]} />

        <div className="flex items-start gap-4 w-full">
          <ul className={'flex flex-col gap-2 max-w-80 border p-4 rounded bg-white shadow'}>
            {institution?.map((row, k) => (
              <li
                onClick={() => setIdSelected(row.id_satuan_organisasi)}
                key={k}
                className={cn(
                  row?.id_satuan_organisasi === idSelected ? 'bg-primary text-white' : '',
                  'p-1.5 rounded text-sm cursor-pointer'
                )}
              >
                {row?.nama}
              </li>
            ))}
          </ul>
          <Card className={'w-full p-2.5'}>
            <CardContent className={'p-2.5'}>
              <ButtonTitleGroup
                label={`Pengaturan Kop Surat -${institution?.find((row) => row?.id_satuan_organisasi === idSelected)?.nama}`}
                buttonGroup={[
                  {
                    type: 'custom',
                    element: (
                      <Button
                        className={'text-white'}
                        onClick={() => {
                          const { generateContent } = LetterHeaderPDF({
                            header: letterHeader as any,
                            imageUrl: base64?.startsWith('data:')
                              ? base64
                              : `data:image/png;base64,${base64}`,
                          })
                          const docDefinition: any = {
                            pageMargins: [40, 40, 40, 60],
                            content: generateContent(),
                          }
                          const pdf = pdfMake.createPdf(docDefinition)
                          pdf.download('Kop Surat')
                        }}
                      >
                        <MdDownload />
                        Download
                      </Button>
                    ),
                  },
                  {
                    type: 'custom',
                    element: (
                      <Button
                        className={'text-white'}
                        onClick={async () => {
                          const { generateContent } = LetterHeaderPDF({
                            header: letterHeader as any,
                            imageUrl: base64?.startsWith('data:')
                              ? base64
                              : `data:image/png;base64,${base64}`,
                          })

                          const docDefinition: any = {
                            pageMargins: [40, 40, 40, 60],
                            content: generateContent(),
                          }
                          const blob: any = await pdfMake.createPdf(docDefinition).getBlob()
                          const url = URL.createObjectURL(blob)
                          setUrlPDf(url)
                          setOpen(true)
                        }}
                      >
                        <IoMdEye />
                        Preview
                      </Button>
                    ),
                  },
                ]}
              />

              <Form {...form}>
                <form
                  className={'flex flex-col gap-4 mt-4'}
                  onSubmit={form.handleSubmit(HandleSave)}
                >
                  <UploadPhotoImage
                    name={'url_logo'}
                    ratio_height={1}
                    ratio_width={1}
                    form={form}
                  />

                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}>
                      <p className="text-lg font-semibold">Urutan {i + 1}</p>
                      <div className="flex items-center gap-2">
                        <TextInput
                          name={`pengaturan.${i}.isi`}
                          form={form}
                          placeholder={'Isi'}
                          className={'[&>label]:hidden! w-full'}
                        />
                        <SelectBasicInput
                          name={`pengaturan.${i}.jenis_font`}
                          form={form}
                          placeholder={'Jenis Font'}
                          usePortal
                          className={'w-full'}
                          data={PDF_FONT_FAMILIES?.map((row) => ({
                            value: row,
                            label: row,
                          }))}
                        />
                        <SelectBasicInput
                          name={`pengaturan.${i}.gaya_font`}
                          form={form}
                          placeholder={'Gaya Font'}
                          className={'w-full'}
                          usePortal
                          data={[
                            { label: 'Bold', value: 'bold' },
                            { label: 'Italic', value: 'italic' },
                            { label: 'Normal', value: 'normal' },
                          ]}
                        />
                        <TextInput
                          name={`pengaturan.${i}.ukuran_font`}
                          form={form}
                          placeholder={'Ukuran'}
                          className={'[&>label]:hidden! w-full'}
                          type={'number'}
                          isNumber
                        />
                        <TextInput
                          name={`pengaturan.${i}.warna`}
                          form={form}
                          placeholder={'warna'}
                          className={'[&>label]:hidden! w-full'}
                          type={'color'}
                        />
                      </div>
                    </div>
                  ))}

                  <ButtonForm loading={loading} />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <DialogBasic
        title={'Preview Kop Surat'}
        open={open}
        setOpen={setOpen}
        className={'min-w-5xl'}
      >
        <iframe src={urlPDf} width={'100%'} height={'600'} />
      </DialogBasic>
    </>
  )
}
