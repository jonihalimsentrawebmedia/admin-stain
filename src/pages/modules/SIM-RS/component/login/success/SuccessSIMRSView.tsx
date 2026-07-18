import PATERN from '@/assets/img/patern.png'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { UseGetIdentityPublic } from '@/pages/login/hooks'
import { SkeletonForm } from '@/pages/login/component/skeleton.tsx'
import { HiCheckCircle } from 'react-icons/hi'

const SuccessSIMRSView = () => {
  const { loading, publicIdentity } = UseGetIdentityPublic()

  if (loading) return <SkeletonForm />

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

          <div className="rounded-lg bg-white flex flex-col gap-4 p-4 items-center">
            <HiCheckCircle className="text-green-500 w-20 h-20" />
            <p className="text-neutral font-medium text-3xl text-center">
              Password Baru Berhasil Dibuat
            </p>
            <p className="text-center">
              Silahkan login dengan menggunakan password baru anda.
            </p>
            <Link to={'/sim-rs/login'}>
              <Button className="bg-primary w-fit mx-auto text-white">Login</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessSIMRSView
