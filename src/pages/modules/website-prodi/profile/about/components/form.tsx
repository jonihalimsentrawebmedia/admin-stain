import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import CardInput from '@/components/common/card/CardInput.tsx'
import { RichText } from '@/components/common/richtext'
import ImageAbout from '@/pages/modules/website-utama/program-studi/detail/tentang/components/ImageAbout.tsx'
import { useForm } from 'react-hook-form'
import { UseGetAboutProfile } from '@/pages/modules/website-prodi/profile/about/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import {
  AboutResolver,
  type IAboutTypeForm,
} from '@/pages/modules/website-utama/program-studi/detail/model/about-resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

export const FormAboutProdi = () => {
  const form = useForm<IAboutTypeForm>({
    resolver: zodResolver(AboutResolver),
  })
  const { aboutProfile: detail } = UseGetAboutProfile()

  const queryClient = useQueryClient()

  const handleSave = async (value: IAboutTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/prodi/profil/tentang', value)
      .then((res) => {
        if (res.data.status) {
          setIsEditContent(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['about-profile'],
          })
          toast.success(res.data.message || 'Berhasil menyimpan data')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  const [loading, setLoading] = useState(false)
  const [isEditContent, setIsEditContent] = useState(false)
  const [image, setImage] = useState([''])

  useEffect(() => {
    if (detail) {
      let tempImage = []
      for (let i = 0; i < 3; i++) {
        if (detail.gambar !== null && detail.gambar[i]) {
          tempImage.push(detail.gambar[i])
        } else {
          tempImage.push('')
        }
      }
      setImage(tempImage)
    }
  }, [detail])

  useEffect(() => {
    if (image) {
      const temp = form.watch()
      form.reset({
        ...temp,
        gambar: image,
      })
    }
  }, [image])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-medium">Tentang Prodi</p>
            {isEditContent ? (
              <ButtonForm
                loading={loading}
                onCancel={() => {
                  setIsEditContent(false)
                }}
              />
            ) : (
              <Button
                onClick={() => {
                  setIsEditContent(!isEditContent)
                  form.reset({
                    isi_konten: detail?.isi_konten,
                    gambar: image,
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
          <CardInput title="Tentang Prodi">
            {isEditContent ? (
              <RichText form={form} name="isi_konten" label="" isRow={false} />
            ) : (
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: detail?.isi_konten ?? '' }}
              />
            )}
          </CardInput>
          <CardInput title="Gambar (Minimal 1 gambar)">
            <ul className="list-disc ml-4 pl-4 list-outside text-[#2769CD]">
              <li>Ukuran 4x3</li>
              <li>Jenis .jpg/.jpeg/.png</li>
              <li>Max 2 MB</li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
              {image.map((item, index) => (
                <ImageAbout
                  key={index}
                  img={item}
                  isEdit={isEditContent}
                  setImage={(value) => {
                    const temp = [...image]
                    temp[index] = value
                    setImage(temp)
                  }}
                />
              ))}
            </div>
          </CardInput>
        </div>
      </form>
    </Form>
  )
}
