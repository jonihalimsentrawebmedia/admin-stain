import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import CardInput from '@/components/common/card/CardInput.tsx'
import { RichText } from '@/components/common/richtext'
import ImageAbout from '@/pages/modules/website-utama/program-studi/detail/tentang/components/ImageAbout.tsx'
import { useParams } from 'react-router-dom'
import type { IUkkUkm } from '@/pages/modules/website-utama/UKK-UKM/data/types.ts'
import { UseGetAboutUkkUkm } from '../hooks/index.tsx'
import { UsePostAboutUkkUkm } from '../hooks/postAbout.tsx'

interface props {
  detail?: IUkkUkm
}

export const FormAbout = (props: props) => {
  const { id } = useParams()
  const { detail } = props

  const [isEditContent, setIsEditContent] = useState(false)
  const [image, setImage] = useState([''])

  const { about } = UseGetAboutUkkUkm(id as string)
  const { form, loading, handleSave } = UsePostAboutUkkUkm()

  useEffect(() => {
    if (about) {
      let tempImage = []
      for (let i = 0; i < 3; i++) {
        if (about.gambar !== null && about.gambar[i]) {
          tempImage.push(about.gambar[i])
        } else {
          tempImage.push('')
        }
      }
      setImage(tempImage)
    }
  }, [about])

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
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const value = form.getValues()
          handleSave(value)
          setIsEditContent(false)
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-primary text-2xl font-medium">Tentang {detail?.nama_ukk_ukm}</div>

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
                    isi_konten: about?.isi_konten,
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
          <CardInput title={`Tentang ${detail?.nama_ukk_ukm}`}>
            {isEditContent ? (
              <RichText form={form} name="isi_konten" label="" isRow={false} />
            ) : (
              <div
                className={'tiptap ProseMirror simple-editor'}
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
              {image?.map((item, index) => (
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
