import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'
import { IconTitleText } from '@/components/common/icon'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { type JSX, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SubjectPerSemester } from '@/pages/modules/website-prodi/curriculum/suject-detail/component/SubjectPerSemester.tsx'

interface Props {
  detail?: ICurriculum
}

export const SidenavSubjectCurriculum = (props: Props) => {
  const { detail } = props
  const [searchParams, setSearchParams] = useSearchParams()

  const tabValue = searchParams.get('tahun') ?? ''

  const elements = useMemo(() => {
    const temp: {
      id: string | number
      label: string
      value: string
      element: JSX.Element
    }[] = []

    Array.from({ length: detail?.lama_kuliah ?? 0 }).forEach((_, k) => {
      temp.push({
        id: k + 1,
        label: `Tahun Ke - ${k + 1}`,
        value: `${k + 1}`,
        element: <SubjectPerSemester />,
      })
    })

    temp.push({
      id: 'other',
      label: 'Matakuliah Pilihan',
      value: 'other',
      element: <SubjectPerSemester />,
    })

    return temp
  }, [detail?.lama_kuliah])

  useEffect(() => {
    if (elements.length > 0 && !tabValue) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        params.set('tahun', elements[0].value)
        return params
      })
    }
  }, [elements, tabValue, setSearchParams])

  return (
    <div>
      <Tabs
        value={tabValue}
        onValueChange={(value) => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            params.set('tahun', value)
            const year = Number(value.replace('tahun-', ''))
            if (!isNaN(year)) {
              const start = (year - 1) * 2 + 1
              params.set('semester', `${start}`)
            } else {
              params.set('semester', 'Ganjil')
            }
            return params
          })
        }}
        className="grid grid-cols-[15rem_1fr] gap-x-5 relative"
      >
        <TabsList className="flex p-4 bg-white border shadow rounded flex-col gap-2.5 w-full h-fit">
          {elements.map((item) => (
            <TabsTrigger
              className={`
                w-full rounded data-[state=active]:border-black border
                flex items-center justify-start p-2
                
              `}
              key={item.id}
              value={item.value}
            >
              <IconTitleText className={item.value === tabValue ? 'fill-black' : 'fill-gray-500'} />
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {elements.map((item) => (
          <TabsContent key={item.id} value={item.value}>
            {item.element}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
