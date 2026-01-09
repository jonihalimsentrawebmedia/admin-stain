import { UseGetDetailDataProdi } from '@/pages/modules/website-prodi/data-prodi/hooks'
import { ProfilePageSkeleton } from '@/pages/modules/website-utama/profile/components/skeleton.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { useNavigate } from 'react-router-dom'

export const DataProdiProfile = () => {
  const { dataProdi, loading } = UseGetDetailDataProdi()
  const navigate = useNavigate()

  return (
    <>
      {loading ? (
        <ProfilePageSkeleton />
      ) : (
        <>
          <ButtonTitleGroup
            label={'Data Utama Universitas'}
            buttonGroup={[
              {
                label: 'Ajukan Edit Data',
                onClick: () => navigate('edit'),
                type: 'edit',
              },
            ]}
          />

          <div className="flex items-start gap-5 mt-5">
            <div className="flex flex-col gap-1">
              <p>Logo</p>
              <div className="border border-[#70F2B1] bg-[#F5FFFA] p-5 rounded">
                <img src={dataProdi?.logo} className="size-40 object-contain" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>Favicon</p>
              <div className="border border-[#70F2B1] bg-[#F5FFFA] p-5 rounded">
                <img src={dataProdi?.favicon} className="size-15 object-contain" />
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
                <p>{dataProdi?.kelompok ?? '-'}</p>
                <p className="text-gray-500">Nama Prodi</p>
                <p>{dataProdi?.nama ?? '-'}</p>
                <p className="text-gray-500">Keyword</p>
                <p>{dataProdi?.keyword ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'address'} title={'Alamat Lengkap'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Alamat</p>
                <p>{dataProdi?.alamat ?? '-'}</p>
                <p className="text-gray-500">Provinsi</p>
                <p>{dataProdi?.provinsi ?? '-'}</p>
                <p className="text-gray-500">Kabupaten Kota</p>
                <p>{dataProdi?.kabupaten_kota ?? '-'}</p>
                <p className="text-gray-500">Kecamatan</p>
                <p>{dataProdi?.kecamatan ?? '-'}</p>
                <p className="text-gray-500">Kelurahan/Desa</p>
                <p>{dataProdi?.kelurahan ?? '-'}</p>
                <p className="text-gray-500">Kode Pos</p>
                <p>{dataProdi?.kode_pos ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'contact'} title={'Kontak Resmi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Telepon</p>
                <p>{dataProdi?.telepon ?? '-'}</p>
                <p className="text-gray-500">Fax</p>
                <p>{dataProdi?.fax ?? '-'}</p>
                <p className="text-gray-500">Email</p>
                <p>{dataProdi?.email ?? '-'}</p>
              </div>
            </AccordionCustom>

            <AccordionCustom name={'media'} title={'Media Sosial'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Facebook</p>
                <p>{dataProdi?.facebook ?? '-'}</p>
                <p className="text-gray-500">Twitter</p>
                <p>{dataProdi?.twitter ?? '-'}</p>
                <p className="text-gray-500">Instagram</p>
                <p>{dataProdi?.instagram ?? '-'}</p>
                <p className="text-gray-500">Youtube</p>
                <p>{dataProdi?.youtube ?? '-'}</p>
              </div>
            </AccordionCustom>
          </Accordion>
        </>
      )}
    </>
  )
}
