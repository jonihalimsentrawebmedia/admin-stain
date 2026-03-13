import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import {
  ResolverCompanySocialMedia,
  type TypeCompanySocialMedia,
} from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/update/form/resolver.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetCompanyMediaSocial } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import { toast } from 'react-toastify'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'

interface Props {
  setValue: Dispatch<SetStateAction<string>>
}

export const FormSocialMedia = (props: Props) => {
  const { setValue } = props

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<TypeCompanySocialMedia>({
    resolver: zodResolver(ResolverCompanySocialMedia),
  })

  const { id } = useParams()
  const { mediaSocial } = UseGetCompanyMediaSocial((id as string) ?? '')

  const navigate = useNavigate()

  useEffect(() => {
    if (mediaSocial) {
      form.reset({
        ...mediaSocial,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaSocial])

  const queryClient = useQueryClient()

  const HandleSave = async (value: TypeCompanySocialMedia) => {
    setLoading(true)
    await AxiosClient.post(`/pusat-karir/mitra-kerja/${id}/profile/media-social`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          queryClient.invalidateQueries({ queryKey: ['short-profile'] })
          toast.success(res.data.message || 'success Update Data')
          setOpen(true)
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
              name={'url_linkedin'}
              label={'LinkedIn'}
              placeholder={'Masukkan URL LinkedIn'}
              type={'url'}
              isRequired
            />
            <TextInput
              form={form}
              name={'url_instagram'}
              placeholder={'Masukkan URL Instagram'}
              label={'Instagram'}
              type={'url'}
              isRequired
            />

            <TextInput
              form={form}
              name={'email_recuitment'}
              label={'Email Recruitment'}
              placeholder={'Email Recruitment'}
              type={'email'}
              isRequired
            />

            <TextInput
              name={'url_website_karir'}
              form={form}
              label={'Website Karir'}
              placeholder={'Website Karir'}
              type={'url'}
              isRequired
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={() => setValue('4')}
            >
              Legalitas
            </Button>
            <Button disabled={loading}>Lanjutkan</Button>
          </div>
        </form>
      </Form>

      <DialogBasic
        open={open}
        setOpen={setOpen}
        title={'Profil Sudah Lengkap!'}
        description={
          'Terima kasih telah melengkapi profil anda. Sekarang anda dapat memposting ke lowongan pekerjaan yang tersedia.'
        }
      >
        <div className={'flex items-center justify-center'}>
          <Button
            onClick={() => navigate('/modules/pusat-karir/management-user/user?type=MITRA_KERJA')}
            variant={'outline'}
            className={'border-primary text-primary hover:text-primary'}
          >
            Tutup
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}
