import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IoInformationCircle } from 'react-icons/io5'
import AdminTabs from './components/Admintabs'
import WebsiteTabs from './components/WebsiteTabs'

const ColorSettingCarrier = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl text-[#444] font-medium">Pengaturan Warna</p>
      <div className="flex gap-2 items-center w-fit px-2 py-1 text-[#2769CD] border border-[#2769CD] rounded">
        <IoInformationCircle className="size-4" />
        <div>Silahkan pilih warna yang ingin anda gunakan</div>
      </div>

      <Tabs defaultValue="admin">
        <TabsList className="grid w-full grid-cols-2 h-auto p-0 bg-white border border-blue-[#276CCD] rounded-full">
          <TabsTrigger
            value="admin"
            className="rounded-full py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-white text-primary font-medium transition-all"
          >
            Admin
          </TabsTrigger>
          <TabsTrigger
            value="landing"
            className="rounded-full py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-white text-primary font-medium transition-all"
          >
            Landing Page
          </TabsTrigger>
        </TabsList>

        <TabsContent value="admin">
          <AdminTabs />
        </TabsContent>
        <TabsContent value="landing">
          <WebsiteTabs />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ColorSettingCarrier
