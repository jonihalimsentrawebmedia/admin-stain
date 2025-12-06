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
      <Tabs defaultValue={data[0].value}>
        <TabsList className={'bg-transparent shadow-none rounded-none w-full'}>
          {data?.map((item, k) => (
            <TabsTrigger
              key={k}
              className={
                'border border-primary rounded-none data-[state=active]:bg-primary data-[state=active]:text-white text-primary p-2.5'
              }
              value={item?.value}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {data?.map((row, k) => (
          <TabsContent key={k} value={row?.value}>
            {row?.element}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
