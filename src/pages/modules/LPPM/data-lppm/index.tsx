import { UseGetDetailDataLPPM } from './hooks/index'
import { ProfilePageSkeleton } from '@/pages/modules/website-utama/profile/components/skeleton.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { useNavigate } from 'react-router-dom'
import { ButtonCancelApproval } from '@/pages/modules/LPPM/data-lppm/component/buttonCancel.tsx'
import { MdInfo } from 'react-icons/md'
import { useState } from 'react'

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

          {dataLPPM?.status_publish == 'DIAJUKAN_EDITOR' && (
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
                <img src={dataLPPM?.logo} className="size-40 object-contain" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>Favicon</p>
              <div className="border border-[#70F2B1] bg-[#F5FFFA] p-5 rounded">
                <img src={dataLPPM?.favicon} className="size-15 object-contain" />
              </div>
            </div>
          </div>

          <Accordion
            type={'multiple'}
            defaultValue={['identity', 'address', 'contact', 'media']}
            className={'mt-5 flex flex-col gap-5'}
          >
            <AccordionCustom name={'identity'} title={'Identitas Institusi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Kelompok</p>
                <p>{dataLPPM?.kelompok ?? '-'}</p>
                <p className="text-gray-500">Nama Unit</p>
                <p>{dataLPPM?.nama ?? '-'}</p>
                <p className="text-gray-500">Keyword</p>
                <p>{dataLPPM?.keyword ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'address'} title={'Alamat Lengkap'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Alamat</p>
                <p>{dataLPPM?.alamat ?? '-'}</p>
                <p className="text-gray-500">Provinsi</p>
                <p>{dataLPPM?.provinsi ?? '-'}</p>
                <p className="text-gray-500">Kabupaten Kota</p>
                <p>{dataLPPM?.kabupaten_kota ?? '-'}</p>
                <p className="text-gray-500">Kecamatan</p>
                <p>{dataLPPM?.kecamatan ?? '-'}</p>
                <p className="text-gray-500">Kelurahan/Desa</p>
                <p>{dataLPPM?.kelurahan ?? '-'}</p>
                <p className="text-gray-500">Kode Pos</p>
                <p>{dataLPPM?.kode_pos ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'contact'} title={'Kontak Resmi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Telepon</p>
                <p>{dataLPPM?.telepon ?? '-'}</p>
                <p className="text-gray-500">Fax</p>
                <p>{dataLPPM?.fax ?? '-'}</p>
                <p className="text-gray-500">Email</p>
                <p>{dataLPPM?.email ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'media'} title={'Media Sosial'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Facebook</p>
                <p>{dataLPPM?.facebook ?? '-'}</p>
                <p className="text-gray-500">Twitter</p>
                <p>{dataLPPM?.twitter ?? '-'}</p>
                <p className="text-gray-500">Instagram</p>
                <p>{dataLPPM?.instagram ?? '-'}</p>
                <p className="text-gray-500">Youtube</p>
                <p>{dataLPPM?.youtube ?? '-'}</p>
              </div>
            </AccordionCustom>
          </Accordion>
        </>
      )}
    </>
  )
}
