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
  triggerClassName?: string
}

export const TabsListCustom = (props: Props) => {
  const {
    data,
    value,
    onChange,
    triggerClassName = 'border-primary rounded-none data-[state=active]:bg-primary data-[state=active]:text-white text-primary',
  } = props
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
            className={`border p-2.5 ${triggerClassName}`}
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
