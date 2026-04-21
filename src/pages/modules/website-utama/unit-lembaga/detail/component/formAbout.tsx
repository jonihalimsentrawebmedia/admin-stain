import { type FormEvent, useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import CardInput from '@/components/common/card/CardInput.tsx'
import { RichText } from '@/components/common/richtext'
import { UseGetAboutUnitInstitution } from '../hooks/index.tsx'
import { UsePostAbout } from '../hooks/postAbout.tsx'
import type { IUnitInstitution } from '@/pages/modules/website-utama/unit-lembaga/data/types.ts'
import { useParams } from 'react-router-dom'
import ImageAbout from '@/pages/modules/website-utama/program-studi/detail/tentang/components/ImageAbout.tsx'
import ButtonGoToGuide from '../../../panduan/components/ButtonGoToGuide.tsx'

interface Props {
  detail?: IUnitInstitution
}

export const FormAbout = (props: Props) => {
  const { id } = useParams()
  const { detail } = props

  const [isEditContent, setIsEditContent] = useState(false)
  const [image, setImage] = useState<{ is_thumbnail: boolean; url: string }[]>([])

  const { about } = UseGetAboutUnitInstitution(id as string)
  const { form, loading, handleSave } = UsePostAbout()

  useEffect(() => {
    if (about) {
      const tempImage = Array.from({ length: 3 }, (_, i) => {
        return about.gambar?.[i] || { is_thumbnail: false, url: '' }
      })
      setImage(tempImage)

      form.reset({
        isi_konten: about.isi_konten || '',
        gambar: tempImage,
      })
    }
  }, [about])

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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-primary text-2xl font-medium">Tentang {detail?.nama}</div>

          <div className='flex gap-4 items-center'>
            <ButtonGoToGuide valueGuide="WEBSITE_UTAMA_SATUAN_ORGANISASI_TENTANG" />
              {isEditContent ? (
              <ButtonForm loading={loading} onCancel={() => setIsEditContent(false)} />
            ) : (
              <Button
                onClick={() => {
                  setIsEditContent(true)
                }}
                variant={'outline'}
                className="bg-white text-primary border-primary hover:text-primary"
              >
                <HiPencil />
                Edit
              </Button>
            )}
          </div>
          </div>

          <CardInput title={`Tentang ${detail?.nama}`}>
            {isEditContent ? (
              <RichText form={form} name="isi_konten" label="" isRow={false} />
            ) : (
              <div
                className="tiptap ProseMirror simple-editor"
                dangerouslySetInnerHTML={{ __html: about?.isi_konten ?? '' }}
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
