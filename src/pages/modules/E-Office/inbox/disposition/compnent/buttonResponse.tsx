import { Button } from '@/components/ui/button.tsx'
import { Check } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

const ButtonResponseStatusDisposition = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandlerResponse = async () => {
    setLoading(true)
    await AxiosClient.patch(`/eoffice/surat-masuk/disposisi/${id}/status-direspon`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['inbox'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }
  return (
    <>
      <Button
        className={'text-white bg-primary rounded-full'}
        onClick={HandlerResponse}
        disabled={loading}
      >
        <Check />
        Response Disposisi
      </Button>
    </>
  )
}
export default ButtonResponseStatusDisposition
