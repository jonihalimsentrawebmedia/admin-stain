import { UseGetSliderButtonDetailEditor } from '../hooks/index'
import { Link, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdOutlineHistory } from 'react-icons/md'
import ButtonProcessManagementEditor from '../component/buttonProcess.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import ButtonAgreeManagementEditor from '../component/buttonAgree.tsx'
import { ButtonRejectManagementEditor } from '../component/buttonReject.tsx'

export const UseGetBottomSliderDetail = () => {
  const { id } = useParams()
  const { detailSlider: detail } = UseGetSliderButtonDetailEditor(id ?? '')

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          isBack
          label={'Detail Slider Bawah'}
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
                      to={`/modules/editor/public-content/slider/bottom-slider/edit/${detail?.id_slider_bawah}`}
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
                      to={`/modules/editor/public-content/slider/bottom-slider/log/${detail?.id_slider_bawah}`}
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
        />

        <Separator />

        <img src={detail?.gambar} className={'w-1/2 h-auto object-contain'} />
        <p className={'text-gray-500'}>Keterangan</p>
        <p className={''} dangerouslySetInnerHTML={{ __html: detail?.keterangan ?? '' }} />
      </div>
    </>
  )
}
