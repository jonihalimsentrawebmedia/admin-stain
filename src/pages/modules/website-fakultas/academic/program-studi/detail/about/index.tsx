import CardInput from '@/components/common/card/CardInput.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useEffect, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import { RichText } from '@/components/common/richtext'
import ImageAbout from '@/pages/modules/website-utama/program-studi/detail/tentang/components/ImageAbout.tsx'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetProdiAbout } from '@/pages/modules/website-fakultas/academic/program-studi/detail/hooks'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const AboutProdiView = () => {
  const { id } = useParams()
  const { about } = UseGetProdiAbout((id as string) ?? '')

  const [loading, setLoading] = useState(false)
  const [isEditContent, setIsEditContent] = useState(false)
  const [image, setImage] = useState([''])

  const form = useForm()

  const queryClient = useQueryClient()
  const HandlerSave = async (data: any) => {
    setLoading(true)
    await AxiosClient.post(`/fakultas/satuan-organisasi/${id}/tentang`, data)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setIsEditContent(false)
          toast.success(res.data.message || 'Success menyimpan data')
          queryClient.invalidateQueries({
            queryKey: ['prodi-about'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

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

  console.log(about)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(HandlerSave)}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-primary text-2xl font-medium">Tentang Program Studi</div>

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
          <CardInput title="Tentang Program Studi">
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

export default AboutProdiView
