import { UseGetVideoGallerySelected } from '@/pages/modules/website-utama/campus-life/hooks'
import { ButtonSearch } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/video/buttonSearch.tsx'
import { ButtonDelete } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/video/buttonDelete.tsx'

export const VideoSectionCampusLife = () => {
  const { videoSelected } = UseGetVideoGallerySelected()

  return (
    <>
      <p className="text-blue-500">Pilih 3 konten yang akan ditampilkan</p>

      <div className={'grid grid-cols-3 gap-8 mt-5'}>
        {videoSelected.map((item, k) => (
          <div key={k} className="">
            <img
              src={item?.thumbnail}
              alt="thumbaik"
              className={'rounded w-full h-[240px] bg-primary-foreground'}
            />
            <p>{item?.judul}</p>
            <div className="flex items-center justify-center gap-2">
              <ButtonSearch isChange idChange={item?.id_kehidupan_kampus_galeri} />
              <ButtonDelete data={item} />
            </div>
          </div>
        ))}
        {videoSelected.length < 3 && <ButtonSearch />}
      </div>
    </>
  )
}
