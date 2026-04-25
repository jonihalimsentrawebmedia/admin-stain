import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetUniversityData } from '@/pages/modules/website-utama/profile/hooks'
import { AccordionCustom } from '@/components/common/accordion'
import { Accordion } from '@/components/ui/accordion.tsx'
import { ProfilePageSkeleton } from '@/pages/modules/website-utama/profile/components/skeleton.tsx'
import { ButtonCancelApproval } from './components/buttonCancel'
import { useState } from 'react'
import { MdInfo } from 'react-icons/md'

export const ProfilePageMainWebsite = () => {
  const [realData, setRealData] = useState(true)
  const navigate = useNavigate()
  const { loading, detailUniversity } = UseGetUniversityData({
    real_data: realData,
  })

  return (
    <>
      {loading ? (
        <ProfilePageSkeleton />
      ) : (
        <>
          <ButtonTitleGroup
            label={'Data Utama Universitas'}
            buttonGroup={
              detailUniversity?.status_publish == 'DIAJUKAN_EDITOR'
                ? [
                    {
                      type: 'cancel',
                      element: <ButtonCancelApproval />,
                    },
                  ]
                : [
                    {
                      label: 'Ajukan Edit Data',
                      onClick: () => navigate('edit'),
                      type: 'edit',
                    },
                  ]
            }
          />
          {detailUniversity?.status_publish == 'DIAJUKAN_EDITOR' && (
            <div
              className={'border border-blue-500 rounded flex p-2 w-fit items-center gap-1.5 mt-5'}
            >
              <MdInfo className={'size-5 text-blue-500'} />
              {realData
                ? 'Data yang tampil adalah data yang asli. Untuk melihat data yang anda ajukan'
                : 'Data yang tampil adalah data yang anda ajukan. Untuk melihat data asli'}
              <button className={'text-blue-500'} onClick={() => setRealData(!realData)}>
                KLIK DISINI
              </button>
            </div>
          )}

          <div className="flex items-start gap-5 mt-5">
            <div className="flex flex-col gap-1">
              <p>Logo</p>
              <div className="border border-[#70F2B1] bg-[#F5FFFA] p-5 rounded">
                <img src={detailUniversity?.logo} className="size-40 object-contain" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>Favicon</p>
              <div className="border border-[#70F2B1] bg-[#F5FFFA] p-5 rounded">
                <img src={detailUniversity?.favicon} className="size-15 object-contain" />
              </div>
            </div>
          </div>

          <Accordion
            type={'multiple'}
            defaultValue={['identity', 'address', 'contact', 'media']}
            className={'mt-5 flex flex-col gap-5'}
          >
            <AccordionCustom name={'identity'} title={'Identitas Institusi'}>
              <div className={'flex flex-col gap-2.5 lg:grid grid-cols-[12rem_1fr] lg:gap-5'}>
                <p className="text-gray-500">Kelompok</p>
                <p>{detailUniversity?.kelompok ?? '-'}</p>
                <p className="text-gray-500">Nama Universitas / Perguruan Tinggi</p>
                <p>{detailUniversity?.nama ?? '-'}</p>
                <p className="text-gray-500">Singkatan</p>
                <p>{detailUniversity?.singkatan ?? '-'}</p>
                <p className="text-gray-500">Keyword</p>
                <p>{detailUniversity?.keyword ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'address'} title={'Alamat Lengkap'}>
              <div className={'flex flex-col gap-2.5 lg:grid grid-cols-[12rem_1fr] lg:gap-5'}>
                <p className="text-gray-500">Alamat</p>
                <p>{detailUniversity?.alamat ?? '-'}</p>
                <p className="text-gray-500">Provinsi</p>
                <p>{detailUniversity?.provinsi ?? '-'}</p>
                <p className="text-gray-500">Kabupaten Kota</p>
                <p>{detailUniversity?.kabupaten_kota ?? '-'}</p>
                <p className="text-gray-500">Kecamatan</p>
                <p>{detailUniversity?.kecamatan ?? '-'}</p>
                <p className="text-gray-500">Kelurahan/Desa</p>
                <p>{detailUniversity?.kelurahan ?? '-'}</p>
                <p className="text-gray-500">Kode Pos</p>
                <p>{detailUniversity?.kode_pos ?? '-'}</p>
                <p className="text-gray-500">Link Google Map</p>
                <p>{detailUniversity?.link_google_map ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'contact'} title={'Kontak Resmi'}>
              <div className={'flex flex-col gap-2.5 lg:grid grid-cols-[12rem_1fr] lg:gap-5'}>
                <p className="text-gray-500">Telepon</p>
                <p>{detailUniversity?.telepon ?? '-'}</p>
                <p className="text-gray-500">Fax</p>
                <p>{detailUniversity?.fax ?? '-'}</p>
                <p className="text-gray-500">Email</p>
                <p>{detailUniversity?.email ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'media'} title={'Media Sosial'}>
              <div className={'flex flex-col gap-2.5 lg:grid grid-cols-[12rem_1fr] lg:gap-5'}>
                <p className="text-gray-500">Facebook</p>
                <p>{detailUniversity?.facebook ?? '-'}</p>
                <p className="text-gray-500">Twitter</p>
                <p>{detailUniversity?.twitter ?? '-'}</p>
                <p className="text-gray-500">Instagram</p>
                <p>{detailUniversity?.instagram ?? '-'}</p>
                <p className="text-gray-500">Youtube</p>
                <p>{detailUniversity?.youtube ?? '-'}</p>
              </div>
            </AccordionCustom>
          </Accordion>
        </>
      )}
    </>
  )
}
