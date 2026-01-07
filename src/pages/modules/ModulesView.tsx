import BG from '@/assets/img/bg-modules.png'
import PATERN from '@/assets/img/patern.png'
import LOGO from '@/assets/img/logo.png'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaUser } from 'react-icons/fa'
import ButtonLogOut from '@/pages/modules/components/buttonLogOut.tsx'
import { ModulesViewModel } from '@/pages/modules/ModulesViewModel.tsx'
import { Link } from 'react-router-dom'
import { GetModuleUrl } from '@/utils/helper.tsx'

const ModulesView = () => {
  const { modules, moduleSelect, setModuleSelect, goToProfile } = ModulesViewModel()


  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
      }}
      className={`w-screen h-screen object-cover bg-cover bg-fixed relative  flex justify-center items-center `}
    >
      <Card className="max-w-7xl w-full h-[80dvh] overflow-y-auto backdrop-blur-md bg-white/40 ">
        <CardContent className="flex flex-col gap-4">
          <div className="bg-green-800 rounded-lg">
            <div
              style={{
                backgroundImage: `url(${PATERN})`,
              }}
              className=" p-4 rounded-lg bg-cover object-cover flex w-full justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <div className="w-[100px] bg-white h-[100px] rounded-xl flex justify-center items-center">
                  <img src={LOGO} alt="logo" width={52} height={52} />
                </div>
                <div>
                  <div className="text-white">Manajemen Pengelolaan Website</div>
                  <div className="text-2xl font-bold text-white">
                    Sekolah Tinggi Agama Islam Negeri MADINA
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button
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
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 p-4 rounded-l-lg bg-white">
              <div className="font-bold text-neutral text-xl">Daftar Modul</div>
              <div className="grid w-full text-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
                    {item?.nama_module?.toLowerCase() === 'website utama' && (
                      <p className="text-xs text-primary">https://stain-madina.ac.id</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#E9E9E9] p-4 col-span-12 rounded-r-lg lg:col-span-4 ">
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
