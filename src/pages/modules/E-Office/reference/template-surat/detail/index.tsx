import { useParams, useNavigate } from 'react-router-dom'
import { UseGetDetailTemplateSurat } from '@/pages/modules/E-Office/reference/template-surat/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

const StatusBadge = ({ status }: { status: string }) => {
  const colorClass =
    status === 'PUBLISH'
      ? 'bg-green-100 text-green-800'
      : status === 'DRAFT'
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-gray-100 text-gray-800'

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  )
}

const DetailTemplateSurat = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { templateSurat, loading } = UseGetDetailTemplateSurat(id as string)

  if (loading) {
    return (
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Detail Template Surat'} buttonGroup={[]} />
        <div className="text-center py-10">Memuat data...</div>
      </div>
    )
  }

  if (!templateSurat) {
    return (
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Detail Template Surat'} buttonGroup={[]} />
        <div className="text-center py-10">Data tidak ditemukan</div>
      </div>
    )
  }

  const mainData = templateSurat.template_surat
  const sections = templateSurat.sections ?? []
  const fields = templateSurat.fields ?? []

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={'Detail Template Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  className={'rounded-full text-white hover:text-white'}
                  onClick={() =>
                    navigate(`/modules/e-office/reference/template-surat/generate/${id}`)
                  }
                >
                  Generate Surat
                </Button>
              ),
            },
            {
              type: 'edit',
              label: 'Edit',
              onClick: () =>
                navigate(`/modules/e-office/reference/template-surat/update/${id}`),
            },
          ]}
        />

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

              <p className="text-gray-500">Status</p>
              <p>
                <StatusBadge status={mainData.status} />
              </p>

              <p className="text-gray-500">Dibuat Oleh</p>
              <p>{mainData.nama_user_created || '-'}</p>

              <p className="text-gray-500">Diupdate Oleh</p>
              <p>{mainData.nama_user_updated || '-'}</p>

              <p className="text-gray-500">Dibuat Pada</p>
              <p>
                {mainData.created_at
                  ? format(new Date(mainData.created_at), 'dd MMMM yyyy HH:mm', {
                      locale: localeId,
                    })
                  : '-'}
              </p>

              <p className="text-gray-500">Diupdate Pada</p>
              <p>
                {mainData.updated_at
                  ? format(new Date(mainData.updated_at), 'dd MMMM yyyy HH:mm', {
                      locale: localeId,
                    })
                  : '-'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Section Template
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-2">
                {sections.length} Section
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.map((item, index) => (
              <div key={item.id_template_section ?? index} className="border rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-gray-600">
                  Section {item.urutan ?? index + 1}
                </p>
                <div className="grid grid-cols-[8rem_1fr] gap-2">
                  <p className="text-gray-500 text-sm">Judul</p>
                  <p className="font-medium">{item.judul_section}</p>

                  <p className="text-gray-500 text-sm">Tipe</p>
                  <p>{item.tipe_section ?? '-'}</p>

                  <p className="text-gray-500 text-sm">Konten</p>
                  <p>{item.konten_section}</p>
                </div>
              </div>
            ))}

            {sections.length === 0 && (
              <p className="text-sm text-gray-400">Tidak ada section</p>
            )}
          </CardContent>
        </Card>

        {fields.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                Field / Placeholder
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-2">
                  {fields.length} Field
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">#</th>
                      <th className="text-left py-2 px-3">Key Placeholder</th>
                      <th className="text-left py-2 px-3">Label</th>
                      <th className="text-left py-2 px-3">Tipe Input</th>
                      <th className="text-left py-2 px-3">Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((item, index) => (
                      <tr key={item.id_section_field ?? index} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{item.urutan ?? index + 1}</td>
                        <td className="py-2 px-3 font-mono text-blue-600">
                          {'{{'}{item.key_placeholder}{'}}'}
                        </td>
                        <td className="py-2 px-3">{item.label}</td>
                        <td className="py-2 px-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {item.tipe_input}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          {item.is_required ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Required
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Optional
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

export default DetailTemplateSurat
