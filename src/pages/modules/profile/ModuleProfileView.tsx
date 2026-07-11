import PATERN from '@/assets/img/patern.png'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ButtonLogOut from '@/pages/modules/components/buttonLogOut.tsx'
import { Check, Grid, X } from 'lucide-react'
import ModuleProfileViewModel from './ModuleProfileViewModel'
import DetailField from '@/components/common/field/DetailField'
import { Form } from '@/components/ui/form'
import { InputText } from '@/components/common/form/InputText'
import PhotoProfile from './components/PhotoProfile'
import { UseGetIdentityPublic } from '@/pages/login/hooks'

const ModuleProfileView = () => {
  const { field, form, formDetail, getClass, handleSave, isDisabled, loading, profile, validations, goToModule } = ModuleProfileViewModel()
  const { publicIdentity } = UseGetIdentityPublic()

  return (
    <div
      style={{ backgroundImage: `url(${publicIdentity?.background})` }}
      className="relative h-screen w-full bg-cover bg-center overflow-y-auto flex items-start sm:items-center justify-center"
    >
      <Card className="w-full max-w-5xl backdrop-blur-md bg-white/80 shadow-lg border-0 rounded-none sm:rounded-xl p-2">
        <CardContent className="p-4 flex flex-col gap-4">
          {/* Header */}
          <div className="bg-green-800 rounded-xl overflow-hidden">
            <div
              style={{ backgroundImage: `url(${PATERN})` }}
              className="bg-cover bg-center p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
            >
              <div className="flex gap-3 items-center">
                <div className="size-14 sm:size-16 bg-white rounded-xl flex-shrink-0 flex items-center justify-center">
                  <img src={publicIdentity?.logo ?? '/noimg.png'} alt="logo" className="size-8 sm:size-10 rounded-full object-cover" />
                </div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">Manajemen Pengelolaan Website</p>
                  <p className="text-base sm:text-lg font-bold text-white">{publicIdentity?.nama}</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button onClick={goToModule} variant="secondary" className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 border-0 gap-1 h-9">
                  <Grid className="size-4 text-blue-600" />
                  Pilih Module
                </Button>
                <ButtonLogOut />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 bg-white rounded-xl p-4 space-y-4">
              <DetailField data={field} form={formDetail} />
              <hr />
              <p className="text-primary font-semibold text-sm">Change Password</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
                  <InputText form={form} name="old_password" label="Password Lama" type="password" placeholder="Password Lama" />
                  <InputText form={form} name="new_password" label="Password Baru" type="password" placeholder="Password Baru" />
                  <InputText form={form} name="new_confirm_password" label="Konfirmasi Password Baru" type="password" placeholder="Konfirmasi Password Baru" />
                  <Button type="submit" disabled={loading || isDisabled} className="w-full sm:w-fit bg-primary hover:bg-primary/90 text-white h-9">
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                  <div className="text-xs">
                    <p className="font-medium text-gray-500 mb-1">Ketentuan Password</p>
                    <ul className="space-y-0.5">
                      <li className={getClass(validations.length)}>{validations.length ? <Check size={13} /> : <X size={13} />} Minimal 8 karakter</li>
                      <li className={getClass(validations.upper)}>{validations.upper ? <Check size={13} /> : <X size={13} />} Mengandung huruf besar (A–Z)</li>
                      <li className={getClass(validations.lower)}>{validations.lower ? <Check size={13} /> : <X size={13} />} Mengandung huruf kecil (a–z)</li>
                      <li className={getClass(validations.number)}>{validations.number ? <Check size={13} /> : <X size={13} />} Mengandung angka (0–9)</li>
                      <li className={getClass(validations.symbol)}>{validations.symbol ? <Check size={13} /> : <X size={13} />} Mengandung simbol/karakter khusus</li>
                    </ul>
                  </div>
                </form>
              </Form>
            </div>
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-gray-50 rounded-xl p-4">
                <PhotoProfile img={profile?.gambar ?? ''} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ModuleProfileView
