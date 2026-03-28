import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { useState } from 'react'
import { clsx } from 'clsx'
import { FormDescription } from './component/formDesc.tsx'
import { FormPricing } from './component/formPricing.tsx'
import { PartnerSection } from './component/partnerSection.tsx'

export const DetailProgram = () => {
  const [tab, setTab] = useState('1')

  const TabsData = [
    {
      id: '1',
      label: 'Deskripsi',
      element: <FormDescription />,
    },
    {
      id: '2',
      label: 'Biaya',
      element: <FormPricing />,
    },
    {
      id: '3',
      label: 'Universitas Partner',
      element: <PartnerSection />,
    },
  ]

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup buttonGroup={[]} label="Detail - Student Exchange Program" isBack />

        <Tabs value={tab} onValueChange={(value) => setTab(value)} className="w-full">
          <TabsList className={'w-full rounded-none bg-white h-full border-b-2 border-primary p-0'}>
            {TabsData.map((item, k) => (
              <TabsTrigger
                key={k}
                className={clsx(
                  'rounded-t-xl! rounded-bl-none! rounded-br-none! p-2',
                  'data-[state=active]:bg-primary data-[state=active]:text-white'
                )}
                value={item?.id}
              >
                {item?.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TabsData?.map((item, k) => (
            <TabsContent key={k} value={item?.id}>
              {item?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
