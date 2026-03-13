import { Link, useParams } from 'react-router-dom'
import { UseGetCompanyInformation } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { Input } from '@/components/ui/input.tsx'

export const CompanyInformation = () => {
  const { id } = useParams()
  const { information } = UseGetCompanyInformation((id as string) ?? '')

  return (
    <>
      <TitleLine title={'Informasi Perusahaan'} />
      <div className={'grid grid-cols-[12rem_1fr] gap-5 mt-5'}>
        <p className="text-gray-500">Nama Perusahaan</p>
        <p className="font-semibold">{information?.nama_perusahaan}</p>
        <p className="text-gray-500">Lokasi</p>
        <label className="font-semibold w-fit flex items-center gap-2 capitalize whitespace-nowrap">
          <Input type={'radio'} checked readOnly />
          {information?.lokasi.split('_').join(' ').toLowerCase()}
        </label>
        <p className="text-gray-500">Negara</p>
        <p className="font-semibold">{information?.nama_negara}</p>
        <p className="text-gray-500">Provinsi</p>
        <p className="font-semibold">{information?.nama_provinsi}</p>
        <p className="text-gray-500">Kabupaten/Kota</p>
        <p className="font-semibold">{information?.nama_kabupaten_kota}</p>
        <p className="text-gray-500">Kode Pos</p>
        <p className="font-semibold">{information?.kode_pos}</p>
        <p className="text-gray-500">No. Telepon</p>
        <p className="font-semibold">{information?.no_telepon}</p>
        <p className="text-gray-500">Website Perusahaan</p>
        <p className="font-semibold">{information?.url_website}</p>
        <p className="text-gray-500">Surat Permohonan Kerjasama*</p>
        <Link
          to={information?.url_file_permohonan ?? '#'}
          target="_blank"
          className={'underline underline-offset-4 decoration-2 decoration-blue-500 text-blue-500'}
        >
          Buka File
        </Link>
      </div>
    </>
  )
}
