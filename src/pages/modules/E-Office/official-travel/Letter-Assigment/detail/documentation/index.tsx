import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDocumentation } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/hooks.tsx'
import ButtonAddDocumentation from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/buttonAdd.tsx'
import { ButtonDeleteDocumentation } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/buttonDelete.tsx'
import { Button } from '@/components/ui/button.tsx'
import { MdPrint } from 'react-icons/md'
import { DocumentationPdf } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/pdfMake.ts'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import pdfmake from '@/utils/pdfmake.ts'

const DocumentationLetterAssigment = () => {
  const { id } = useParams()
  const { file } = UseGetDocumentation({
    id_mail_surat_tugas: id as string,
    page: '0',
    limit: '0',
  })

  return (
    <>
      <ButtonTitleGroup
        isBack
        label={'Dokumentasi'}
        buttonGroup={[
          {
            type: 'custom',
            element: <ButtonAddDocumentation />,
          },
          {
            type: 'custom',
            element: (
              <Button
                className={'text-white'}
                onClick={async () => {
                  if (file) {
                    const documentationImages: Record<string, string> = {}
                    await Promise.all(
                      file.dokumentasi.map(async (item) => {
                        documentationImages[item.url_file] = await GetBase64FromUrl(item.url_file)
                      })
                    )
                    const logoBase64 = await GetBase64FromUrl(file?.kop_surat?.url_logo ?? '')
                    const pdfConfig = DocumentationPdf({
                      data: file,
                      logoBase64: logoBase64,
                      documentationImages: documentationImages,
                    })
                    pdfmake.createPdf(pdfConfig).open()
                  }
                }}
              >
                <MdPrint />
                Cetak Dokumentasi
              </Button>
            ),
          },
        ]}
      />

      {file && file?.dokumentasi?.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 mt-5">
          {file?.dokumentasi?.map((row, k) => (
            <div key={k} className={'relative border rounded-lg shadow overflow-hidden w-full'}>
              <div className="absolute top-0 right-0 flex gap-1.5 p-2">
                <ButtonDeleteDocumentation data={row} />
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
    </>
  )
}

export default DocumentationLetterAssigment
