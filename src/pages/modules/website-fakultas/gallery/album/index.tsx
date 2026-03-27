import { UseGetGalleryAlbum } from '../album/hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsGalleryAlbum } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddAlbum } from './component/buttonAdd.tsx'

export const ListGalleryAlbum = () => {
  const { album, loading, meta } = UseGetGalleryAlbum()
  const columns = ColumnsGalleryAlbum()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="Galeri Foto"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddAlbum />,
            },
          ]}
        />

        <TableCustom data={album} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
