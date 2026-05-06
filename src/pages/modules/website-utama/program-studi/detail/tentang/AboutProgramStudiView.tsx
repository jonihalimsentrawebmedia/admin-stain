import CardInput from '@/components/common/card/CardInput'
import { Button } from '@/components/ui/button'

import { type FormEvent, useEffect, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import useGetAbout from '../controller/useGetAbout'
import usePostAbout from '../controller/post/usePostAbout'
import ButtonForm from '@/components/common/button/ButtonForm'
import ImageAbout from './components/ImageAbout'
import { Form } from '@/components/ui/form'
import { RichText } from '@/components/common/richtext'
import ButtonGoToGuide from '../../../panduan/components/ButtonGoToGuide'

interface props {
 title?: string;
}

const AboutProgramStudiView = (props:props) => {
  const { title='Program Studi' } = props;
  const { aboutDetail } = useGetAbout()
  const { form, handleSave, loading } = usePostAbout()
  const [isEditContent, setIsEditContent] = useState(false)
  const [image, setImage] = useState<{ is_thumbnail: boolean; url: string }[]>([])

  useEffect(() => {
    if (aboutDetail) {
      const tempImage = Array.from({ length: 3 }, (_, i) => {
        return aboutDetail.gambar?.[i] || { is_thumbnail: false, url: '' }
      })
      setImage(tempImage)

      form.reset({
        isi_konten: aboutDetail.isi_konten || '',
        gambar: tempImage,
      })
    }
  }, [aboutDetail])

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const values = form.getValues()
    await handleSave(values)
    setIsEditContent(false)
  }

  console.log(aboutDetail)

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-primary text-2xl font-medium">Tentang {title}</div>
            <div className="flex gap-4 items-center">
              <ButtonGoToGuide
                titleGuide="Tentang"
                valueGuide="WEBSITE_UTAMA_SATUAN_ORGANISASI_TENTANG"
              />
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
                      isi_konten: aboutDetail?.isi_konten,
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
          </div>
          <CardInput title={`Tentang ${title}`}>
            {isEditContent ? (
              <RichText form={form} name="isi_konten" label="" isRow={false} />
            ) : (
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: aboutDetail?.isi_konten ?? '' }}
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

export default AboutProgramStudiView
