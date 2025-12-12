import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { BiPlus } from 'react-icons/bi'
import { UseGetAchievementStatus } from './hooks/index.tsx'
import { DraftSectionAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/table/draftSection.tsx'
import { SubmissionSectionAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/table/submissionSection.tsx'
import { ProcessSectionAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/table/processSection.tsx'
import { RejectSectionAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/table/rejectSection.tsx'
import { ApproveSectionAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/table/approveSection.tsx'
import { PublishSectionAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/table/publishSection.tsx'
import { UnpublishSectionAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/table/unpublishSection.tsx'

export const AchievementPage = () => {
  const navigate = useNavigate()

  const { status } = UseGetAchievementStatus()

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
      element: <DraftSectionAchievement />,
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
      element: <SubmissionSectionAchievement />,
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
      element: <ProcessSectionAchievement />,
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
      element: <RejectSectionAchievement />,
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
      element: <ApproveSectionAchievement />,
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
      element: <PublishSectionAchievement />,
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
      element: <UnpublishSectionAchievement />,
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Prestasi'}
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
                  <BiPlus />
                  Tambah Prestasi
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
