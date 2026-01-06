import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  UseGetFacilitiesBackground,
  UseGetFacilitiesStatus,
} from '@/pages/modules/website-utama/public-content/facilities/hooks'
import { useEffect } from 'react'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { DraftSectionFacilities } from './components/table/draftSection.tsx'
import { SubmissionSectionFacilities } from './components/table/submissionSection.tsx'
import { ProcessSectionSection } from './components/table/processSection.tsx'
import { RejectSectionSection } from './components/table/rejectSection.tsx'
import { ApprovedSectionFacilities } from '@/pages/modules/website-utama/public-content/facilities/components/table/approvedSection.tsx'
import { PublishSectionFacilities } from '@/pages/modules/website-utama/public-content/facilities/components/table/publishSection.tsx'
import { UnpublishSectionFacilities } from '@/pages/modules/website-utama/public-content/facilities/components/table/unpublishSection.tsx'
import { IoWarning } from 'react-icons/io5'
import { Image } from 'lucide-react'
import { toast } from 'react-toastify'

export const FacilitiesPage = () => {
  const navigate = useNavigate()

  const { status } = UseGetFacilitiesStatus()
  const { background } = UseGetFacilitiesBackground()

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
      element: <DraftSectionFacilities />,
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
      element: <SubmissionSectionFacilities />,
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
      element: <ProcessSectionSection />,
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
      element: <RejectSectionSection />,
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
      element: <ApprovedSectionFacilities />,
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
      element: <PublishSectionFacilities />,
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
      element: <UnpublishSectionFacilities />,
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Fasilitas'}
          buttonGroup={[
            {
              type: 'custom',
              element:
                background?.length === 0 ? (
                  <Button
                    onClick={() => navigate('background')}
                    variant={'outline'}
                    className="border border-red-500 hover:text-red-500 text-red-500"
                  >
                    <IoWarning className="text-red- hover:text-red-500 size-6" />
                    Gambar Background Belum Ada
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('background')}
                    variant={'outline'}
                    className="border border-primary text-primary hover:text-primary"
                  >
                    <Image className="text-primary" />
                    Gambar Background
                  </Button>
                ),
            },
            {
              type: 'add',
              label: '',
              onClick: () => {},
              element: (
                <Button
                  variant={'outline'}
                  onClick={() => {
                    if (status && status?.DRAFT > 0) {
                      toast.info('Silahkan Ajukan Data Terlebih Dahulu')
                    } else {
                      navigate('add')
                    }
                  }}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  <HiPencil />
                  Tulis Fasilitas
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
