import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import type { ReactNode } from 'react'

interface Props {
  data: {
    id: number
    name: string
    value: string
    element: ReactNode
  }[]
}

export const TabsListCustom = (props: Props) => {
  const { data } = props

  return (
    <>
      <Tabs>
        <TabsList className={'bg-transparent shadow-none rounded-none w-full'}>
          {data?.map((item) => (
            <TabsTrigger
              className={
                'border border-primary rounded-none data-[state=active]:bg-primary data-[state=active]:text-white text-primary'
              }
              value={item?.value}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {data?.map((row) => (
          <TabsContent value={row?.value}>{row?.element}</TabsContent>
        ))}
      </Tabs>
    </>
  )
}
