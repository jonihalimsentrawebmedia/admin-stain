import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { PlusIcon } from 'lucide-react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Tabs, TabsContent } from '@/components/ui/tabs.tsx'
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { FiUpload } from 'react-icons/fi'
import { IoMdLink } from 'react-icons/io'
import { cn } from '@/lib/utils.ts'
import UploadImageMultiple from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation/UploadMultiple/imageMultiple.tsx'
import ImageUrlUpload from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation/UploadMultiple/imageUrl.tsx'

const ButtonUploadMultiple = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const tabsData = [
    {
      id: 1,
      name: 'Upload File',
      icon: <FiUpload />,
      element: (
        <UploadImageMultiple
          setLoading={setLoading}
          loading={loading}
          open={open}
          setOpen={setOpen}
        />
      ),
    },
    {
      id: 2,
      name: 'URL Link',
      icon: <IoMdLink />,
      element: <ImageUrlUpload open={open} setOpen={setOpen} />,
    },
  ]

  return (
    <>
      <Button
        disabled={loading}
        variant={'outline'}
        className={'rounded-full border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <PlusIcon />
        Upload File
      </Button>

      <DialogBasic
        title={'Tambah Dokumentasi'}
        open={open}
        setOpen={setOpen}
        className={'min-w-6xl'}
      >
        <p className={'text-gray-500'}>Tipe Dokumen</p>
        <Tabs className={'w-full'}>
          <TabsList className={'w-full flex-row! flex gap-2'}>
            {tabsData?.map((row) => (
              <TabsTrigger
                key={row.id}
                value={row.name}
                className={cn(
                  'w-full border rounded border-primary',
                  'data-[state=active]:bg-primary data-[state=active]:text-white'
                )}
              >
                <p className={'flex items-center gap-1.5 p-1.5'}>
                  {row?.icon}
                  {row?.name}
                </p>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabsData?.map((row) => (
            <TabsContent value={row.name}>
              <div className={'mt-2'}>{row?.element && row?.element}</div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogBasic>
    </>
  )
}
export default ButtonUploadMultiple
