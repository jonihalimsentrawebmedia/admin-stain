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
    requestNotificationPermission().then((res) => {
      console.log(res)
      window.localStorage.setItem('token_fcm', res as string)
    })
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${publicIdentity?.background})`,
      }}
      className={`w-screen min-h-full bg-cover lg:bg-fixed relative flex justify-center lg:items-center items-start lg:py-6 overflow-y-auto`}
    >
      <Card className="max-w-7xl w-full backdrop-blur-md bg-white/40">
        <CardContent className="flex flex-col gap-4">
          <div className="bg-green-800 rounded-lg overflow-hidden">
            <div
              style={{
                backgroundImage: `url(${PATERN})`,
              }}
              className=" p-4 rounded-lg bg-cover object-cover flex flex-col lg:flex-row w-full justify-between items-center"
            >
              <div className="flex gap-2 items-center overflow-auto h-full">
                <div className="w-[100px] bg-white h-[100px] rounded-xl flex justify-center items-center">
                  <img src={publicIdentity?.logo} alt="logo" width={52} height={52} />
                </div>
                <div>
                  <div className="text-white text-sm lg:text-base">
                    Manajemen Pengelolaan Website
                  </div>
                  <div className="text-base lg:text-2xl font-bold text-white">
                    {publicIdentity?.nama}
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-col gap-4 mt-4">
                <Button
                  size={'sm'}
                  onClick={() => {
                    goToProfile()
                  }}
                  className="text-neutral bg-white hover:bg-white/90 text-start justify-start"
                >
                  <FaUser className="text-blue-600" />
                  Halaman Profile
                </Button>
                <ButtonLogOut />
              </div>
            </div>
          </div>

          <div className="rounded-lg gap-4 md:gap-0 grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 p-4 rounded-lg lg:rounded-none lg:rounded-l-lg bg-white">
              <div className="font-bold text-neutral text-xl">Daftar Modul</div>
              <div className="grid w-full text-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:h-full max-h-[300px] overflow-auto">
                {modules.map((item, k) => (
                  <div
                    key={k}
                    onClick={() => {
                      setModuleSelect(item)
                    }}
                    className={`shadow ${moduleSelect?.id_module === item.id_module ? 'bg-[#CCE6D9]' : 'bg-[#E9E9E9]'} border-[#E9E9E9] text-center border rounded-lg p-4 flex flex-col items-center justify-center`}
                  >
                    <div className="mx-auto mb-2">
                      <img src={item?.gambar} className={'size-10 object-contain'} />
                    </div>
                    <div className="text-[14px]">{item.nama_module}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#E9E9E9] p-4 col-span-12 rounded-lg lg:rounded-none lg:rounded-r-lg lg:col-span-4 ">
              {moduleSelect && (
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-black text-xl">Daftar Role</div>
                  <div className="font-medium">{moduleSelect.nama_module}</div>
                  <Link
                    onClick={() => {
                      window.localStorage.setItem('module', JSON.stringify(moduleSelect))
                    }}
                    to={GetModuleUrl(moduleSelect)}
                  >
                    <Card>
                      <CardContent>
                        <div className="text-[#295AA3]">Admin {moduleSelect.nama_module}</div>
                      </CardContent>
                    </Card>
                  </Link>
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
