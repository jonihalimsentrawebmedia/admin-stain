import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetDetailTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/hooks'
import { UseGetTypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/hooks'
import ColumnsTypeTemplate from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/data/columns.tsx'
import ButtonCodeTemplateAvailable from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/component/showTemplate.tsx'
import ButtonAddTypeTemplate from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/component/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const DetailLetterType = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letter } = UseGetDetailTypeLetter(id as string)
  const { loading, typeTemplate, meta } = UseGetTypeTemplateLetter({
    page,
    search,
    limit,
    id_jenis_surat: id as string,
  })
  const { columns } = ColumnsTypeTemplate()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          rootButtonClassName={'flex flex-col lg:flex-row gap-2'}
          isBack
          label={`Detail ${letter?.nama_jenis_surat} - (${letter?.kategori_jenis_surat})`}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonCodeTemplateAvailable type={letter?.kategori_jenis_surat} />,
            },
            {
              type: 'custom',
              element: <ButtonAddTypeTemplate />,
            },
          ]}
        />

        <p className="text-blue-500 text-xs lg:text-base">
          NB: Sebelum menambahkan Jenis Surat, pastikan Kode Jenis Surat telah tersedia. Gunakan
          kode yang sudah terdaftar untuk menjaga konsistensi data.
        </p>

        <TableCustom data={typeTemplate} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default DetailLetterType
