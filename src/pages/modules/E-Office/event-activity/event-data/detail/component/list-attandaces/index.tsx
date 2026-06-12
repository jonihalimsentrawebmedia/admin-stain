import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import ButtonAddAttendance from './component/buttonAdd.tsx'
import { UseGetAttendance, UseGetAttendancePrint } from './component/hooks.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { ColumnsAttendance } from './component/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { IoPrintSharp } from 'react-icons/io5'
import pdfMake from 'pdfmake/build/pdfmake'
import { GenerateListAttendance } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/list-attandaces/printData'
import { ConvertUrlToBase64 } from '@/pages/modules/E-Office/settings/letter-header/hooks'

interface props {
  detail?: IEvent
}

const ListAttendance = (props: props) => {
  const { detail } = props
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { attendance, loading, meta } = UseGetAttendance({
    id_acara: id as string,
    page,
    limit,
    search,
  })
  const { attendance: PrintData } = UseGetAttendancePrint(id as string)
  const { base64 } = ConvertUrlToBase64(PrintData?.cetak_config?.kop_surat?.url_logo ?? '')
  const columns = ColumnsAttendance()

  const HandlePrint = () => {
    if (detail && PrintData) {
      const { docDefinition } = GenerateListAttendance({
        values: PrintData?.cetak_config,
        attendance: PrintData?.daftar_hadir,
        event: detail,
        header: PrintData?.cetak_config.kop_surat,
        imageUrl: base64?.startsWith('data:') ? base64 : `data:image/png;base64,${base64}`,
      })
      pdfMake.createPdf(docDefinition).open()
    }
  }

  return (
    <>
      <Card className={'p-2 rounded shadow-none'}>
        <CardContent className="space-y-5 p-2">
          <ButtonTitleGroup
            label={'Daftar Hadir'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Button
                    onClick={() => {
                      HandlePrint()
                    }}
                    className={'text-white'}
                  >
                    <IoPrintSharp />
                    Cetak
                  </Button>
                ),
              },
              { type: 'custom', element: <ButtonAddAttendance /> },
            ]}
          />
          <TableCustom data={attendance} columns={columns} loading={loading} meta={meta} />
        </CardContent>
      </Card>
    </>
  )
}
export default ListAttendance
