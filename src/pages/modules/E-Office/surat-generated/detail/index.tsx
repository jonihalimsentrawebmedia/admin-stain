import { useParams } from 'react-router-dom'
import { UseGetDetailSuratGenerated } from '../hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { FaFilePdf } from 'react-icons/fa'
import { generatePdfSurat } from '../utils/pdf'
import { toast } from 'react-toastify'

const DetailSuratGenerated = () => {
  const { id } = useParams<{ id: string }>()
  const { detail, loading } = UseGetDetailSuratGenerated(id as string)

  if (loading) {
    return (
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Detail Surat'} buttonGroup={[]} />
        <div className="text-center py-10">Memuat data...</div>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Detail Surat'} buttonGroup={[]} />
        <div className="text-center py-10">Data tidak ditemukan</div>
      </div>
    )
  }

  const mainData = detail.surat_generated
  const sectionValues = detail.section_values ?? []

  return (
    <div className="space-y-5">
      <ButtonTitleGroup
        isBack
        label={'Detail Surat'}
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <Button
                key="btn-pdf"
                onClick={async () => {
                  if (detail) {
                    try {
                      await generatePdfSurat(detail)
                    } catch {
                      toast.error('Gagal generate PDF')
                    }
                  }
                }}
                variant="outline"
                className="bg-white text-red-600 border-red-400 hover:bg-red-50 hover:text-red-700"
              >
                <FaFilePdf className="mr-2 size-4" />
                Download PDF
              </Button>
            ),
          },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Informasi Surat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[12rem_1fr] gap-4">
            <p className="text-gray-500">Judul</p>
            <p className="font-medium">{mainData.judul}</p>

            <p className="text-gray-500">Nomor Surat</p>
            <p>{mainData.nomor_surat || '-'}</p>

            <p className="text-gray-500">Status</p>
            <p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  mainData.status === 'PUBLISH'
                    ? 'bg-green-100 text-green-800'
                    : mainData.status === 'DRAFT'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {mainData.status}
              </span>
            </p>

            <p className="text-gray-500">Catatan Internal</p>
            <p>{mainData.catatan_internal || '-'}</p>

            <p className="text-gray-500">Dibuat Oleh</p>
            <p>{mainData.nama_user_created || '-'}</p>

            <p className="text-gray-500">Diupdate Oleh</p>
            <p>{mainData.nama_user_updated || '-'}</p>

            <p className="text-gray-500">Dibuat Pada</p>
            <p>
              {mainData.created_at
                ? format(new Date(mainData.created_at), 'dd MMMM yyyy HH:mm', { locale: localeId })
                : '-'}
            </p>

            <p className="text-gray-500">Diupdate Pada</p>
            <p>
              {mainData.updated_at
                ? format(new Date(mainData.updated_at), 'dd MMMM yyyy HH:mm', { locale: localeId })
                : '-'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Konten Surat
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-2">
              {sectionValues.length} Section
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sectionValues.length === 0 ? (
            <p className="text-sm text-gray-400">Tidak ada konten</p>
          ) : (
            sectionValues.map((item, index) => (
              <div
                key={item.id_surat_section_value ?? index}
                className="border rounded-lg p-4 space-y-2"
              >
                <p className="text-sm font-semibold text-gray-600">Section {index + 1}</p>
                <div
                  className="text-sm text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.konten_render }}
                />
                {item.values && Object.keys(item.values).length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Value Mapping:</p>
                    <div className="grid grid-cols-[8rem_1fr] gap-1 text-xs text-gray-500">
                      {Object.entries(item.values).map(([key, val]) => (
                        <div key={key} className="contents">
                          <span className="font-mono text-blue-600">{`{{${key}}}`}</span>
                          <span>: {val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailSuratGenerated
