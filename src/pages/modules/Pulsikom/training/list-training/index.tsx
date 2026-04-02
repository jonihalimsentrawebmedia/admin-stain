import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import { useState } from 'react'
import { DraftSection } from './component/TabsData/DraftSection.tsx'
import { PublishSection } from './component/TabsData/PublishSection.tsx'
import { ClosedSection } from './component/TabsData/closedSection.tsx'

export const ListTraining = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('DRAFT')

  const TabsData = [
    {
      label: 'Draft',
      value: 'DRAFT',
      element: <DraftSection />,
    },
    {
      label: 'Diterbitkan',
      value: 'DITERBITKAN',
      element: <PublishSection />,
    },
    {
      label: 'Ditutup',
      value: 'DITUTUP',
      element: <ClosedSection />,
    },
  ]

  return (
    <>
      <div className="space-y-5 bg-white">
        <ButtonTitleGroup
          label="Daftar Training"
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Training',
              onClick: () => {
                window.localStorage.removeItem('id_training')
                navigate('add')
              },
            },
          ]}
        />

        <Tabs className={'bg-white p-0'} value={status} onValueChange={(e) => setStatus(e)}>
          <TabsList
            className={'bg-white rounded-none w-full h-full border-b-2 border-b-primary p-0'}
          >
            {TabsData?.map((row, k) => (
              <TabsTrigger
                value={row?.value}
                key={k}
                className={clsx(
                  'w-full rounded-none rounded-t-md shadow-none! py-1.5',
                  'data-[state=active]:bg-primary data-[state=active]:text-white'
                )}
              >
                {row?.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TabsData?.map((row, k) => (
            <TabsContent key={k} value={row?.value}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
