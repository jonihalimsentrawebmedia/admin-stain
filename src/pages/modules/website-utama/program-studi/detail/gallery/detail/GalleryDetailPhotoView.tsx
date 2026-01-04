import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetPhoto from '../../controller/useGetPhoto'
import Cookies from 'js-cookie'
import Search from '@/components/common/table/Search'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

const GalleryDetailPhotoView = () => {
  const { galleryPhoto } = useGetPhoto()
  const [, setSearchParams] = useSearchParams()
  const location = useLocation()
  const path = location.pathname
  const { id } = useParams()
  const handleSearch = (query: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('search', query)
      newParams.set('page', '1') // Reset ke halaman 1 saat search
      if (query === '') newParams.delete('search')
      return newParams
    })
  }
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[]}
        label="Isi Galeri Foto"
        link={
          path.includes('program-studi')
            ? `/modules/website-utama/program-studi/${id}/galeri`
            : `/modules/website-utama/fakultas/${id}/galeri`
        }
        isBack
      />
      <h3 className="text-2xl text-primary font-medium"> {Cookies.get('title')}</h3>
      <Search
        onSearch={handleSearch}
        className="rounded-lg w-full"
        position="start"
        placeholder={'Cari Foto'}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {galleryPhoto.map((item) => (
          <div className="w-full" key={item.id_galeri_foto}>
            <img src={item.link_foto} alt={item.judul} className="h-60 rounded-lg" />
            <p className="font-medium mt-2 text-[#464646]">{item.judul}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GalleryDetailPhotoView
