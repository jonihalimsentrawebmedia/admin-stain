import { useForm } from 'react-hook-form'
import { CampusIdentityResolver, type IIdentityCampus } from '../types/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { RichText } from '@/components/common/richtext'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetIdentity } from '@/pages/modules/website-utama/Identity/hooks'

export const UpdateIdentityPage = () => {
  const { identityCampus } = UseGetIdentity()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm<IIdentityCampus>({
    resolver: zodResolver(CampusIdentityResolver),
  })

  useEffect(() => {
    if (identityCampus) {
      form.reset({
        teks_pengantar:identityCampus?.teks_pengantar,
        dokumen_status_url:identityCampus?.dokumen_status_url,
        isi_nama:identityCampus?.isi_nama,
        isi_kedudukan:identityCampus?.isi_kedudukan,
        isi_berdiri:identityCampus?.isi_berdiri,
        isi_busana_akademik:identityCampus?.isi_busana_akademik,
        lambang_url:identityCampus?.lambang_url,
        isi_lambang:identityCampus?.isi_lambang,
        bendera_url:identityCampus?.bendera_url,
        isi_bendera:identityCampus?.isi_bendera,
        isi_mars_hymne:identityCampus?.isi_mars_hymne,
      })
    }
  }, [identityCampus])

  const HandleSave = async (value: IIdentityCampus) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/identitas', value).then((res) => {
      if (res?.data?.status) {
        setLoading(false)
        navigate('/modules/website-utama/identity')
        toast.success('Data berhasil disimpan')
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5 mt-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Identitas'}
            isBack
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />

          <Accordion
            className={'flex flex-col gap-5'}
            type={'multiple'}
            defaultValue={[
              'pengantar',
              'nama',
              'kedudukan',
              'berdiri',
              'busana',
              'lambang',
              'bendera',
              'mars',
            ]}
          >
            <AccordionCustom
              name={'pengantar'}
              title={'Pengantar'}
              contentClassName={'flex flex-col gap-5'}
            >
              <RichText form={form} name={'teks_pengantar'} label={'Pengantar'} isRow required />
              <UploadFileInput
                label={'Dokumen Status'}
                form={form}
                name={'dokumen_status_url'}
                keyname={'dokumen_status_key'}
                innerClassName={'w-1/2'}
                required
                isRow
              />
            </AccordionCustom>

            <AccordionCustom name={'nama'} title={'Nama'}>
              <RichText form={form} name={'isi_nama'} label={'Isi Konten Nama'} isRow required />
            </AccordionCustom>

            <AccordionCustom name={'kedudukan'} title={'Kedudukan'}>
              <RichText
                form={form}
                name={'isi_kedudukan'}
                label={'Isi Konten Kedudukan'}
                isRow
                required
              />
            </AccordionCustom>

            <AccordionCustom name={'berdiri'} title={'Berdiri'}>
              <RichText
                form={form}
                name={'isi_berdiri'}
                label={'Isi Konten Berdiri'}
                isRow
                required
              />
            </AccordionCustom>

            <AccordionCustom name={'busana'} title={'Busana Akademik'}>
              <RichText
                form={form}
                name={'isi_busana_akademik'}
                label={'Isi Busana Akademik'}
                isRow
                required
              />
            </AccordionCustom>

            <AccordionCustom
              name={'lambang'}
              title={'Lambang'}
              contentClassName={'flex flex-col gap-5'}
            >
              <UploadImageRatio
                isRow
                name={'lambang_url'}
                form={form}
                label={'Gambar Lambang'}
                required
                maxWidthClassName={'max-w-[150px]'}
                aspectRatioWidth={1}
                aspectRatioHeight={1}
              />
              <RichText
                form={form}
                name={'isi_lambang'}
                label={'Isi Konten Lambang'}
                isRow
                required
              />
            </AccordionCustom>

            <AccordionCustom
              name={'bendera'}
              title={'Bendera'}
              contentClassName={'flex flex-col gap-5'}
            >
              <UploadImageRatio
                isRow
                name={'bendera_url'}
                form={form}
                label={'Gambar Bendera'}
                required
                maxWidthClassName={'max-w-[180px]'}
                aspectRatioWidth={3}
                aspectRatioHeight={2}
              />
              <RichText
                form={form}
                name={'isi_bendera'}
                label={'Isi Konten Bendera'}
                isRow
                required
              />
            </AccordionCustom>

            <AccordionCustom name={'mars'} title={'Mars & Hymne'}>
              <RichText form={form} name={'isi_mars_hymne'} label={'Mars & Hymne'} isRow required />
            </AccordionCustom>
          </Accordion>

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
