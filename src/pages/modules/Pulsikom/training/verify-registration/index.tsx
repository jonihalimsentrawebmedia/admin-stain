import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { useState } from 'react'
import { clsx } from 'clsx'
import { TrainingList } from './component/trainingList'
import { ProgramList } from '@/pages/modules/Pulsikom/training/verify-registration/component/programList.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const VerifyRegistration = () => {
  const [tabsValue, setTabsValue] = useState('training')

  const TabsData = [
    {
      label: 'Training',
      value: 'training',
      element: <TrainingList />,
    },
    {
      label: 'Program',
      value: 'program',
      element: <ProgramList />,
    },
  ]

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Verifikasi Pendaftaran'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Verifikasi Pendaftaran'}
                  valueGuide="PUSILKOM_TRAINING_VERIFIKASI_PENDAFTARAN"
                />
              ),
            },
          ]}
        />

        <Tabs className={'bg-white p-0'} value={tabsValue} onValueChange={(e) => setTabsValue(e)}>
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
