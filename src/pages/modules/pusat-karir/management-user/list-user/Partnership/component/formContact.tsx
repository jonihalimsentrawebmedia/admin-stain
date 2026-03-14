import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios'
import type { ICompanyProfile } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/data/types.tsx'
import { useNavigate } from 'react-router-dom'
import {
  ResolverFormContact,
  type TypeContactInformation,
} from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/data/resolver.tsx'
import { toast } from 'react-toastify'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface Props {
  setValue: Dispatch<SetStateAction<string>>
  detail?: ICompanyProfile
}

export const FormContactInformation = (props: Props) => {
  const { setValue, detail } = props

  const form = useForm<TypeContactInformation>({
    resolver: zodResolver(ResolverFormContact),
  })

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (detail) {
      form.reset({
        ...detail?.informasi_kontak,
      })
    }
  }, [detail])

  const HandleSave = async (value: TypeContactInformation) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/mitra-kerja/create-mitra-kerja', {
      ...detail?.informasi_perusahaan,
      ...value,
      password: value.no_handphone,
    })
      .then((res2) => {
        if (res2?.data?.status) {
          window.localStorage.removeItem('temp_id')
          toast.success(res2?.data?.message || 'Berhasil mendaftar')
          setLoading(false)
          navigate('/modules/pusat-karir/management-user/user?type=MITRA_KERJA')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan')
      })
  }

  return (
    <>
      <Form {...form}>
        <form
          className={'flex flex-col gap-4 w-full mt-8'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          <TextInput
            name={'nama_lengkap'}
            form={form}
            label={'Nama Lengkap'}
            placeholder={'Nama Lengkap'}
            isRequired
            isRow
          />

          <TextInput
            name={'jabatan'}
            form={form}
            label={'Jabatan'}
            placeholder={'Jabatan'}
            isRequired
            isRow
          />

          <TextInput
            name={'no_handphone'}
            form={form}
            label={'Nomor Handphone'}
            placeholder={'Nomor Handphone'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            name={'email'}
            form={form}
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            isRequired
            isRow
          />

          <TextInput
            name={'telepon_kerja'}
            form={form}
            label={'Telepon Kerja'}
            placeholder={'Telepon Kerja'}
            type={'number'}
            isRow
          />

          <TextInput
            name={'username'}
            form={form}
            label={'Username'}
            placeholder={'Username'}
            isRequired
            isRow
          />

          <TextInput
            name={'password'}
            form={form}
            label={'Password'}
            placeholder={'password default adalah nomor handphone'}
            type={'password'}
            isDisabled
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setValue('step_1')} />
        </form>
      </Form>
    </>
  )
}
