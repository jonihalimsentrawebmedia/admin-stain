import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator.tsx'
import { UseGetFacilitiesUnitDetail } from '../hooks/index'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdOutlineHistory } from 'react-icons/md'
import ButtonProcessManagementEditor from '../component/buttonProcess'
import ButtonAgreeManagementEditor from '../component/buttonAggree'
import { ButtonRejectManagementEditor } from '../component/buttonReject'

export const DetailFacilitiesUnitPage = () => {
  const { id } = useParams()
  const { detailFacilities: detail } = UseGetFacilitiesUnitDetail(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Detail Fasilitas Unit'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <>
                  <div className={'flex items-center gap-2'}>
                    Status :{' '}
                    <p className="text-blue-600 font-semibold">
                      {detail?.status_publish?.split('_').join(' ')}
                    </p>
                    <Link
                      to={`/modules/editor/public-content/facilities-unit/edit/${detail?.id_unit_fasilitas}`}
                    >
                      <Button
                        size={'sm'}
                        variant={'outline'}
                        className={'rounded border-green-600 text-green-600 hover:text-green-600'}
                      >
                        <HiPencil />
                        Edit Data
                      </Button>
                    </Link>
                    <Link
                      to={`/modules/editor/public-content/facilities-unit/log/${detail?.id_unit_fasilitas}`}
                    >
                      <Button
                        size={'sm'}
                        variant={'outline'}
                        className={'rounded border-blue-500 text-blue-500 hover:text-blue-500'}
                      >
                        <MdOutlineHistory />
                        Log Data
                      </Button>
                    </Link>
                    {detail?.status_publish === 'DIAJUKAN_EDITOR' && (
                      <ButtonProcessManagementEditor {...(detail as any)} />
                    )}
                    {detail?.status_publish === 'PROSES_EDITOR' && (
                      <>
                        <ButtonAgreeManagementEditor {...(detail as any)} />
                        <ButtonRejectManagementEditor {...(detail as any)} />
                      </>
                    )}
                  </div>
                </>
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
