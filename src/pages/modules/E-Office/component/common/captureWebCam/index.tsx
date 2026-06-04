import Webcam from 'react-webcam'
import { useCallback, useRef } from 'react'
import { FaCamera } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { UseFormReturn } from 'react-hook-form'

const videoConstraints = {
  width: 250,
  height: 250,
  facingMode: 'user',
}

interface Props {
  form: UseFormReturn<any>
  name: string
}

export const CaptureWebCam = (props: Props) => {
  const { form, name } = props

  const webcamRef: any = useRef(null)
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot()
    const blob = await fetch(imageSrc).then((res) => res.blob())
    const formData = new FormData()
    formData.append('berkas', blob, `photo-${Date.now()}.png`)
    AxiosClient.post('/upload', formData).then((res) => {
      console.log(res)
      if (res?.data?.status) {
        toast.success(res.data.message)
        form.setValue(name, res.data.url)
      }
    })
  }, [webcamRef])

  return (
    <>
      <div className="flex items-center gap-2">
        <Webcam
          audio={false}
          height={250}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={250}
          videoConstraints={videoConstraints}
        />
        <Button
          className="text-white rounded-full px-3 py-1"
          onClick={(e) => {
            e.preventDefault()
            capture()
          }}
        >
          <FaCamera className="size-4" />
          Ambil Foto
        </Button>
      </div>
    </>
  )
}
