import BG from "@/assets/img/bg-modules.png";
import PATERN from "@/assets/img/patern.png";
import LOGO from "@/assets/img/logo.png";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FaUser} from "react-icons/fa";
import ModulesViewModel from "./ModulesViewModel";
import ButtonLogOut from "@/pages/modules/components/buttonLogOut.tsx";

const ModulesView = () => {

  const {modules, module, setModule} = ModulesViewModel();

  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
      }}
      className={`w-screen h-screen object-cover bg-cover bg-fixed relative  flex justify-center items-center `}
    >
      <Card className="max-w-7xl w-full backdrop-blur-md bg-white/40 ">
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
                  <img src={LOGO} alt="logo" width={52} height={52}/>
                </div>
                <div>
                  <div className="text-white">
                    Manajemen Pengelolaan Website
                  </div>
                  <div className="text-2xl font-bold text-white">
                    Sekolah Tinggi Agama Islam Negeri MADINA
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button className="text-neutral bg-white hover:bg-white/90 text-start justify-start">
                  <FaUser className="text-blue-600"/>
                  Halaman Profile
                </Button>
                <ButtonLogOut/>
              </div>
            </div>
          </div>
          <div className="rounded-lg grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 p-4 rounded-l-lg bg-white">
              <div className="font-bold text-neutral text-xl">Daftar Modul</div>
              <div className="grid w-full text-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {modules.map((item, k) => (
                  <div key={k} onClick={() => {
                    setModule(item)
                  }}
                       className={`shadow ${module?.label == item.label ? "bg-[#CCE6D9]" : "bg-[#E9E9E9]"} border-[#E9E9E9] text-center border rounded-lg p-4 flex flex-col items-center justify-center`}>
                    <div className="mx-auto"> {item.icon}</div>
                    <div className="text-[14px]">{item.label}</div>
                    <div className="text-blue-400 text-[10px]">
                      {item.linkWebsite}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#E9E9E9] p-4 col-span-12 rounded-r-lg lg:col-span-4 ">
              {module && (
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-black text-xl">
                    Daftar Role
                  </div>
                  <div
                    className="font-medium
                        "
                  >
                    {module.label}
                  </div>
                  <Card>
                    <CardContent>
                      <div className="text-[#295AA3]">Admin Website</div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulesView;
