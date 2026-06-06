import { useCallback, useRef, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { UseFormReturn } from 'react-hook-form'
import { RiImageAddFill } from 'react-icons/ri'
import { IoCameraOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FaCamera, FaTrash } from 'react-icons/fa'
import Webcam from 'react-webcam'
import { BiX } from 'react-icons/bi'
import { MdOutlineFileUpload } from 'react-icons/md'

const videoConstraints = {
  width: 350,
  height: 350,
  facingMode: 'user',
}

interface Props {
  form: UseFormReturn<any>
  name: string
}

export const CaptureWebCam = (props: Props) => {
  const { form, name } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const webcamRef: any = useRef(null)
  const uploadRef: any = useRef(null)

  const capture = useCallback(async () => {
    setLoading(true)
    const imageSrc = webcamRef.current.getScreenshot()
    const blob = await fetch(imageSrc).then((res) => res.blob())
    const formData = new FormData()
    formData.append('berkas', blob, `photo-${Date.now()}.png`)
    AxiosClient.post('/upload', formData)
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message)
          form.setValue(name, res.data.url)
          setLoading(false)
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Error')
        setLoading(false)
      })
  }, [webcamRef])

  const HandleUpload = async (e: null | FileList) => {
    const file = e?.[0]

    if (file) {
      const formData = new FormData()
      formData.append('berkas', file)

      await AxiosClient.post('/upload', formData)
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message || 'Success Upload Pas Foto')
            form.setValue(name, res.data.url)

            if (uploadRef.current) uploadRef.current.value = ''
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')

          if (uploadRef.current) uploadRef.current.value = ''
        })
    }
  }

  return (
    <>
      <div>
        <p className="text-gray-500">Photo Tamu</p>
        <div className="flex items-center gap-5">
          {form?.watch(name) ? (
            <div
              className={'relative w-[250px] h-[250px] size-[250px] overflow-hidden rounded group'}
            >
              <button
                className={
                  'bg-red-500 text-white hover:bg-red-600 rounded p-1.5 absolute top-3 right-3 hidden group-hover:block'
                }
                onClick={() => {
                  form.setValue(name, '' as any)
                }}
              >
                <FaTrash />
              </button>
              <img
                src={form.watch(name)}
                className={'w-[250px] h-[250px] size-[250px] object-cover rounded border-2'}
              />
            </div>
          ) : (
            <div
              className={
                'w-[250px] h-[250px] size-[250px] rounded border-2 border-dashed flex items-center justify-center'
              }
            >
              <RiImageAddFill className={'size-10 text-primary'} />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Button
              className={'text-white hover:text-white'}
              onClick={(e) => {
                e.preventDefault()
                setOpen(!open)
              }}
              disabled={loading}
            >
              <IoCameraOutline className={'size-4'} />
              Ambil Foto
            </Button>
            <Button
              variant={'outline'}
              className={'border-primary text-primary'}
              onClick={(e) => {
                e.preventDefault()
                uploadRef?.current?.click()
              }}
            >
              <MdOutlineFileUpload className={'size-4 text-primary'} /> Upload File
            </Button>
            <input
              type="file"
              hidden
              ref={uploadRef}
              onChange={(e) => HandleUpload(e.target.files)}
            />
          </div>
        </div>
      </div>

      <DialogBasic
        title={'Ambil Foto'}
        open={open}
        setOpen={setOpen}
        className={'rounded min-w-2xl'}
      >
        <div className="flex flex-col gap-2">
          <Webcam
            audio={false}
            height={350}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              variant={'outline'}
              className={'border border-primary text-primary rounded-full'}
              onClick={() => setOpen(!open)}
            >
              <BiX /> Batal
            </Button>
            <Button
              className="text-white rounded-full w-fit px-3 py-1"
              onClick={(e) => {
                e.preventDefault()
                capture()
              }}
            >
              <FaCamera className="size-4" />
              Ambil Foto
            </Button>
          </div>
        </div>
      </DialogBasic>
    </>
  )
}
