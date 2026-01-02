import { useEffect, useState } from 'react'
import useGetContactUs from '../controller/useGetContactUs'
import { ContactUsResolver, type IContactUsTypeForm } from '../model/contact-us'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import ButtonForm from '@/components/common/button/ButtonForm'
import { Button } from '@/components/ui/button'
import { HiPencil } from 'react-icons/hi'
import { Form } from '@/components/ui/form'
import CardInput from '@/components/common/card/CardInput'
import TextInput from '@/components/common/form/TextInput'
import DetailField from '@/components/common/field/DetailField'

const ContactUsProgramStudyView = () => {
  const { contactUsDetail } = useGetContactUs()
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm<IContactUsTypeForm>({
    resolver: zodResolver(ContactUsResolver),
  })
  const { id } = useParams()

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IContactUsTypeForm) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/satuan-organisasi/${id}/hubungi-kami`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['program-studi-contact-us'],
          })

          setLoading(false)
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
        <Link
          to={contactUsDetail?.link_google_map ?? '#'}
          className="text-[#2769CD] font-bold underline"
        >
          Buka Maps
        </Link>
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
    if (contactUsDetail) {
      form.reset({
        ...contactUsDetail,
      })
    }
  }, [contactUsDetail])
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
                  ...contactUsDetail,
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

export default ContactUsProgramStudyView
