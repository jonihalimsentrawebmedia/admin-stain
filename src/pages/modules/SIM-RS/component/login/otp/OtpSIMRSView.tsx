import OtpSIMRSViewModel from './OtpSIMRSViewModel'
import PATERN from '@/assets/img/patern.png'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ButtonBack from '@/components/common/button/ButtonBack'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { UseGetIdentityPublic } from '@/pages/login/hooks'
import { SkeletonForm } from '@/pages/login/component/skeleton.tsx'

const OtpSIMRSView = () => {
  const { setOtp, otp, handleSave, loading } = OtpSIMRSViewModel()
  const { loading: loadingIdentity, publicIdentity } = UseGetIdentityPublic()

  if (loadingIdentity) return <SkeletonForm />

  return (
    <div
      style={{ backgroundImage: `url(${publicIdentity?.background})` }}
      className="w-screen h-screen object-cover bg-cover bg-fixed relative flex justify-center items-center"
    >
      <Card className="max-w-2xl w-full h-full lg:h-fit backdrop-blur-md bg-white/40 flex flex-col items-center justify-center">
        <CardContent className="flex flex-col gap-4 w-full">
          <div className="bg-green-800 rounded-lg w-full">
            <div
              style={{ backgroundImage: `url(${PATERN})` }}
              className="p-4 rounded-lg bg-cover object-cover flex w-full justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <div className="w-[100px] bg-white h-[75px] lg:h-[100px] rounded-xl flex justify-center items-center">
                  <img
                    src={publicIdentity?.logo}
                    alt="logo"
                    width={52}
                    height={52}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-white text-sm lg:text-base">
                    Sistem Informasi Manajemen Rumah Sakit
                  </div>
                  <div className="text-base lg:text-2xl font-bold text-white">
                    {publicIdentity?.nama}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white flex flex-col gap-4 p-4">
            <ButtonBack />
            <p className="text-neutral font-medium text-3xl">Masukkan Kode OTP</p>
            <p>Kode OTP telah dikirimkan ke email anda. Silahkan periksa email anda.</p>

            <div className="flex flex-col gap-4">
              <div className="mx-auto">
                <InputOTP maxLength={6} value={otp} onChange={(e) => setOtp(e)}>
                  <InputOTPGroup className="flex gap-4 items-center">
                    <InputOTPSlot className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]" index={0} />
                    <InputOTPSlot className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]" index={1} />
                    <InputOTPSlot className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]" index={2} />
                    <InputOTPSlot className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]" index={3} />
                    <InputOTPSlot className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]" index={4} />
                    <InputOTPSlot className="lg:h-[70px] text-2xl bg-gray-50 shadow rounded-lg border lg:w-[50px]" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                disabled={loading}
                onClick={handleSave}
                className="bg-primary w-fit mx-auto text-white"
              >
                Lanjutkan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OtpSIMRSView
