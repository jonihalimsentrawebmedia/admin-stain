import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import {
  ResolverCompanyLegal,
  type TypeCompanyLegal,
} from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/update/form/resolver.tsx'
import { useParams } from 'react-router-dom'
import { UseGetCompanyLegality } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import { toast } from 'react-toastify'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'

interface Props {
  setValue: Dispatch<SetStateAction<string>>
}

export const FormLegality = (props: Props) => {
  const { setValue } = props

  const { id } = useParams()
  const form = useForm<TypeCompanyLegal>({
    resolver: zodResolver(ResolverCompanyLegal),
  })

  const { legality } = UseGetCompanyLegality((id as string) ?? '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (legality) {
      form.reset({
        ...legality,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [legality])

  const queryClient = useQueryClient()

  const HandleSave = async (value: TypeCompanyLegal) => {
    setLoading(true)
    await AxiosClient.post(`/pusat-karir/mitra-kerja/${id}/profile/legalitas`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'success Update Data')
          queryClient.invalidateQueries({ queryKey: ['status-step'] })
          setValue('5')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'error Update Data')
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
          <div className="flex flex-col lg:grid grid-cols-2 gap-5">
            <TextInput
              form={form}
              name={'npwp'}
              label={'NPWP'}
              placeholder={'NPWP'}
              type={'number'}
              isRequired
            />
            <UploadFileInput
              form={form}
              name={'url_file_npwp'}
              keyname={'key_url_file_npwp'}
              label={'Upload NPWP'}
              accept={'application/pdf'}
              required
            />

            <TextInput
              form={form}
              name={'nib'}
              label={'NIB'}
              placeholder={'NIB'}
              type={'number'}
              isRequired
            />
            <UploadFileInput
              form={form}
              name={'url_file_nib'}
              keyname={'key_url_file_nib'}
              label={'Upload NIB'}
              accept={'application/pdf'}
              required
            />

            <TextInput
              name={'alamat_kantor'}
              form={form}
              label={'Alamat Kantor'}
              placeholder={'Alamat Kantor'}
              isRequired
            />

            <TextInput
              name={'link_google_maps'}
              form={form}
              label={'Link Google Maps*'}
              placeholder={'Link Google Maps*'}
              type={'url'}
              isRequired
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={() => setValue('3')}
            >
              Branding
            </Button>
            <Button disabled={loading}>Lanjutkan</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
