import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const ChangePassword = () => {
  const form = useForm()

  const HandleSave = async (value: any) => {
    if (value?.new_password === value?.confirm_new_password) {
      await AxiosClient.patch('/profil/ganti-password', {
        old_password: value?.old_password,
        new_password: value?.new_password,
      })
        .then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message || 'Password berhasil diganti')
            form.reset({
              old_password: '',
              new_password: '',
              confirm_new_password: '',
            })
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        })
    } else {
      toast.error('Password baru tidak sama dengan konfirmasi password baru')
    }
  }

  return (
    <>
      <div className="col-span-2 pt-5">
        <p className="lg:text-2xl font-semibold">Ganti Password</p>
      </div>

      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            name={'old_password'}
            form={form}
            placeholder={'Password Lama'}
            label={'Password Lama'}
            type={'password'}
            className={'w-1/2'}
            inputClassName={'w-full'}
            isRequired
            isRow
          />

          <TextInput
            name={'new_password'}
            form={form}
            placeholder={'Password Baru'}
            label={'Password Baru'}
            type={'password'}
            className={'w-1/2'}
            inputClassName={'w-full'}
            isRequired
            isRow
          />

          <TextInput
            name={'confirm_new_password'}
            form={form}
            placeholder={'Ketik Ulang Password Baru'}
            label={'Ketik Ulang Password Baru'}
            type={'password'}
            className={'w-1/2'}
            inputClassName={'w-full'}
            isRequired
            isRow
          />

          <div className="grid grid-cols-[12rem_1fr] gap-5">
            <div />
            <Button className={'w-fit'}>Simpan</Button>
          </div>

          <div className="col-span-2">
            <div className="text-gray-500">
              <p>Ketentuan Password</p>
              <ul className="texst-xs list-disc ml-5">
                <li
                  className={`${
                    form.watch('new_password') && form.watch('new_password')?.length >= 8
                      ? 'text-green-500'
                      : 'text-gray-400'
                  }`}
                >
                  Minimal 8 karakter
                </li>
                <li
                  className={
                    /[A-Z]/.test(form?.watch('new_password')) ? 'text-green-500' : 'text-gray-400'
                  }
                >
                  Mengandung huruf besar (A–Z)
                </li>
                <li
                  className={
                    form?.watch('new_password')
                      ? /[a-z]/.test(form?.watch('new_password'))
                        ? 'text-green-500'
                        : ''
                      : 'text-gray-400'
                  }
                >
                  Mengandung huruf kecil (a–z)
                </li>
                <li
                  className={
                    /[0-9]/.test(form?.watch('new_password')) ? 'text-green-500' : 'text-gray-400'
                  }
                >
                  Mengandung angka (0–9)
                </li>
                <li
                  className={
                    /[!@#$%^&+*]/.test(form?.watch('new_password'))
                      ? 'text-green-500'
                      : 'text-gray-400'
                  }
                >
                  Mengandung simbol/karakter khusus (seperti ! @ # $ % ^ & *)
                </li>
              </ul>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
