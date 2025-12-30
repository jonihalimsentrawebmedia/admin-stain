import { UseGetPhotoGallerySelected } from '@/pages/modules/website-utama/campus-life/hooks'
import { ButtonSearchPhoto } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/photo/buttonSearchPhoto.tsx'
import {
  ButtonDelete
} from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/photo/buttonDelete.tsx'

export const PhotoSection = () => {
  const { photoSelected } = UseGetPhotoGallerySelected()
  return (
    <>
      <p className="text-blue-500">Pilih 3 konten yang akan ditampilkan</p>

      <div className={'grid grid-cols-3 gap-8 mt-5'}>
        {photoSelected.map((item, k) => (
          <div key={k} className="">
            <img
              src={item?.link_foto}
              alt="thumbaik"
              className={'rounded w-full h-[240px] bg-primary-foreground'}
            />
            <p>{item?.judul}</p>
            <div className="flex items-center justify-center gap-2">
              <ButtonSearchPhoto isChange idChange={item?.id_kehidupan_kampus_galeri} />
              <ButtonDelete data={item}/>
            </div>
          </div>
        ))}
        {photoSelected.length < 3 && <ButtonSearchPhoto />}
      </div>
    </>
  )
}
