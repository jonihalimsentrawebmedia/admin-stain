import PATERN from '@/assets/img/patern.png'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaUser } from 'react-icons/fa'
import ButtonLogOut from '@/pages/modules/components/buttonLogOut.tsx'
import { ModulesViewModel } from '@/pages/modules/ModulesViewModel.tsx'
import { Link } from 'react-router-dom'
import { GetModuleUrl } from '@/utils/helper.tsx'
import { UseGetIdentityPublic } from '@/pages/login/hooks'
import { useEffect } from 'react'
import { requestNotificationPermission } from '@/pages/modules/website-prodi/profile/dosen/hooks/test.tsx'

const ModulesView = () => {
  const { modules, moduleSelect, setModuleSelect, goToProfile } = ModulesViewModel()
  const { publicIdentity } = UseGetIdentityPublic()

  useEffect(() => {
    requestNotificationPermission().then((token) => {
      if (token) {
        window.localStorage.setItem('token_fcm', token)
      }
    })
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${publicIdentity?.background})`,
      }}
      className="w-full h-screen lg:min-h-screen bg-cover lg:bg-fixed relative flex justify-center lg:items-center items-start lg:py-6 overflow-y-auto"
    >
      <Card className="max-w-6xl w-full mx-0 sm:mx-4 lg:mx-auto bg-white/80 lg:bg-white/40 lg:backdrop-blur-md">
        <CardContent className="flex flex-col gap-4 p-3 sm:p-4 md:p-6">
          <div className="bg-green-800 rounded-lg overflow-hidden">
            <div
              style={{
                backgroundImage: `url(${PATERN})`,
              }}
              className="p-4 rounded-lg bg-cover object-cover flex flex-col lg:flex-row w-full justify-between items-center gap-3"
            >
              <div className="flex gap-2 items-center w-full lg:w-auto">
                <div className="size-[80px] lg:size-[100px] bg-white rounded-xl flex-shrink-0 flex justify-center items-center">
                  <img src={publicIdentity?.logo} alt="logo" width={52} height={52} />
                </div>
                <div className="min-w-0">
                  <div className="text-white text-sm lg:text-base">
                    Manajemen Pengelolaan Website
                  </div>
                  <div className="text-base lg:text-2xl font-bold text-white break-words">
                    {publicIdentity?.nama}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-auto">
                <Button
                  size={'sm'}
                  onClick={() => {
                    goToProfile()
                  }}
                  className="text-neutral bg-white hover:bg-white/90 text-start justify-start w-full"
                >
                  <FaUser className="text-blue-600" />
                  Halaman Profile
                </Button>
                <ButtonLogOut />
              </div>
            </div>
          </div>

          <div className="rounded-lg gap-4 grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 p-4 lg:p-5 rounded-lg bg-white">
              <div className="font-bold text-neutral text-lg lg:text-xl">Daftar Modul</div>
              <div className="grid w-full text-center grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-5 max-h-[420px] overflow-auto">
                {modules.map((item, k) => (
                  <div
                    key={k}
                    onClick={() => {
                      setModuleSelect(item)
                    }}
                    className={`shadow-sm cursor-pointer transition-all duration-200 ${moduleSelect?.id_module === item.id_module ? 'bg-[#CCE6D9] ring-2 ring-green-600' : 'bg-[#E9E9E9] hover:bg-gray-200'} border border-gray-200 text-center rounded-lg p-3 lg:p-4 flex flex-col items-center justify-center`}
                  >
                    <div className="mx-auto mb-1.5 lg:mb-2">
                      <img alt={'image'} src={item?.gambar} className={'size-9 lg:size-10 object-contain'} />
                    </div>
                    <div className="text-[11px] lg:text-[12px] leading-tight">{item.nama_module}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#E9E9E9] p-4 lg:p-5 col-span-12 rounded-lg lg:col-span-4 min-h-[180px]">
              {moduleSelect ? (
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-black text-lg lg:text-xl">Daftar Role</div>
                  <div className="font-medium text-sm lg:text-base">{moduleSelect.nama_module}</div>
                  <Link
                    onClick={() => {
                      window.localStorage.setItem('module', JSON.stringify(moduleSelect))
                    }}
                    to={GetModuleUrl(moduleSelect)}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-3 lg:p-4">
                        <div className="text-[#295AA3] text-sm lg:text-base">Admin {moduleSelect.nama_module}</div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  Pilih modul untuk melihat role
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ModulesView
