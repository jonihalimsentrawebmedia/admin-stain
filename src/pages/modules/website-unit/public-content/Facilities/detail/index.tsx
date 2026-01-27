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
                        `/modules/website-unit/public-content/facilities-unit/edit/${detail?.id_unit_fasilitas}`
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
        />

        <Separator />

        <p className="text-3xl font-semibold">{detail?.nama_fasilitas}</p>
        <div className="flex items-start gap-5">
          <div className="w-1/2">
            <p className="text-green-500 underline underline-offset-8 decoration-yellow-600">
              Deksripsi
            </p>
            <div
              className={'tiptap ProseMirror simple-editor mt-4'}
              dangerouslySetInnerHTML={{ __html: detail?.deskripsi ?? '' }}
            />
          </div>
          <div className="w-1/2">
            <img
              src={detail?.gambar}
              alt="gambar fasilitas"
              className="w-full h-[400px] object-contain"
            />
          </div>
        </div>

        <p className="text-green-500 underline underline-offset-8 decoration-yellow-600">
          Galeri Fasilitas
        </p>
        <div className="grid grid-cols-5">
          {detail?.unit_fasilitas_gambar_tambahan?.map((item, index) => (
            <div key={index}>
              <img
                src={item?.gambar}
                alt="gambar fasilitas"
                className="w-[300px] h-[200px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
