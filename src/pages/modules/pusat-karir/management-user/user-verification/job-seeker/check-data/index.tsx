import { UseGetDetailVerificationJobSeeker } from '@/pages/modules/pusat-karir/management-user/user-verification/job-seeker/hooks'
import { Link, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { ButtonRevision } from './component/buttonRevision.tsx'
import { ButtonReject } from './component/buttonReject.tsx'
import { ButtonApprove } from './component/buttonApprove.tsx'
import { clsx } from 'clsx'
import { ButtonPending } from '@/pages/modules/pusat-karir/management-user/user-verification/job-seeker/check-data/component/buttonPending.tsx'

export const DetailDataUserVerification = () => {
  const { id } = useParams()
  const { detail } = UseGetDetailVerificationJobSeeker((id as string) ?? '')

  return (
    <>
      <div className={'space-y-4 bg-white p-5'}>
        <ButtonTitleGroup
          label={'Periksa Data User - Pencari Kerja'}
          buttonGroup={[
            {
              type: 'custom',
              element: detail?.status_pendaftaran !== 'REVISI' && <ButtonRevision data={detail} />,
            },
            {
              type: 'custom',
              element: detail?.status_pendaftaran !== 'DITOLAK' && <ButtonReject data={detail} />,
            },
            {
              type: 'custom',
              element: detail?.status_pendaftaran === 'PENDING' && <ButtonApprove data={detail} />,
            },
            {
              type: 'custom',
              element: (detail?.status_pendaftaran === 'REVISI' ||
                detail?.status_pendaftaran === 'DITOLAK') && <ButtonPending data={detail} />,
            },
          ]}
        />
        {detail?.status_pendaftaran === 'PENDING' ? (
          <div
            className={clsx(
              'border border-blue-700 text-blue-700 w-fit rounded-full',
              ' px-3 p-1.5 my-4 flex items-center gap-1.5'
            )}
          >
            <MdInfo className={'size-5'} />
            Pasitkan data yang diisi benar.
          </div>
        ) : detail?.status_pendaftaran === 'REVISI' ? (
          <div
            className={
              'bg-yellow-50 text-yellow-500 border-yellow-500 p-1.5 rounded- w-fit border rounded'
            }
          >
            Alasan Revisi: {detail?.alasan_revisi}
          </div>
        ) : (
          detail?.status_pendaftaran === 'DITOLAK' && (
            <div
              className={
                'bg-red-50 text-red-500 border-red-500 p-1.5 rounded- w-fit border rounded'
              }
            >
              Alasan Ditolak: {detail?.alasan_ditolak}
            </div>
          )
        )}

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Nama Lengkap</p>
          {detail?.nama}
          <p className="text-gray-500">Pendidikan Terakhir</p>
          <p>{detail?.jenjang_pendidikan}</p>
          <p className="text-gray-500">Universitas Asal</p>
          <p>{detail?.nama_universitas ?? '-'}</p>
          <p className="text-gray-500">Fakultas</p>
          <p>{detail?.nama_fakultas}</p>
          <p className="text-gray-500">Prodi</p>
          <p>{detail?.nama_prodi}</p>
          <p className="text-gray-500">NIM</p>
          <p>{detail?.nim}</p>
          <p className="text-gray-500">UPLOAD SCAN KTM</p>
          <Link
            to={detail?.url_ktm ?? '#'}
            target="_blank"
            className="text-blue-500 underline underline-offset-4 decoration-2"
          >
            Buka File
          </Link>
          <p className="text-gray-500">Status Mahasiswa</p>
          <p>{detail?.status_mahasiswa}</p>
          <p className="text-gray-500">No. Handphone</p>
          <p>{detail?.no_handphone}</p>
          <p className="text-gray-500">Email</p>
          <p>{detail?.no_handphone}</p>
          <p className="text-gray-500">Statu Email</p>
          <p>{detail?.is_verified ? 'Sudah Verifikasi' : 'Belum Verifikasi'}</p>
        </div>
      </div>
    </>
  )
}
