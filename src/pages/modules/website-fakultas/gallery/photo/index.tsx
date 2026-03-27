import { UseGetGalleryPhoto } from './hooks/index.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPhoto } from './component/buttonAdd.tsx'
import { useParams } from 'react-router-dom'
import { ButtonEditPhoto } from '@/pages/modules/website-fakultas/gallery/photo/component/buttonEdit.tsx'
import { ButtonDeletePhoto } from '@/pages/modules/website-fakultas/gallery/photo/component/buttonDelete.tsx'

export const ListGalleryPhoto = () => {
  const { id } = useParams()
  const { photo } = UseGetGalleryPhoto({
    id_album: (id as string) ?? '',
  })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="Galeri Foto"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPhoto />,
            },
          ]}
        />

        <div className="grid grid-cols-4 gap-5 mt-4">
          {photo?.map((row, index) => (
            <div key={index} className="relative flex flex-col gap-2 shadow">
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1.5">
                <ButtonEditPhoto data={row} />
                <ButtonDeletePhoto data={row} />
              </div>
              <img
                src={row?.link_foto}
                alt={row?.judul}
                className="w-full h-[240px] object-cover bg-primary rounded"
              />
              <p className={'font-semibold px-2 pb-2'}>{row?.judul}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
