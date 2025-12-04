import OtpViewModel from "./OtpViewModel";
import BG from "@/assets/img/bg-modules.png";
import PATERN from "@/assets/img/patern.png";
import LOGO from "@/assets/img/logo.png";
import {Card, CardContent} from "@/components/ui/card";
import ButtonBack from "@/components/common/button/ButtonBack";
import {Button} from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OtpView = () => {
  const {setOtp, otp, handleSave, loading} = OtpViewModel();
  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
      }}
      className={`w-screen h-screen object-cover bg-cover bg-fixed relative  flex justify-center items-center `}
    >
      <Card className="max-w-3xl w-full backdrop-blur-md bg-white/40 ">
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
                  {" "}
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
          
          <div className="rounded-lg bg-white flex flex-col gap-4 p-4">
            <ButtonBack/>
            <p className="text-neutral font-medium text-3xl">
              Masukkan Kode OTP
            </p>
            <p>
              Kode OTP telah dikirimkan ke email anda. Silahkan periksa email
              anda.
            </p>
            
            <div
              className="flex flex-col gap-4"
            >
              <div className="mx-auto">
                <InputOTP maxLength={6} className="mx-auto" value={otp} onChange={(e) => setOtp(e)}>
                  <InputOTPGroup className="flex gap-4 items-center">
                    <InputOTPSlot
                      className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]"
                      index={0}
                    />
                    <InputOTPSlot
                      className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]"
                      index={1}
                    />
                    <InputOTPSlot
                      className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]"
                      index={2}
                    />
                    <InputOTPSlot
                      className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]"
                      index={3}
                    />
                    <InputOTPSlot
                      className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]"
                      index={4}
                    />
                    <InputOTPSlot
                      className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button
                disabled={loading}
                onClick={handleSave}
                className="bg-primary w-fit mx-auto text-white                "
              >
                Lanjutkan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpView;
