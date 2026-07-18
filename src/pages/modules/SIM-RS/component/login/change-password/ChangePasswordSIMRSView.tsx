import ChangePasswordSIMRSViewModel from './ChangePasswordSIMRSViewModel'
import PATERN from '@/assets/img/patern.png'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import ButtonBack from '@/components/common/button/ButtonBack'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Check, X } from 'lucide-react'
import { UseGetIdentityPublic } from '@/pages/login/hooks'
import { SkeletonForm } from '@/pages/login/component/skeleton.tsx'

const ChangePasswordSIMRSView = () => {
  const { form, getClass, handleSave, loading, validations, isDisabled } =
    ChangePasswordSIMRSViewModel()
  const { loading: loadingIdentity, publicIdentity } = UseGetIdentityPublic()

  if (loadingIdentity) return <SkeletonForm />

  return (
    <div
      style={{ backgroundImage: `url(${publicIdentity?.background})` }}
      className="w-screen h-dvh p-8 mx-auto overflow-y-auto object-cover bg-cover"
    >
      <Card className="max-w-2xl mx-auto w-full backdrop-blur-md bg-white/40">
        <CardContent className="flex flex-col gap-4 overflow-y-auto">
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
            <p className="text-neutral font-medium text-3xl">Buat Password Baru</p>
            <p>Silahkan buat password baru untuk akun anda</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="flex flex-col gap-4"
              >
                <TextInput
                  form={form}
                  name="password"
                  label="Password Baru"
                  type="password"
                  placeholder="Password Baru"
                />
                <TextInput
                  form={form}
                  name="confirm_password"
                  label="Konfirmasi Password Baru"
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                />

                <Button
                  disabled={loading || isDisabled}
                  className="bg-primary w-fit mx-auto text-white"
                >
                  Simpan
                </Button>

                <div className="mt-5 text-sm">
                  <p className="font-medium text-neutral">Ketentuan Password</p>
                  <ul className="mt-2 space-y-1">
                    <li className={getClass(validations.length)}>
                      {validations.length ? <Check size={16} /> : <X size={16} />}
                      Minimal 8 karakter
                    </li>
                    <li className={getClass(validations.upper)}>
                      {validations.upper ? <Check size={16} /> : <X size={16} />}
                      Mengandung huruf besar (A–Z)
                    </li>
                    <li className={getClass(validations.lower)}>
                      {validations.lower ? <Check size={16} /> : <X size={16} />}
                      Mengandung huruf kecil (a–z)
                    </li>
                    <li className={getClass(validations.number)}>
                      {validations.number ? <Check size={16} /> : <X size={16} />}
                      Mengandung angka (0–9)
                    </li>
                    <li className={getClass(validations.symbol)}>
                      {validations.symbol ? <Check size={16} /> : <X size={16} />}
                      Mengandung simbol/karakter khusus (seperti ! @ # $ % ^ & *)
                    </li>
                  </ul>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChangePasswordSIMRSView
