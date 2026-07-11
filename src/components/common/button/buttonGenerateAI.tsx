import { RiAiGenerateText } from 'react-icons/ri'
import { Button } from '@/components/ui/button.tsx'
import type { UseFormReturn } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface Props {
  form: UseFormReturn<any>
  urL: string
  judul: string
  tanggal: string
}

const ButtonGenerateNewsAI = (props: Props) => {
  const { form, urL, tanggal, judul } = props
  const [loading, setLoading] = useState(false)

  const HanleGenerateAI = async () => {
    setLoading(true)
    await AxiosClient.post(urL, {
      judul,
      tanggal,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message)
          form.setValue('isi_berita', res.data.data.isi_berita)
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message)
      })
  }

  return (
    <Button
      disabled={loading}
      className={'w-fit'}
      onClick={async (e) => {
        e.preventDefault()
        await HanleGenerateAI()
      }}
    >
      Generate AI <RiAiGenerateText />
    </Button>
  )
}
export default ButtonGenerateNewsAI
