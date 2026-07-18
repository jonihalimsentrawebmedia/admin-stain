import { Form } from '@/components/ui/form.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { Label } from '@radix-ui/react-label'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import CaptchaMath from '@/pages/login/component/captchaMath.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

export const FormLoginSIMRS = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm()
  const [sameValue, setSameValue] = useState(false)
  const navigate = useNavigate()

  const handleSave = async (value: any) => {
    setLoading(true)
    if (!sameValue) {
      toast.error('Captcha tidak sesuai, silahkan coba lagi')
      setLoading(false)
    } else {
      await AxiosClient.post('/simrs/auth/login', value)
        .then((res) => {
          if (res.data.status) {
            Cookies.set('token', res?.data?.data?.token, { expires: 1 })
            toast.success('Berhasil login')
            navigate('/modules/sim-rs/dashboard')
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Gagal login')
          setLoading(false)
        })
    }
  }

  return (
    <>
      <div className="rounded-lg bg-white flex flex-col gap-4 p-4">
        <p>Silahkan login terlebih dahulu agar dapat mengakses aplikasi.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
            <TextInput placeholder={'Email'} form={form} name="email" label="Email" />
            <TextInput
              placeholder={'Password'}
              form={form}
              name="password"
              label="Password"
              type="password"
            />

            <CaptchaMath setSameAction={setSameValue} />

            <div className="flex gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox id="isRemember" />
                <Label htmlFor="isRemember" className="text-neutral font-normal">
                  Ingat Saya
                </Label>
              </div>
              <Link to={'/sim-rs/forget-password'} className="underline text-blue-500">
                Lupa Password?
              </Link>
            </div>

            <Button disabled={loading} className="bg-primary w-fit mx-auto text-white">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
