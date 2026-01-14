import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { Separator } from '@/components/ui/separator.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetFacilitiesDetail } from '@/pages/modules/website-utama/public-content/facilities/hooks'
import { IconTitle } from '@/components/common/icon'
import { FaPhone } from 'react-icons/fa6'
import { IoMailSharp } from 'react-icons/io5'
import { ButtonSubmissionFacilities } from '@/pages/modules/website-utama/public-content/facilities/components/buttonSubmission.tsx'
import type { IFacilitiesDetail } from '@/pages/modules/website-utama/public-content/facilities/data'

export const DetailFacilitiesPage = () => {
  const { id } = useParams()
  const { detailFacilities: detail } = UseGetFacilitiesDetail(id ?? '')
  const navigate = useNavigate()

  return (
    <>
      <div className={'flex flex-col gap-5 px-2'}>
        <ButtonTitleGroup
          label={'Detail Agenda'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <div className={'flex items-center gap-2'}>
                  Status :{' '}
                  <p className="text-blue-600 font-semibold">
                    {detail?.status_publish.split('_').join(' ')}
                  </p>
                  <Button
                    onClick={() =>
                      navigate(
                        `/modules/editor/public-content/facilities/edit/${detail?.id_fasilitas}`
                      )
                    }
                    className={'border-primary text-primary hover:text-primary'}
                    variant={'outline'}
                  >
                    <HiPencil /> Edit Data
                  </Button>
                </div>
              ),
            },
            {
              type: 'custom',
              element:
                detail?.status_publish === 'DRAFT' ? (
                  <div className={'flex items-center gap-1.5 border-l border-gray-500 pl-2'}>
                    <ButtonSubmissionFacilities {...(detail as IFacilitiesDetail)} />
                  </div>
                ) : (
                  <></>
                ),
            },
          ]}
          isBack={true}
        />
        <Separator className={'my-5'} />

        <div className={'flex items-start gap-x-8 px-5'}>
          <div className="w-7/12">
            <p className="text-2xl font-semibold">{detail?.nama_fasilitas}</p>

            <div>
              <p className="text-gray-500">Deskripsi</p>
              <div
                className={'flex flex-col gap-4 mt-2'}
                dangerouslySetInnerHTML={{ __html: detail?.deskripsi ?? '' }}
              />
            </div>
          </div>

          <div className="w-5/12">
            <img
              src={detail?.gambar}
              alt="image"
              className="w-full h-[456px] object-cover rounded-md"
            />
          </div>
        </div>

        <div
          className={
            'p-5 rounded-lg w-full bg-linear-to-r from-[#3FA936] to-[#0C6939] flex items-center gap-x-8'
          }
        >
          <div className="w-2/3">
            <div
              className={`flex items-center gap-2 p-1.5 bg-white  rounded-md px-4 text-primary w-fit`}
            >
              <IconTitle fill={'fill-primary'} />
              <p>Informasi Umum</p>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <p className="text-white text-sm">Jam Operasional</p>
              <p className="text-white font-semibold">{detail?.jam_operasional}</p>
              <p className="text-white text-sm">Alamat</p>
              <p className="text-white font-semibold">{detail?.alamat}</p>
            </div>

            <div className="mt-5 bg-white rounded-md p-5">
              <p>
                <span className={'text-xl font-semibold text-primary'}>Perlu Bantuan?</span>{' '}
                <span className={'text-xl font-semibold'}>Anda dapat menghubungi kami disini.</span>
              </p>
              <div className="mt-1.5 gap-2 flex items-center w-fit">
                <Button
                  variant={'outline'}
                  size={'lg'}
                  className={'border border-primary text-primary hover:text-primary h-12'}
                >
                  <FaPhone /> {detail?.no_hp_pembantu}
                </Button>
                <Button
                  variant={'outline'}
                  size={'lg'}
                  className={'border border-primary text-primary hover:text-primary h-12'}
                >
                  <IoMailSharp /> {detail?.email_pembantu}
                </Button>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <iframe src={detail?.link_google_map} className={'w-full h-[280px] rounded-md'} />
          </div>
        </div>
      </div>
    </>
  )
}
