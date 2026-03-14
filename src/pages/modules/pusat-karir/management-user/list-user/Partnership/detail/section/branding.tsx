import { useParams } from 'react-router-dom'
import { UseGetCompanyBranding } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'

export const CompanyBranding = () => {
  const { id } = useParams()
  const { branding } = UseGetCompanyBranding((id as string) ?? '')

  return (
    <>
      <TitleLine title={'Branding'} />
      <div className={'grid grid-cols-[12rem_1fr] gap-5 mt-5'}>
        <div className="col-span-2">
          <img
            src={branding?.url_foto_profil ?? '/noimg.png'}
            className={'object-contain h-[158px] w-auto'}
            alt={'asd'}
          />
        </div>
        <p className="text-gray-500">Deskripsi Singkat</p>
        <p className="font-semibold">{branding?.deskripsi_singkat}</p>
        <p className="text-gray-500">Tentang Perusahaan</p>
        <p>{branding?.tentang_perusahaan}</p>
        <p className="text-gray-500">Katrgori Industri</p>
        <p className="font-semibold">{branding?.nama_kategori_industri}</p>
        <p className="text-gray-500">Ukuran Perusahaan</p>
        <p className="font-semibold">
          {branding?.jumlah_terendah_ukuran_perusahaan} -{' '}
          {branding?.jumlah_teratas_ukuran_perusahaan}
        </p>
      </div>
    </>
  )
}
