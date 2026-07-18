import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { HiPencil } from 'react-icons/hi'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetNewsStatus } from '@/pages/modules/website-lembaga/public-content/news/hooks'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useEffect } from 'react'
import { DraftSectionTabs } from '@/pages/modules/website-lembaga/public-content/news/components/table/draftSection.tsx'
import { SubmissionSection } from '@/pages/modules/website-lembaga/public-content/news/components/table/SubmissionSection.tsx'
import { ProcessSection } from '@/pages/modules/website-lembaga/public-content/news/components/table/processSection.tsx'
import { RejectionSection } from '@/pages/modules/website-lembaga/public-content/news/components/table/rejectionSection.tsx'
import { ApproveSection } from '@/pages/modules/website-lembaga/public-content/news/components/table/ApproveSection.tsx'
import { PublishSection } from '@/pages/modules/website-lembaga/public-content/news/components/table/publishSection.tsx'
import { UpPublishSection } from '@/pages/modules/website-lembaga/public-content/news/components/table/upPublishSection.tsx'
import { toast } from 'react-toastify'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const NewsPublicContentPage = () => {
  const navigate = useNavigate()
  const { status } = UseGetNewsStatus()

  const [searchParams, setSearchParams] = useSearchParams()

  const statusParams = searchParams.get('status')

  useEffect(() => {
    if (!statusParams) {
      setSearchParams({ status: 'DRAFT' })
    }
  }, [statusParams])

  const DataTabs = [
    {
      id: 1,
      name: (
        <div className="p-1 sm:p-2 flex items-center gap-1 sm:gap-1.5">
          <p className="text-xs sm:text-sm">Draft</p>
          <div className="bg-red-500 size-3.5 sm:size-4 text-white rounded-full text-[10px] sm:text-xs flex items-center justify-center">{status?.DRAFT}</div>
        </div>
      ),
      value: 'DRAFT',
      element: <DraftSectionTabs />,
    },
    {
      id: 2,
      name: (
        <div className="p-1 sm:p-2 flex items-center gap-1 sm:gap-1.5">
          <p className="text-xs sm:text-sm">Diajukan<span className="hidden sm:inline"> Ke Editor</span></p>
          <div className="bg-red-500 size-3.5 sm:size-4 text-white rounded-full text-[10px] sm:text-xs flex items-center justify-center">
            {status?.DIAJUKAN_EDITOR}
          </div>
        </div>
      ),
      value: 'DIAJUKAN_EDITOR',
      element: <SubmissionSection />,
    },
    {
      id: 3,
      name: (
        <div className="p-1 sm:p-2 flex items-center gap-1 sm:gap-1.5">
          <p className="text-xs sm:text-sm">Proses<span className="hidden sm:inline"> Editor</span></p>
          <div className="bg-red-500 size-3.5 sm:size-4 text-white rounded-full text-[10px] sm:text-xs flex items-center justify-center">
            {status?.PROSES_EDITOR}
          </div>
        </div>
      ),
      value: 'PROSES_EDITOR',
      element: <ProcessSection />,
    },
    {
      id: 4,
      name: (
        <div className="p-1 sm:p-2 flex items-center gap-1 sm:gap-1.5">
          <p className="text-xs sm:text-sm">Ditolak</p>
          <div className="bg-red-500 size-3.5 sm:size-4 text-white rounded-full text-[10px] sm:text-xs flex items-center justify-center">
            {status?.TOLAK_EDITOR}
          </div>
        </div>
      ),
      value: 'TOLAK_EDITOR',
      element: <RejectionSection />,
    },
    {
      id: 5,
      name: (
        <div className="p-1 sm:p-2 flex items-center gap-1 sm:gap-1.5">
          <p className="text-xs sm:text-sm">Disetujui</p>
          <div className="bg-red-500 size-3.5 sm:size-4 text-white rounded-full text-[10px] sm:text-xs flex items-center justify-center">
            {status?.DISETUJUI_EDITOR}
          </div>
        </div>
      ),
      value: 'DISETUJUI_EDITOR',
      element: <ApproveSection />,
    },
    {
      id: 6,
      name: (
        <div className="p-1 sm:p-2 flex items-center gap-1 sm:gap-1.5">
          <p className="text-xs sm:text-sm">Publish</p>
          <div className="bg-red-500 size-3.5 sm:size-4 text-white rounded-full text-[10px] sm:text-xs flex items-center justify-center">
            {status?.PUBLISHED}
          </div>
        </div>
      ),
      value: 'PUBLISHED',
      element: <PublishSection />,
    },
    {
      id: 7,
      name: (
        <div className="p-1 sm:p-2 flex items-center gap-1 sm:gap-1.5">
          <p className="text-xs sm:text-sm">Unpublish</p>
          <div className="bg-red-500 size-3.5 sm:size-4 text-white rounded-full text-[10px] sm:text-xs flex items-center justify-center">
            {status?.UNPUBLISH}
          </div>
        </div>
      ),
      value: 'UNPUBLISH',
      element: <UpPublishSection />,
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Berita'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Konten Publik - Berita"
                  valueGuide="P2M_KONTEN_PUBLIK_BERITA"
                />
              ),
            },
            {
              label: 'Tulis Berita',
              type: 'add',
              onClick: () => {},
              element: (
                <Button
                  onClick={() => {
                    if (status && status?.DRAFT > 0) {
                      toast.info('Silahkan Ajukan Data Terlebih Dahulu')
                    } else {
                      navigate('add')
                    }
                  }}
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary text-xs sm:text-sm'}
                >
                  <HiPencil />
                  Tulis Berita
                </Button>
              ),
            },
          ]}
        />

        <TabsListCustom
          value={statusParams ?? 'DRAFT'}
          onChange={(e) => {
            setSearchParams({ status: e })
          }}
          data={DataTabs}
        />
      </div>
    </>
  )
}

export default NewsPublicContentPage
