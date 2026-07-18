import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaKey } from 'react-icons/fa'
import type { IUserList } from '../data/types.ts'
import {
  ResolverResetPassword,
  type TResolverResetPassword,
} from '../data/resolver.tsx'

interface Props {
  data: IUserList
}

export const ButtonResetPassword = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const form = useForm<TResolverResetPassword>({
    resolver: zodResolver(ResolverResetPassword),
  })

  const HandleSave = async (value: TResolverResetPassword) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/manajemen-user/user/${data.id_user}/password`, {
      password: value.password_baru,
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Berhasil mereset password')
          queryClient.invalidateQueries({ queryKey: ['user-list'] })
          setOpen(false)
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mereset password')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={'bg-green-500 text-white hover:bg-green-600 p-1.5 rounded'}
      >
        <FaKey />
      </button>

      <DialogBasic
        className={'lg:min-w-xl rounded'}
        title={'Reset Password'}
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <p className="text-sm text-gray-500">
                Reset password untuk user <span className="font-semibold text-gray-700">{data.nama_lengkap}</span>
              </p>
              <TextInput
                name="password_baru"
                label="Password Baru"
                placeholder="Masukkan password baru"
                form={form}
                isRequired
                inputClassName="bg-white"
              />
              <TextInput
                name="confirm_password"
                label="Konfirmasi Password"
                placeholder="Masukkan konfirmasi password"
                form={form}
                isRequired
                inputClassName="bg-white"
              />
            </div>

            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                {
                  type: 'cancel',
                  label: 'Batal',
                  onClick: () => setOpen(false),
                },
                {
                  type: 'custom',
                  element: (
                    <button
                      disabled={loading}
                      type="submit"
                      className={
                        'bg-green-500 flex items-center gap-1.5 px-3 text-white hover:bg-green-600 p-1.5 rounded'
                      }
                    >
                      <FaKey />
                      Simpan
                    </button>
                  ),
                },
              ]}
            />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
