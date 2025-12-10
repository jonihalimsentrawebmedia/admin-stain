import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { UseGetImpactInnovationStatus } from './hooks/index'
import { DraftSectionImpactInnovation } from './components/table/draftSection.tsx'
import { SubmissionSectionImpactInnovation } from '@/pages/modules/website-utama/public-content/impact-innovation/components/table/submissionSection.tsx'
import { ProcessSectionImpactInnovation } from '@/pages/modules/website-utama/public-content/impact-innovation/components/table/processSection.tsx'
import { RejectSectionImpactInnovation } from '@/pages/modules/website-utama/public-content/impact-innovation/components/table/rejectSection.tsx'
import { ApprovedSectionImpactInnovation } from '@/pages/modules/website-utama/public-content/impact-innovation/components/table/approvedSection.tsx'
import { PublishSectionImpactInnovation } from '@/pages/modules/website-utama/public-content/impact-innovation/components/table/publishSection.tsx'
import { UnpublishSectionImpactInnovation } from '@/pages/modules/website-utama/public-content/impact-innovation/components/table/unpublishSection.tsx'

export const ImpactInnovationPage = () => {
  const navigate = useNavigate()
  const { status } = UseGetImpactInnovationStatus()

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
        <div className="p-2 flex items-center gap-1.5">
          <p>Draft</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">{status?.DRAFT}</div>
        </div>
      ),
      value: 'DRAFT',
      element: <DraftSectionImpactInnovation />,
    },
    {
      id: 2,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Diajukan Ke Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.DIAJUKAN_EDITOR}
          </div>
        </div>
      ),
      value: 'DIAJUKAN_EDITOR',
      element: <SubmissionSectionImpactInnovation />,
    },
    {
      id: 3,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Proses Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.PROSES_EDITOR}
          </div>
        </div>
      ),
      value: 'PROSES_EDITOR',
      element: <ProcessSectionImpactInnovation />,
    },
    {
      id: 4,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Ditolak Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.TOLAK_EDITOR}
          </div>
        </div>
      ),
      value: 'TOLAK_EDITOR',
      element: <RejectSectionImpactInnovation />,
    },
    {
      id: 5,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Disetujui Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.DISETUJUI_EDITOR}
          </div>
        </div>
      ),
      value: 'DISETUJUI_EDITOR',
      element: <ApprovedSectionImpactInnovation />,
    },
    {
      id: 6,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Publish</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.PUBLISHED}
          </div>
        </div>
      ),
      value: 'PUBLISHED',
      element: <PublishSectionImpactInnovation />,
    },
    {
      id: 7,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Unpublish</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.UNPUBLISH}
          </div>
        </div>
      ),
      value: 'UNPUBLISH',
      element: <UnpublishSectionImpactInnovation />,
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Inovasi Berdampak'}
          buttonGroup={[
            {
              type: 'add',
              label: '',
              onClick: () => {},
              element: (
                <Button
                  variant={'outline'}
                  onClick={() => navigate('add')}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  <HiPencil />
                  Tulis Inovasi Berdampak
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
