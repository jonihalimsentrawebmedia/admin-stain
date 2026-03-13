import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import {
  ResolverCompanyBranding,
  type TypeCompanyBranding,
} from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/update/form/resolver.tsx'
import { useParams } from 'react-router-dom'
import { UseGetCompanyBranding } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import { toast } from 'react-toastify'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetCompanySize } from '@/pages/modules/pusat-karir/reference/company-size/hooks'
import { UseGetIndustryCategory } from '@/pages/modules/pusat-karir/reference/industry-category/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'

interface Props {
  setValue: Dispatch<SetStateAction<string>>
}

export const FormBranding = (props: Props) => {
  const { setValue } = props

  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const form = useForm<TypeCompanyBranding>({
    resolver: zodResolver(ResolverCompanyBranding),
  })

  const { branding } = UseGetCompanyBranding((id as string) ?? '')
  const { loading: load1, companySize } = UseGetCompanySize({
    page: '0',
    limit: '0',
  })
  const { loading: load2, categoryIndustry } = UseGetIndustryCategory({
    page: '0',
    limit: '0',
  })

  useEffect(() => {
    if (branding)
      form.reset({
        ...branding,
      })
  }, [branding])

  const queryClient = useQueryClient()

  const HandleSave = async (value: TypeCompanyBranding) => {
    setLoading(true)
    await AxiosClient.post(`/pusat-karir/mitra-kerja/${id}/profile/branding`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'success Update Data')
          queryClient.invalidateQueries({ queryKey: ['status-step'] })
          setLoading(false)
          setValue('4')
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

          <TitleLine title={'Branding'} />
          <UploadPhotoImage name={'url_foto_profil'} form={form} ratio_width={4} ratio_height={3} />
          <TextInput
            form={form}
            name={'deskripsi_singkat'}
            placeholder={'Slogan / Tagline (opsional)'}
            label={'Deskripsi Singkat'}
            isRow
          />

          <TextAreaInput
            form={form}
            name={'tentang_perusahaan'}
            placeholder={'Tentang Perusahaan'}
            label={'Tentang Perusahaan*'}
            isRequired
            isRow
          />

          <SelectBasicInput
            form={form}
            name={'id_kategori_industri'}
            label={'Kategori Industri'}
            placeholder={'Kategori Industri'}
            isLoading={load1}
            isRequired
            usePortal
            isRow
            data={
              categoryIndustry?.map((row) => ({
                label: row?.nama_kategori_industri,
                value: row?.id_kategori_industri,
              })) ?? []
            }
          />

          <SelectBasicInput
            form={form}
            name={'id_ukuran_perusahaan'}
            label={'Ukuran Perusahaan'}
            placeholder={'Ukuran Perusahaan'}
            isLoading={load2}
            isRequired
            usePortal
            isRow
            data={
              companySize?.map((row) => ({
                label: `${row?.jumlah_terendah}-${row?.jumlah_teratas}`,
                value: row?.id_ukuran_perusahaan,
              })) ?? []
            }
          />

          <div className="flex items-center justify-between">
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={() => setValue('2')}
            >
              Informasi Kontak
            </Button>
            <Button disabled={loading}>Lanjutkan</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
