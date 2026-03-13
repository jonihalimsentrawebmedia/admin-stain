import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { ResolverCompanyContact, type TypeCompanyContact } from './resolver.tsx'
import { UseGetCompanyContact } from '../../hooks/index.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'

interface Props {
  setValue: Dispatch<SetStateAction<string>>
}

export const FormContactCompany = (props: Props) => {
  const { setValue } = props

  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const form = useForm<TypeCompanyContact>({
    resolver: zodResolver(ResolverCompanyContact),
  })

  const { contact } = UseGetCompanyContact((id as string) ?? '')

  useEffect(() => {
    if (contact) {
      form.reset({
        ...contact,
      })
    }
  }, [contact])

  const queryClient = useQueryClient()

  const HandleSave = async (value: TypeCompanyContact) => {
    setLoading(true)
    await AxiosClient.post(`/pusat-karir/mitra-kerja/${id}/profile/informasi-kontak`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'success Update Data')
          queryClient.invalidateQueries({ queryKey: ['status-step'] })
          setLoading(false)
          setValue('3')
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || 'error Update Data')
        setLoading(false)
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4 w-full'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Edit User - Mitra Kerja'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Button
                    variant={'outline'}
                    className={'border-primary text-primary hover:text-primary'}
                    onClick={(e) => {
                      e.preventDefault()
                      const data = form.getValues()
                      console.log(data)
                      toast.info('Coming Soon...')
                    }}
                  >
                    Simpan & Keluar
                  </Button>
                ),
              },
              {
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />

          <div
            className={
              'text-blue-700 border border-blue-500 p-1.5 px-3 rounded-full w-fit flex gap-2 items-center'
            }
          >
            <MdInfo className={'text-primary-500  size-4'} />
            Silahkan lakukan perubahan informasi User
          </div>

          <TitleLine title={'Informasi Kontak'} />
          <TextInput
            form={form}
            name={'nama_lengkap'}
            label={'Nama Lengkap'}
            placeholder={'Nama Lengkap'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'jabatan'}
            label={'Jabatan'}
            placeholder={'Jabatan'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'no_handphone'}
            label={'No Handephone'}
            placeholder={'Nomor Handphone'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'email'}
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'telepon_kerja'}
            label={'Telepon Kerja'}
            placeholder={'Telepon Kerja'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'username'}
            label={'Username'}
            placeholder={'Username'}
            isRequired
            isRow
          />

          <div className="flex items-center justify-between">
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={() => setValue('1')}
            >
              Informasi Perusahaan
            </Button>
            <Button disabled={loading}>Lanjutkan</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
