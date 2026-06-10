import { Card, CardContent } from '@/components/ui/card.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { cn } from '@/lib/utils.ts'
import { useEffect, useState } from 'react'
import { UseGetContext, UseGetReportActivityContext, UseGetReportActivityPrint } from './hooks.tsx'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { RichText } from '@/components/common/richtext'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { IoPrintSharp } from 'react-icons/io5'
import { ConvertUrlToBase64 } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { generatePdfLaporanKegiatan } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/report-activity/printData'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'
import pdfmake from '@/utils/pdfmake.ts'

interface Props {
  detail?: IEvent
}

const ReportActivity = (props: Props) => {
  const { detail } = props
  const { id } = useParams()
  const [tabsSelected, setTabsSelected] = useState<string>()
  const [isEdit, setIsEdit] = useState(true)
  const [loading, setLoading] = useState(false)

  const { context } = UseGetContext(id as string)
  const { report: listReport } = UseGetReportActivityPrint(id as string)
  const { report } = UseGetReportActivityContext({
    context: tabsSelected as string,
    id_acara: id as string,
  })

  const { base64 } = ConvertUrlToBase64(listReport?.cetak_config?.kop_surat?.url_logo ?? '')

  const HandlePrint = async () => {
    if (detail && listReport) {
      const docDefinition = await generatePdfLaporanKegiatan({
        event: detail,
        printData: listReport,
        imageUrl: `data:image/png;base64,${base64}`,
      })
      pdfmake.createPdf(docDefinition).open()
    }
  }

  useEffect(() => {
    if (!tabsSelected && context) {
      setTabsSelected(context?.[0]?.context)
    }
    if (report) {
      form.reset({
        laporan: report?.laporan,
      })
      if (report?.laporan.trim()) {
        setIsEdit(false)
      } else {
        setIsEdit(true)
      }
    }
  }, [context, report])

  const form = useForm<{
    laporan: string
  }>()

  const queryClient = useQueryClient()
  const HandleSave = async (value: { laporan: string }) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/acara/${id}/laporan-kegiatan/context/${tabsSelected}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setIsEdit(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['report-activity-context'],
          })
          queryClient.invalidateQueries({
            queryKey: ['report-activity-print'],
          })
          queryClient.invalidateQueries({
            queryKey: ['context'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <Card>
        <CardContent className={'space-y-2.5 p-3 shadow-none'}>
          <ButtonTitleGroup
            label={'Laporan Kegiatan'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Button onClick={() => HandlePrint()} className={'text-white'}>
                    <IoPrintSharp />
                    Cetak
                  </Button>
                ),
              },
            ]}
          />

          <Tabs
            value={tabsSelected}
            onValueChange={setTabsSelected}
            className="w-full h-full flex-col! gap-x-2"
          >
            <TabsList
              className={
                'flex flex-col! rounded gap-2 h-full w-full items-start p-2.5 border bg-white'
              }
            >
              <p className={'font-semibold text-sm border p-2 w-fit rounded'}>Daftar Isi</p>
              <div className={'flex items-center gap-2 overflow-x-auto w-full whitespace-nowrap'}>
                {context?.map((row, k) => (
                  <TabsTrigger
                    key={k}
                    value={row?.context}
                    className={cn(
                      'w-full shadow-none rounded-none drop-shadow-none border-none',
                      'data-[state=active]:bg-blue-200 data-[state=active]:text-primary'
                    )}
                  >
                    <p className={'whitespace-nowrap text-start w-full'}>{row?.nama}</p>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
            {context?.map((row, l) => (
              <TabsContent value={row?.context} key={l} className={'w-full'}>
                <Card className={'p-2 shadow-none'}>
                  <CardContent className={'space-y-4 p-2'}>
                    <div className="flex items-center justify-between gap-4">
                      <p className={'text-2xl font-semibold'}>{row?.nama}</p>
                      {!isEdit && (
                        <Button
                          onClick={() => setIsEdit(!isEdit)}
                          className={'bg-yellow-500 hover:bg-yellow-600 text-white'}
                        >
                          <HiPencil />
                          Edit
                        </Button>
                      )}
                    </div>
                    {isEdit ? (
                      <Form {...form}>
                        <form
                          className={'flex flex-col gap-4'}
                          onSubmit={form.handleSubmit(HandleSave)}
                        >
                          <RichText form={form} name={'laporan'} isRow={false} showLabel={false} />
                          <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
                        </form>
                      </Form>
                    ) : (
                      <>
                        <div className="w-full">
                          <RenderHTMLContent content={report?.laporan ?? ''} />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}

export default ReportActivity
