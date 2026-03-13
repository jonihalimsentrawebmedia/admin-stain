import { useParams } from 'react-router-dom'
import { UseGetCompanyMediaSocial } from '../../hooks/index'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'

const ItemValue = ({ value, title }: { title: string; value: string | any }) => {
  return (
    <div className={'flex flex-col gap-1.5'}>
      <p className="text-gray-500">{title}</p>
      <div className="font-semibold">{value}</div>
    </div>
  )
}

export const SocialMedia = () => {
  const { id } = useParams()
  const { mediaSocial } = UseGetCompanyMediaSocial((id as string) ?? '')

  return (
    <>
      <TitleLine title={'Media Sosial & Kontak Publik'} />

      <div className={'grid grid-cols-2 gap-5 mt-5'}>
        <ItemValue title={'LinkedIn'} value={mediaSocial?.url_linkedin ?? '-'} />
        <ItemValue title={'Instagram'} value={mediaSocial?.url_instagram ?? '-'} />
        <ItemValue title={'Email Recuitment'} value={mediaSocial?.email_recuitment ?? '-'} />
        <ItemValue title={'Website Karir'} value={mediaSocial?.url_website_karir ?? '-'} />
      </div>
    </>
  )
}
