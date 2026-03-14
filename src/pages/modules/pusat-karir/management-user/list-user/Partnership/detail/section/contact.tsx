import { useParams } from 'react-router-dom'
import { UseGetCompanyContact } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'

export const CompanyContact = () => {
  const { id } = useParams()
  const { contact } = UseGetCompanyContact((id as string) ?? '')

  return (
    <>
      <TitleLine title={'Informasi Kontak'} />
      <div className={'grid grid-cols-[12rem_1fr] gap-5 mt-5'}>
        <p className="text-gray-500">Nama Lengkap</p>
        <p className="font-semibold">{contact?.nama_lengkap}</p>
        <p className="text-gray-500">Jabatan</p>
        <p>{contact?.jabatan}</p>
        <p className="text-gray-500">No. Handphone</p>
        <p className="font-semibold">{contact?.no_handphone}</p>
        <p className="text-gray-500">Email</p>
        <p className="font-semibold">{contact?.email}</p>
        <p className="text-gray-500">Telepon Kerja</p>
        <p className="font-semibold">{contact?.telepon_kerja}</p>
        <p className="text-gray-500">Username</p>
        <p className="font-semibold">{contact?.username}</p>
      </div>
    </>
  )
}
