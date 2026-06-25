import { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import { GenerateTabsData } from '@/pages/modules/Pulsikom/training/list-training/data'
import { useSearchParams } from 'react-router-dom'

interface Propss {
  title: string
}

export const CreatedTraining = (props: Propss) => {
  const { title } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const step = searchParams.get('step')
  const from = searchParams.get('from')

  useEffect(() => {
    if (!step) {
      const Params = new URLSearchParams()
      Params.append('step', 'is_informasi_pendaftaran')
      setSearchParams(Params)
    }
  }, [step])

  const HandleStep = (e: string) => {
    const Params = new URLSearchParams()
    Params.append('step', e)
    Params.append('from', from ?? '')
    setSearchParams(Params)
  }

  const TabsData = GenerateTabsData(title)

  const canAccess = (index: number) => {
    if (index === 0) return false

    return TabsData[index - 1]?.status === false
  }

  return (
    <>
      <div className="py-5 bg-white">
        <Tabs
          value={step ?? 'is_informasi_pendaftaran'}
          onValueChange={(e) => HandleStep(e)}
          className={'flex flex-row! items-start gap-x-5'}
        >
          <TabsList
            className={
              'flex flex-col gap-2 h-full items-start min-w-[220px]! bg-white border p-3 rounded-none'
            }
          >
            {TabsData?.map((item, k) => (
              <TabsTrigger
                disabled={canAccess(k)}
                key={k}
                value={item?.value}
                className={clsx(
                  'rounded-none bg-white shadow-none! whitespace-pre-wrap text-start',
                  'p-0 w-full'
                )}
              >
                <div className={'flex items-center gap-1.5 text-sm w-full'}>
                  <div
                    className={clsx(
                      'flex items-center justify-center',
                      'size-8 min-w-8 h-8 rounded text-white',
                      item?.value === step
                        ? 'bg-primary'
                        : item?.status
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                    )}
                  >
                    {k + 1}
                  </div>
                  <p className={clsx(item?.value === step ? 'text-gray-800' : 'text-gray-400')}>
                    {item?.label}
                  </p>
                </div>
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
