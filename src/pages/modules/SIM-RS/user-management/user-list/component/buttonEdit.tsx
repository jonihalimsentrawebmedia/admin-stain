import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ResolverUser, type TResolverUser } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UseGetRole } from '@/pages/modules/SIM-RS/user-management/role/hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import type { IUserList } from '../data/types.ts'

interface Props {
  data: IUserList
}

export const FormEditUser = ({ data }: Props) => {
  const [loading, setLoading] = useState(false)
  const { role } = UseGetRole({ limit: '100' })

  const form = useForm<TResolverUser>({
    resolver: zodResolver(ResolverUser),
  })

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({
        nama: data.nama,
        email: data.email,
        nomor_telepon: data.nomor_telepon,
        id_role: data.id_role,
      })
    }
  }, [data, form])

  const HandleSave = async (value: TResolverUser) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/manajemen-user/user/${data.id_user}`, value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          queryClient.invalidateQueries({ queryKey: ['user-list'] })
          queryClient.invalidateQueries({ queryKey: ['detail-user', data.id_user] })
          navigate('/modules/sim-rs/user-management/user-list')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  const roleData = role?.map((row) => ({ label: row.nama_role, value: row.id_role })) ?? []

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-6">
        <section className="space-y-4">
          <TitleLine title="Informasi User" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TextInput
              name="nama"
              label="Nama"
              placeholder="Masukkan nama"
              form={form}
              isRequired
              inputClassName="bg-white"
            />
            <TextInput
              name="email"
              label="Email"
              placeholder="Masukkan email"
              form={form}
              isRequired
              inputClassName="bg-white"
            />
            <TextInput
              name="nomor_telepon"
              label="No. Telepon"
              placeholder="Masukkan nomor telepon"
              form={form}
              isRequired
              inputClassName="bg-white"
              type={'number'}
            />
            <SelectBasicInput
              name="id_role"
              label="Role"
              placeholder="Pilih role"
              form={form}
              data={roleData}
              usePortal
              isRequired
            />
          </div>
        </section>

        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}
