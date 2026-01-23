import { Switch } from '@/components/ui/switch.tsx'
import { useEffect, useState } from 'react'
import type { IUnitBackground } from '../data/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { TAB_LIST } from '@/pages/modules/website-unit/settings/background/data/constanta.tsx'

interface IProps {
  data: IUnitBackground
}

export const ToggleStatus = (props: IProps) => {
  const { data } = props

  const [status, setStatus] = useState(false)
  const [searchParams] = useSearchParams()
  const context = searchParams.get('context') ?? TAB_LIST?.[0]?.value

  useEffect(() => {
    if (data) {
      setStatus(data?.status)
    }
  }, [data])

  const queryClient = useQueryClient()

  const handleCheckedChange = async () => {
    await AxiosClient.patch(`/unit/unit-background/${context}/${data.id_unit_background}/toggle-status`)
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({ queryKey: ['unit-background'] })
          toast.success(res.data.message)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Switch checked={status} onCheckedChange={handleCheckedChange} />
    </>
  )
}
