import { UseGetEntranceDetail } from '@/pages/modules/PMB/entrance/hooks'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { SwitchStatus } from '@/pages/modules/PMB/entrance/component/switchStatus.tsx'
import ButtonEditEntrancePMB from '@/pages/modules/PMB/entrance/component/buttonEdit.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import ButtonAddContentEntrance from '@/pages/modules/PMB/entrance/content/component/buttonAdd.tsx'
import { UseGetContentEntrance } from '@/pages/modules/PMB/entrance/content/hook'
import { ColumnsContent } from '@/pages/modules/PMB/entrance/content/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const ContentEntrancePMb = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { entrance } = UseGetEntranceDetail(id as string)
  const { content, loading, meta } = UseGetContentEntrance({
    id_jalur_masuk: id as string,
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsContent()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          isBack
          label={'Koten Jalur Masuk'}
          buttonGroup={[
            {
              type: 'custom',
              element: entrance && <ButtonEditEntrancePMB showIcon={false} data={entrance} />,
            },
          ]}
        />

        <div className="grid grid-cols-[12rem_1fr] gap-4">
          <p className="text-gray-500">Nama Jalur Masuk</p>
          <p>{entrance?.nama_jalur}</p>
          <p className="text-gray-500">URL Pendaftaran</p>
          <Link
            to={entrance?.url_pendaftaran ?? '#'}
            target={'_blank'}
            className={'text-blue-500 underline decoration-blue-500'}
          >
            {entrance?.nama_jalur}
          </Link>
          <p className="text-gray-500">Urutan</p>
          <p>{entrance?.urutan}</p>
          <p className="text-gray-500">Status Tampil</p>
          {entrance && <SwitchStatus data={entrance} />}
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="w-full">
            <TitleLine title={'Daftar Konten'} />
          </div>
          <ButtonAddContentEntrance />
        </div>

        <TableCustom data={content} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
