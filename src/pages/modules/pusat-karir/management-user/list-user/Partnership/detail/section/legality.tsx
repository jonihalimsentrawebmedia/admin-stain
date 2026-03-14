import { Link, useParams } from 'react-router-dom'
import { UseGetCompanyLegality } from '../../hooks/index'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'

const ItemValue = ({ value, title }: { title: string; value: string | any }) => {
  return (
    <div className={'flex flex-col gap-1.5'}>
      <p className="text-gray-500">{title}</p>
      <div className="font-semibold">{value}</div>
    </div>
  )
}

export const CompanyLegality = () => {
  const { id } = useParams()
  const { legality } = UseGetCompanyLegality((id as string) ?? '')

  return (
    <>
      <TitleLine title={'Legalitas'} />
      <div className={'grid grid-cols-2 gap-5 mt-5'}>
        <ItemValue title={'NPWP'} value={legality?.npwp ?? '-'} />
        <ItemValue
          title={'File NPWP'}
          value={
            <Link
              to={legality?.npwp ?? '#'}
              target={'_blank'}
              className={
                'underline underline-offset-4 decoration-2 decoration-blue-500 text-blue-500'
              }
            >
              Buka File
            </Link>
          }
        />
        <ItemValue title={'NIB'} value={legality?.nib ?? '-'} />
        <ItemValue
          title={'File NIB'}
          value={
            <Link
              to={legality?.nib ?? '#'}
              target={'_blank'}
              className={
                'underline underline-offset-4 decoration-2 decoration-blue-500 text-blue-500'
              }
            >
              Buka File
            </Link>
          }
        />
        <ItemValue title={'Alamat'} value={legality?.alamat_kantor ?? '-'} />
        <ItemValue
          title={'Link Google Maps'}
          value={
            <Link
              to={legality?.link_google_maps ?? '#'}
              target={'_blank'}
              className={
                'underline underline-offset-4 decoration-2 decoration-blue-500 text-blue-500'
              }
            >
              Buka Maps
            </Link>
          }
        />
      </div>
    </>
  )
}
