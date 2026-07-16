import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ResolverUser, type TResolverUser } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UseGetRole } from '@/pages/modules/SIM-RS/user-management/role/hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
  const [loading, setLoading] = useState(false)
  const { role } = UseGetRole({ limit: '100' })

  const form = useForm<TResolverUser>({
    resolver: zodResolver(ResolverUser),
  })

  const navigate = useNavigate()

  const HandleSave = async (value: TResolverUser) => {
    setLoading(true)
    await AxiosClient.post('/simrs/manajemen-user/user', value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
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
    <div className="space-y-5">
      <ButtonTitleGroup isBack label={'Tambah User'} buttonGroup={[]} />

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
                type={'number'}
                form={form}
                isRequired
                inputClassName="bg-white"
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
    </div>
  )
}

export default CreateUser
