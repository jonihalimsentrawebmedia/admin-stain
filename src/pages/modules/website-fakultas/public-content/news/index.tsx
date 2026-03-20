import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { UseGetFacultyNewsStatus } from './hooks/index'
import { TableDataListNews } from './components/listNews.tsx'
import type { StatusPublish } from './data/types.ts'

export const NewsCarrierPublicContentPage = () => {
  const navigate = useNavigate()
  const { status } = UseGetFacultyNewsStatus()

  const [searchParams, setSearchParams] = useSearchParams()
  const statusParams = searchParams.get('status') as StatusPublish

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
      element: <TableDataListNews status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListNews status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListNews status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListNews status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListNews status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListNews status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListNews status={statusParams ?? 'DRAFT'} />,
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Berita'}
          buttonGroup={[{ type: 'add', label: 'Tulis Berita', onClick: () => navigate('add') }]}
        />

        <TabsListCustom
          triggerClassName={
            'border-black rounded-none data-[state=active]:bg-black data-[state=active]:text-white text-black'
          }
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
