import CardInput from '@/components/common/card/CardInput'
import { Button } from '@/components/ui/button'

import { useEffect, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import useGetAbout from '../controller/useGetAbout'
import usePostAbout from '../controller/post/usePostAbout'
import ButtonForm from '@/components/common/button/ButtonForm'
import ImageAbout from './components/ImageAbout'
import { Form } from '@/components/ui/form'
import { RichText } from '@/components/common/richtext'

const AboutProgramStudiView = () => {
  const { aboutDetail } = useGetAbout()
  const { form, handleSave, loading } = usePostAbout()
  const [isEditContent, setIsEditContent] = useState(false)
  const [image, setImage] = useState([''])

  useEffect(() => {
    if (aboutDetail) {
      let tempImage = []
      for (let i = 0; i < 3; i++) {
        if (aboutDetail.gambar !== null && aboutDetail.gambar[i]) {
          tempImage.push(aboutDetail.gambar[i])
        } else {
          tempImage.push('')
        }
      }
      setImage(tempImage)
    }
  }, [aboutDetail])

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
            <div className="text-primary text-2xl font-medium">Tentang Prodi</div>

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
          <CardInput title="Tentang Prodi">
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

export default AboutProgramStudiView
