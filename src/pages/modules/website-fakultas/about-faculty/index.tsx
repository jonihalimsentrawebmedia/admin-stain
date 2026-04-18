import CardInput from '@/components/common/card/CardInput.tsx'
import { Button } from '@/components/ui/button.tsx'

import { useEffect, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import { RichText } from '@/components/common/richtext'
import ImageAbout from '@/pages/modules/website-utama/program-studi/detail/tentang/components/ImageAbout.tsx'
import { useForm } from 'react-hook-form'
import { UseGetFacultyAbout } from '@/pages/modules/website-fakultas/about-faculty/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

const AboutFacultyView = () => {
  const { facultyAbout } = UseGetFacultyAbout()

  const [loading, setLoading] = useState(false)
  const [isEditContent, setIsEditContent] = useState(false)
  const [image, setImage] = useState<{ is_thumbnail: boolean; url: string }[]>([])

  const form = useForm()

  const HandlerSave = async (data: any) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/profil/tentang', data)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setIsEditContent(false)
          toast.success(res.data.message || 'Success menyimpan data')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  useEffect(() => {
    if (facultyAbout) {
      const tempImage = Array.from({ length: 3 }, (_, i) => {
        return facultyAbout.gambar?.[i] || { is_thumbnail: false, url: '' }
      })
      setImage(tempImage)

      form.reset({
        isi_konten: facultyAbout.isi_konten || '',
        gambar: tempImage,
      })
    }
  }, [facultyAbout])

  useEffect(() => {
    form.setValue('gambar', image)
  }, [image])

  const updateImage = (index: number, newImage: { is_thumbnail: boolean; url: string }) => {
    setImage((prev) => {
      const updated = [...prev]

      // Jika user mengaktifkan thumbnail
      if (newImage.is_thumbnail) {
        // Matikan semua thumbnail yang lain
        updated.forEach((img, i) => {
          img.is_thumbnail = i === index
        })
      } else {
        updated[index] = newImage
      }

      return updated
    })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(HandlerSave)}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-primary text-2xl font-medium">Tentang Fakultas</div>

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
                    isi_konten: facultyAbout?.isi_konten,
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
          <CardInput title="Tentang Fakultas">
            {isEditContent ? (
              <RichText form={form} name="isi_konten" label="" isRow={false} />
            ) : (
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: facultyAbout?.isi_konten ?? '' }}
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
                  setImage={(newImage) => updateImage(index, newImage)}
                />
              ))}
            </div>
          </CardInput>
        </div>
      </form>
    </Form>
  )
}

export default AboutFacultyView
