import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { Form } from '@/components/ui/form.tsx'
import CardInput from '@/components/common/card/CardInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import DetailField from '@/components/common/field/DetailField.tsx'
import { ContactUsResolver, type IContactUsTypeForm } from './resolver.tsx'
import { UseGetProdiContactUs } from '@/pages/modules/website-fakultas/academic/program-studi/detail/hooks'

const ProdiContactUsView = () => {
  const { id } = useParams()
  const { contactUs } = UseGetProdiContactUs((id as string) ?? '')

  const [isEdit, setIsEdit] = useState(false)

  const form = useForm<IContactUsTypeForm>({
    resolver: zodResolver(ContactUsResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IContactUsTypeForm) => {
    setLoading(true)
    await AxiosClient.post(`/fakultas/satuan-organisasi/${id}/hubungi-kami`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['prodi-contact-us'],
          })

          setLoading(false)
          setIsEdit(!isEdit)
          toast.success(res.data.message || 'Success Pengajuan tambah bidang kerjasama')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  const field = [
    {
      label: 'Alamat',
      name: 'alamat',
    },
    {
      label: 'Link Google Maps',
      name: 'link_google_map',
      component: (
        <>
          {contactUs?.link_google_map === '' ? (
            <>-</>
          ) : (
            <Link
              target={'_blank'}
              to={contactUs?.link_google_map?.trim() ? contactUs?.link_google_map : '#'}
              className="text-[#2769CD] font-bold underline"
            >
              Buka Maps
            </Link>
          )}
        </>
      ),
    },
    {
      label: 'Telepon',
      name: 'no_telepon',
    },
    {
      label: 'Email',
      name: 'email',
    },
  ]

  useEffect(() => {
    if (contactUs) {
      form.reset({
        ...contactUs,
      })
    }
  }, [contactUs])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-primary text-2xl font-medium">Hubungi Kami</div>
          {isEdit ? (
            <ButtonForm
              loading={loading}
              onCancel={() => {
                setIsEdit(false)
              }}
            />
          ) : (
            <Button
              onClick={() => {
                setIsEdit(!isEdit)
                form.reset({
                  ...contactUs,
                })
              }}
              variant={'outline'}
              className={'bg-white text-primary border-primary hover:text-primary'}
            >
              <HiPencil />
              Edit
            </Button>
          )}
        </div>
        <CardInput title="Hubungi Kami">
          {isEdit ? (
            <div className="flex flex-col gap-4">
              <TextInput form={form} name="alamat" label="Alamat" isRow />
              <TextInput
                form={form}
                name="link_google_map"
                type="url"
                label="Link Google Maps"
                isRow
              />
              <TextInput form={form} name="no_telepon" label="Telepon" isRow />
              <TextInput form={form} name="email" type="email" label="Email" isRow />
            </div>
          ) : (
            <DetailField data={field} form={form} />
          )}
        </CardInput>
      </form>
    </Form>
  )
}

export default ProdiContactUsView
