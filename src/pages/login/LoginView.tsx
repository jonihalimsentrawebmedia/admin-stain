import BG from "@/assets/img/bg-modules.png";
import PATERN from "@/assets/img/patern.png";
import LOGO from "@/assets/img/logo.png";
import {Card, CardContent} from "@/components/ui/card";
import {FormLogin} from "@/pages/login/component/formLogin.tsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LoginView = () => {

  const token = Cookies.get("token");
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/modules")
    }
  }, [token]);


  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
      }}
      className={`w-screen h-screen object-cover bg-cover bg-fixed relative  flex justify-center items-center `}
    >
      <Card className="max-w-2xl w-full backdrop-blur-md bg-white/40 ">
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
            </div>
          </div>

          <FormLogin/>

        </CardContent>
      </Card>
    </div>
  );
};

export default LoginView;
