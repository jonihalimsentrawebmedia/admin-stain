import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import type { ReactNode } from 'react'

interface TabItem {
  id: number
  name: ReactNode
  value: string
  element: ReactNode
}

interface Props {
  data: TabItem[]
  value?: string
  onChange?: (value: string) => void
}

export const TabsListCustom = ({ data, value, onChange }: Props) => {
  return (
    <Tabs
      value={value}
      onValueChange={(val) => onChange?.(val)}
      className="w-full flex flex-col gap-5"
    >
      <TabsList className="bg-transparent shadow-none rounded-none w-full">
        {data.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.value}
            className="border border-primary rounded-none
                       data-[state=active]:bg-primary
                       data-[state=active]:text-white
                       text-primary p-2.5"
          >
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {data.map((item) => (
        <TabsContent key={item.id} value={item.value}>
          {item.element}
        </TabsContent>
      ))}
    </Tabs>
  )
}
