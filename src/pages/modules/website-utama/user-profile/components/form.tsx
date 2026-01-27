import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import {
  type IUserProfileResolver,
  UserProfileResolver,
} from '@/pages/modules/website-utama/user-profile/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import type { IUserProfile } from '@/pages/modules/website-utama/user-profile/data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  edit: boolean
  setEdit: Dispatch<SetStateAction<boolean>>
  data?: IUserProfile
}

export const FormUserProfile = (props: Props) => {
  const { edit, setEdit, data } = props

  const [loading, setLoading] = useState(false)

  const form = useForm<IUserProfileResolver>({
    resolver: zodResolver(UserProfileResolver),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: IUserProfileResolver) => {
    setLoading(true)
    await AxiosClient.post('/profil', value)
      .then((res) => {
        if (res?.data?.status) {
          setEdit(!edit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['profile-user'],
          })
          toast.success(res?.data?.message || 'Data berhasil disimpan')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan')
      })
  }

  useEffect(() => {
    if (data) {
      form.reset({
        nama_lengkap: data.nama_lengkap,
        jabatan: data.jabatan,
        jenis_kelamin: data.jenis_kelamin,
        telepon: data.telepon,
        email: data.email,
        gambar: data.gambar,
      })
    }
  }, [data])

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4 mt-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            isBack
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => setEdit(!edit) },
              { type: 'save', label: 'Simpan', isDisabled: loading },
            ]}
            label="User Profile"
          />

          <UploadImageRatio
            name={'gambar'}
            form={form}
            label={'Foto Profil'}
            maxWidthClassName={'max-w-[10rem]'}
            aspectRatioWidth={3}
            aspectRatioHeight={4}
          />

          <Accordion type={'single'} defaultValue={'form'}>
            <AccordionCustom
              name={'form'}
              title={'Informasi User'}
              contentClassName={'flex flex-col gap-4'}
            >
              <TextInput
                name={'nama_lengkap'}
                form={form}
                label={'Nama Lengkap'}
                placeholder={'Nama Lengkap'}
                inputClassName={'w-1/2'}
                isRow
                isRequired
              />
              <TextInput
                name={'jabatan'}
                form={form}
                label={'Jabatan'}
                placeholder={'Jabatan'}
                inputClassName={'w-1/2'}
                isRow
                isRequired
              />
              <InputRadio
                form={form}
                label={'Jenis Kelamin'}
                name={'jenis_kelamin'}
                data={[
                  { label: 'Laki-laki', value: 'L' },
                  { label: 'Perempuan', value: 'P' },
                ]}
                isRow
              />
              <TextInput
                name={'telepon'}
                form={form}
                label={'Telepon'}
                placeholder={'Telepon'}
                inputClassName={'w-1/2'}
                type={'number'}
                isRow
                isRequired
              />
              <TextInput
                name={'email'}
                form={form}
                label={'Email'}
                placeholder={'Email'}
                inputClassName={'w-1/2'}
                type={'email'}
                isRow
                isRequired
              />

              <div className="grid grid-cols-[12rem_1fr] gap-5">
                <p className="text-gray-500">Level User</p>
                <p>{data?.level_user}</p>
                <p className="text-gray-500">Satuan Kerja</p>
                <ul className={'list-decimal flex flex-col gap-1.5 pl-4'}>
                  {data?.satuan_kerja?.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              </div>
            </AccordionCustom>
          </Accordion>

          <ButtonTitleGroup
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => setEdit(!edit) },
              { type: 'save', label: 'Simpan', isDisabled: loading },
            ]}
            label=""
          />
        </form>
      </Form>
    </>
  )
}
