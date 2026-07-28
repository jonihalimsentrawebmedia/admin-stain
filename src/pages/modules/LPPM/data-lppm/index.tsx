import { UseGetDetailDataLPPM } from './hooks/index'
import { ProfilePageSkeleton } from '@/pages/modules/website-utama/profile/components/skeleton.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { useNavigate } from 'react-router-dom'
import { ButtonCancelApproval } from '@/pages/modules/LPPM/data-lppm/component/buttonCancel.tsx'
import { MdInfo } from 'react-icons/md'
import { useState } from 'react'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'

export const DetailProfileLPPM = () => {
  const [realData, setRealData] = useState(false)
  const { dataLPPM, loading } = UseGetDetailDataLPPM({
    real_data: realData,
  })
  const navigate = useNavigate()

  return (
    <>
      {loading ? (
        <ProfilePageSkeleton />
      ) : (
        <>
          <ButtonTitleGroup
            label={'Data Utama Universitas'}
            buttonGroup={
              dataLPPM?.status_publish == 'DIAJUKAN_EDITOR'
                ? [
                    {
                      type: 'custom',
                      element: (
                        <ButtonGoToGuide
                          titleGuide="Data Utama Universitas"
                          valueGuide="LPPM_PROFIL_SATUAN_ORGANISASI"
                        />
                      ),
                    },
                    {
                      type: 'cancel',
                      element: <ButtonCancelApproval />,
                    },
                  ]
                : [
                    {
                      type: 'custom',
                      element: (
                        <ButtonGoToGuide
                          titleGuide="Data Utama Universitas"
                          valueGuide="LPPM_PROFIL_SATUAN_ORGANISASI"
                        />
                      ),
                    },
                    {
                      label: 'Ajukan Edit Data',
                      onClick: () => navigate('edit'),
                      type: 'edit',
                    },
                  ]
            }
          />

          {dataLPPM?.status_publish == 'DIAJUKAN_EDITOR' && (
            <div
              className={'border border-blue-500 rounded flex flex-wrap p-2 w-full sm:w-fit items-center gap-1.5 mt-5'}
            >
              <MdInfo className={'size-5 text-blue-500 shrink-0'} />
              <span className="text-xs sm:text-sm">
                {realData
                  ? 'Data yang tampil adalah data yang asli. Untuk melihat data yang anda ajukan'
                  : 'Data yang tampil adalah data yang anda ajukan. Untuk melihat data asli'}
              </span>
              <button className={'text-blue-500 text-xs sm:text-sm'} onClick={() => setRealData(!realData)}>
                KLIK DISINI
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
            <div className="flex flex-col gap-1">
              <p>Logo</p>
              <div className="border border-[#70F2B1] bg-[#F5FFFA] p-3 sm:p-5 rounded">
                <img src={dataLPPM?.logo} className="size-28 sm:size-40 object-contain" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>Favicon</p>
              <div className="border border-[#70F2B1] bg-[#F5FFFA] p-3 sm:p-5 rounded">
                <img src={dataLPPM?.favicon} className="size-12 sm:size-15 object-contain" />
              </div>
            </div>
          </div>

          <Accordion
            type={'multiple'}
            defaultValue={['identity', 'address', 'contact', 'media']}
            className={'mt-5 flex flex-col gap-5'}
          >
            <AccordionCustom name={'identity'} title={'Identitas Institusi'}>
              <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-5'}>
                <p className="text-gray-500 text-sm sm:text-base">Kelompok</p>
                <p className="break-words">{dataLPPM?.kelompok ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Nama Unit</p>
                <p className="break-words">{dataLPPM?.nama ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Keyword</p>
                <p className="break-words">{dataLPPM?.keyword ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'address'} title={'Alamat Lengkap'}>
              <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-5'}>
                <p className="text-gray-500 text-sm sm:text-base">Alamat</p>
                <p className="break-words">{dataLPPM?.alamat ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Provinsi</p>
                <p className="break-words">{dataLPPM?.provinsi ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Kabupaten Kota</p>
                <p className="break-words">{dataLPPM?.kabupaten_kota ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Kecamatan</p>
                <p className="break-words">{dataLPPM?.kecamatan ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Kelurahan/Desa</p>
                <p className="break-words">{dataLPPM?.kelurahan ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Kode Pos</p>
                <p className="break-words">{dataLPPM?.kode_pos ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Link Google Map</p>
                <p className="break-words">{dataLPPM?.link_google_map ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'contact'} title={'Kontak Resmi'}>
              <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-5'}>
                <p className="text-gray-500 text-sm sm:text-base">Telepon</p>
                <p className="break-words">{dataLPPM?.telepon ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Fax</p>
                <p className="break-words">{dataLPPM?.fax ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Email</p>
                <p className="break-words">{dataLPPM?.email ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'media'} title={'Media Sosial'}>
              <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-5'}>
                <p className="text-gray-500 text-sm sm:text-base">Facebook</p>
                <p className="break-words">{dataLPPM?.facebook ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Twitter</p>
                <p className="break-words">{dataLPPM?.twitter ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Instagram</p>
                <p className="break-words">{dataLPPM?.instagram ?? '-'}</p>
                <p className="text-gray-500 text-sm sm:text-base">Youtube</p>
                <p className="break-words">{dataLPPM?.youtube ?? '-'}</p>
              </div>
            </AccordionCustom>
          </Accordion>
        </>
      )}
    </>
  )
}
