import { Link, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { ButtonRevision } from './component/buttonRevision.tsx'
import { ButtonReject } from './component/buttonReject.tsx'
import { ButtonApprove } from './component/buttonApprove.tsx'
import { ButtonPending } from './component/buttonPending.tsx'
import { clsx } from 'clsx'
import { UseGetDetailVerificationPartnership } from '../hooks/index.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { useState } from 'react'

export const DetailDataCompanyVerification = () => {
  const { id } = useParams()
  const { detail } = UseGetDetailVerificationPartnership((id as string) ?? '')

  const [tabActive, setTabActive] = useState('step_1')

  const TabsData = [
    {
      value: 'step_1',
      label: 'Informasi Perusahaan',
      element: (
        <>
          <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
            <p className="text-gray-500">Nama Perusahaan</p>
            <p>{detail?.data.informasi_perusahaan.nama_perusahaan}</p>
            <p className="text-gray-500">Lokasi</p>
            <p className={'capitalize'}>
              {detail?.data?.informasi_perusahaan?.lokasi.split('_').join(' ').toLowerCase()}
            </p>
            <p className="text-gray-500">Negara</p>
            <p>{detail?.data?.informasi_perusahaan?.nama_negara}</p>
            <p className="text-gray-500">Provinsi</p>
            <p>{detail?.data?.informasi_perusahaan?.nama_provinsi}</p>
            <p className="text-gray-500">Kabupaten/ Kota</p>
            <p>{detail?.data?.informasi_perusahaan?.nama_perusahaan}</p>
            <p className="text-gray-500">Kode Pos</p>
            <p>{detail?.data?.informasi_perusahaan?.kode_pos}</p>
            <p className="text-gray-500">No Telepon Kantor</p>
            <p>{detail?.data?.informasi_perusahaan?.no_telepon}</p>
            <p className="text-gray-500">Website Perusahaan</p>
            <p>{detail?.data?.informasi_perusahaan?.url_website ?? ''}</p>
            <p className="text-gray-500">Surat Permohonan Kerjasama*</p>
            <Link
              to={detail?.data.informasi_perusahaan.url_file_permohonan ?? '#'}
              target={'_blank'}
              className={'underline underline-offset-4 decoration-2 udeline-blue-500 text-blue-500'}
            >
              Buka File
            </Link>
          </div>
        </>
      ),
    },
    {
      value: 'step_2',
      label: 'Informasi Kontak',
      element: (
        <>
          <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
            <p className="text-gray-500">Nama Lengkap</p>
            <p>{detail?.data.informasi_kontak?.nama_lengkap}</p>
            <p className="text-gray-500">Jabaan</p>
            <p className={'capitalize'}>{detail?.data?.informasi_kontak?.jabatan}</p>
            <p className="text-gray-500">No. Handphone</p>
            <p>{detail?.data?.informasi_kontak?.no_handphone}</p>
            <p className="text-gray-500">Email</p>
            <p>{detail?.data?.informasi_kontak?.email}</p>
            <p className="text-gray-500">Telepon Kerja</p>
            <p>{detail?.data?.informasi_kontak?.telepon_kerja}</p>
            <p className="text-gray-500">Username</p>
            <p>{detail?.data?.informasi_kontak?.username}</p>
          </div>
        </>
      ),
    },
  ]

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

        <div
          className={clsx(
            'border border-blue-700 text-blue-700 w-fit rounded-full',
            ' px-3 p-1.5 my-4 flex items-center gap-1.5'
          )}
        >
          <MdInfo className={'size-5'} />
          Pasitkan data yang diisi benar.
        </div>

        <Tabs className={'mt-5'} value={tabActive} onValueChange={(e) => setTabActive(e)}>
          <TabsList className={'bg-white rounded w-fit h-full! flex gap-x-4'}>
            {TabsData?.map((row, k) => {
              return (
                <TabsTrigger
                  key={k}
                  value={row?.value}
                  className={clsx(
                    'shadow-none! border! border-primary rounded-full text-gray-400 p-1.5 px-3',
                    'group data-[state=active]:text-primary'
                  )}
                >
                  <div
                    className={clsx(
                      'rounded-full p-1.5 text-xs size-7 text-primary bg-muted',
                      'flex items-center justify-center group-data-[state=active]:bg-primary',
                      'group-data-[state=active]:text-white'
                    )}
                  >
                    {k + 1}.
                  </div>{' '}
                  {row?.label}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {TabsData?.map((row, k) => (
            <TabsContent key={k} value={row?.value}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
