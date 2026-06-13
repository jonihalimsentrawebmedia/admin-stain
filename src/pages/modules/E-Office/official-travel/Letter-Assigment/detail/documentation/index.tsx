import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { UseGetDocumentation } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/hooks.tsx'
import ButtonAddDocumentation from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/buttonAdd.tsx'
import { ButtonDeleteDocumentation } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/buttonDelete.tsx'

interface props {
  id_mail_surat_tugas?: string
}

const DocumentationLetterAssigment = (props: props) => {
  const { id_mail_surat_tugas } = props
  const { id } = useParams()

  const idTugas = id_mail_surat_tugas ?? id

  const { file } = UseGetDocumentation({
    id_mail_surat_tugas: idTugas as string,
    page: '0',
    limit: '0',
  })

  return (
    <>
      <Card className={'shadow-none p-3 rounded-lg border'}>
        <CardContent className={'p-3 flex flex-col gap-3'}>
          <ButtonTitleGroup
            label={'Dokumentasi'}
            buttonGroup={[
              {
                type: 'custom',
                element: <ButtonAddDocumentation id_mail_surat_tugas={idTugas} />,
              },
            ]}
          />

          {file.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {file.map((row, k) => (
                <div
                  key={k}
                  className={'relative border rounded-lg shadow overflow-hidden w-full'}
                >
                  <div className="absolute top-0 right-0 flex gap-1.5 p-2">
                    <ButtonDeleteDocumentation data={row} id_mail_surat_tugas={idTugas} />
                  </div>
                  <img
                    src={row?.url_file}
                    alt="Dokumentasi"
                    className="w-full h-[200px] object-cover bg-gray-100 shadow"
                  />
                  <div className={'bg-white p-2'}>
                    <p className={'text-gray-500 text-xs'}>Dokumentasi #{k + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-gray-400">
              <p>Belum ada dokumentasi</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default DocumentationLetterAssigment
