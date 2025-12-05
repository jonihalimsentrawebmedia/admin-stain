import ChangePasswordViewModel from './ChangePasswordViewModel'
import { InputText } from '@/components/common/form/InputText'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Check, X } from 'lucide-react'

const ChangePasswordProfileView = () => {
  const { form, getClass, handleSave, isDisabled, loading, validations } = ChangePasswordViewModel()
  return (
    <div className="flex flex-col gap-4">
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
            className="bg-primary w-fit mx-auto text-white   "
          >
            Simpan
          </Button>
          <div className="mt-5 text-sm">
            <p className="font-medium text-neutral">Ketentuan Password</p>
            <ul className="mt-2 space-y-1">
              <li className={getClass(validations.length)}>
                {validations.length ? <Check size={16} /> : <X size={16} />} Minimal 8 karakter
              </li>
              <li className={getClass(validations.upper)}>
                {validations.upper ? <Check size={16} /> : <X size={16} />} Mengandung huruf besar
                (A–Z)
              </li>
              <li className={getClass(validations.lower)}>
                {validations.lower ? <Check size={16} /> : <X size={16} />} Mengandung huruf kecil
                (a–z)
              </li>
              <li className={getClass(validations.number)}>
                {validations.number ? <Check size={16} /> : <X size={16} />} Mengandung angka (0–9)
              </li>
              <li className={getClass(validations.symbol)}>
                {validations.symbol ? <Check size={16} /> : <X size={16} />} Mengandung
                simbol/karakter khusus (seperti ! @ # $ % ^ & *)
              </li>
            </ul>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ChangePasswordProfileView
