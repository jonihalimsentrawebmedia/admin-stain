import PATERN from "@/assets/img/patern.png";
import {Card, CardContent} from "@/components/ui/card";
import {FormLogin} from "@/pages/login/component/formLogin.tsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {UseGetIdentityPublic} from "@/pages/login/hooks";
import {SkeletonForm} from "@/pages/login/component/skeleton.tsx";


const LoginView = () => {

  const token = Cookies.get("token");
  const navigate = useNavigate()
  const {loading, publicIdentity} = UseGetIdentityPublic()

  useEffect(() => {
    if (token) {
      navigate("/modules")
    }
  }, [token]);

  if (loading) return <SkeletonForm/>


  return (
    <div
      style={{
        backgroundImage: `url(${publicIdentity?.background})`,
      }}
      className={`w-screen h-screen object-cover bg-cover bg-fixed relative  flex justify-center items-center `}
    >
      <Card
        className="max-w-2xl w-full h-full lg:h-fit backdrop-blur-md bg-white/40 flex flex-col items-center justify-center">
        <CardContent className="flex flex-col gap-4">
          <div className="bg-green-800 rounded-lg">
            <div
              style={{
                backgroundImage: `url(${PATERN})`,
              }}
              className=" p-4 rounded-lg bg-cover object-cover flex w-full justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <div className="w-[100px] bg-white h-[75px] lg:h-[100px] rounded-xl flex justify-center items-center">
                  <img src={publicIdentity?.logo} alt="logo" width={52} height={52} className={'object-contain'}/>
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
            </div>
          </div>

          <FormLogin/>

        </CardContent>
      </Card>
    </div>
  );
};

export default LoginView;
