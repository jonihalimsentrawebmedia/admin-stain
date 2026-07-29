import { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import { GenerateTabsData } from '@/pages/modules/Pulsikom/training/list-training/data'
import { useSearchParams } from 'react-router-dom'

interface Props {
  title: string
}

export const CreatedTraining = (props: Props) => {
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
      <div className="py-5 bg-white relative">
        <Tabs
          value={step ?? 'is_informasi_pendaftaran'}
          onValueChange={(e) => HandleStep(e)}
          className={'flex flex-col lg:flex-row! items-start gap-x-5'}
        >
          <TabsList
            className={
              'flex flex-row lg:flex-col gap-2 mt-0 lg:mt-[55px] h-full items-start w-full lg:max-w-[220px]! bg-white border p-3 rounded-none overflow-x-scroll lg:overflow-x-visible'
            }
          >
            {TabsData?.map((item, k) => (
              <TabsTrigger
                disabled={canAccess(k)}
                key={k}
                value={item?.value}
                className={clsx(
                  'rounded-none bg-white shadow-none! whitespace-nowrap lg:whitespace-pre-wrap text-start shrink-0',
                  'p-0 w-auto lg:w-full text-xs'
                )}
              >
                <div className={'flex items-center gap-1.5 text-sm w-full'}>
                  <div
                    className={clsx(
                      'flex items-center justify-center',
                      'size-6 min-w-6 h-6 rounded text-white text-xs',
                      item?.value === step
                        ? 'bg-primary'
                        : item?.status
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                    )}
                  >
                    {k + 1}
                  </div>
                  <p className={clsx(item?.value === step ? 'text-gray-800' : 'text-gray-400','text-xs')}>
                    {item?.label}
                  </p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          {TabsData?.map((row, k) => (
            <TabsContent key={k} value={row?.value} className={'w-full'}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
