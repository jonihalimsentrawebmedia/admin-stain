import PATERN from '@/assets/img/patern.png'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'

import ButtonLogOut from '@/pages/modules/components/buttonLogOut.tsx'

import {Check, Grid, X} from 'lucide-react'
import ModuleProfileViewModel from './ModuleProfileViewModel'
import DetailField from '@/components/common/field/DetailField'
import {Form} from '@/components/ui/form'
import {InputText} from '@/components/common/form/InputText'
import PhotoProfile from './components/PhotoProfile'
import {UseGetIdentityPublic} from "@/pages/login/hooks";

const ModuleProfileView = () => {
  const {
    field,
    form,
    formDetail,
    getClass,
    handleSave,
    isDisabled,
    loading,
    profile,
    validations,
    goToModule,
  } = ModuleProfileViewModel()

  const {publicIdentity} = UseGetIdentityPublic()


  return (
    <div
      style={{
        backgroundImage: `url(${publicIdentity?.background})`,
      }}
      className={`w-screen h-screen object-cover bg-cover bg-fixed relative py-8  overflow-y-auto   flex justify-center items-center `}
    >
      <Card className="max-w-7xl h-full overflow-y-auto   w-full backdrop-blur-md bg-white/40 ">
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
                  <img src={publicIdentity?.logo ?? '/noimg.png'} alt="logo" width={52} height={52}
                       className='rounded-full'/>
                </div>
                <div>
                  <div className="text-white">Manajemen Pengelolaan Website</div>
                  <div className="text-2xl font-bold text-white">
                    {publicIdentity?.nama}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => {
                    goToModule()
                  }}
                  className="text-neutral bg-white hover:bg-white/90 text-start justify-start"
                >
                  <Grid className="text-blue-600"/>
                  Pilih Module
                </Button>
                <ButtonLogOut/>
              </div>
            </div>
          </div>
          <div className="rounded-lg grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 p-4 rounded-l-lg bg-white">
              <DetailField data={field} form={formDetail}/>
              <h3 className="text-primary text-2xl">Change Password</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
                  <InputText
                    form={form}
                    name="old_password"
                    className=""
                    label="Password Lama"
                    type="password"
                    placeholder="Password Lama"
                  />
                  <InputText
                    form={form}
                    name="new_password"
                    className=""
                    label="Password Baru"
                    type="password"
                    placeholder="Password Baru"
                  />
                  <InputText
                    form={form}
                    name="new_confirm_password"
                    className=""
                    label="Konfirmasi Password Baru"
                    type="password"
                    placeholder="Konfirmasi Password Baru"
                  />

                  <Button
                    disabled={loading || isDisabled}
                    className="bg-primary w-fit text-white   "
                  >
                    Simpan
                  </Button>
                  <div className="mt-5 text-sm">
                    <p className="font-medium text-neutral">Ketentuan Password</p>
                    <ul className="mt-2 space-y-1">
                      <li className={getClass(validations.length)}>
                        {validations.length ? <Check size={16}/> : <X size={16}/>} Minimal 8
                        karakter
                      </li>
                      <li className={getClass(validations.upper)}>
                        {validations.upper ? <Check size={16}/> : <X size={16}/>} Mengandung huruf
                        besar (A–Z)
                      </li>
                      <li className={getClass(validations.lower)}>
                        {validations.lower ? <Check size={16}/> : <X size={16}/>} Mengandung huruf
                        kecil (a–z)
                      </li>
                      <li className={getClass(validations.number)}>
                        {validations.number ? <Check size={16}/> : <X size={16}/>} Mengandung
                        angka (0–9)
                      </li>
                      <li className={getClass(validations.symbol)}>
                        {validations.symbol ? <Check size={16}/> : <X size={16}/>} Mengandung
                        simbol/karakter khusus (seperti ! @ # $ % ^ & *)
                      </li>
                    </ul>
                  </div>
                </form>
              </Form>
            </div>
            <div className="bg-[#E9E9E9] p-4 col-span-12 rounded-r-lg lg:col-span-4 ">
              <PhotoProfile img={profile?.gambar ?? ''}/>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ModuleProfileView
