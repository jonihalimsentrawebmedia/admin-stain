import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { ButtonSubmissionNewsUnit } from '@/pages/modules/website-unit/public-content/news/components/buttonSubmission.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetFacilitiesUnitDetail } from '@/pages/modules/website-unit/public-content/Facilities/hooks'
import { Separator } from '@/components/ui/separator.tsx'

export const DetailFacilitiesUnitPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { facilitiesUnitDetail: detail } = UseGetFacilitiesUnitDetail(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Detail Fasilitas Unit'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <div className={'flex items-center gap-2'}>
                  Status :{' '}
                  <p className="text-blue-600 font-semibold">
                    {detail?.status_publish?.split('_').join(' ')}
                  </p>
                  <Button
                    onClick={() =>
                      navigate(
                        `/modules/website-unit/public-content/facilities-unit/edit/${detail?.id_unit_fasilitas}?from=detail`
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
              type: 'edit',
              label: 'Edit Data',
              onClick: () => {
                navigate(
                  `/modules/website-unit/public-content/facilities/edit/${detail?.id_unit_fasilitas}`
                )
              },
              element:
                detail?.status_publish === 'DRAFT' ? (
                  <ButtonSubmissionNewsUnit {...(detail as any)} />
                ) : (
                  <></>
                ),
            },
          ]}
          isBack={true}
          link={'/modules/website-unit/public-content/facilities-unit'}
        />

        <Separator />

        <div className="px-4 sm:px-5 space-y-6">
          <p className="text-2xl sm:text-3xl font-semibold">{detail?.nama_fasilitas}</p>

          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-5">
            <div className="w-full lg:w-1/2">
              <p className="text-green-500 underline underline-offset-8 decoration-yellow-600 text-sm sm:text-base">
                Deskripsi
              </p>
              <div
                className={'tiptap ProseMirror simple-editor mt-4 text-sm sm:text-base'}
                dangerouslySetInnerHTML={{ __html: detail?.deskripsi ?? '' }}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src={detail?.gambar}
                alt="gambar fasilitas"
                className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-contain rounded-lg"
              />
            </div>
          </div>

          <p className="text-green-500 underline underline-offset-8 decoration-yellow-600 text-sm sm:text-base">
            Galeri Fasilitas
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {detail?.unit_fasilitas_gambar_tambahan?.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={item?.gambar}
                  alt="gambar fasilitas"
                  className="w-full h-[180px] sm:h-[200px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
