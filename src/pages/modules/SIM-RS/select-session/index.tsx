import BG from '@/assets/img/bg-modules.png'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'
import { useQueryClient } from '@tanstack/react-query'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import { useState } from 'react'

export const SelectSessionSIMRS = () => {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { satuanOrganisasi: university, loading: load1 } = UseGetUniversityDomainExist({
    kelompok: 'UNIVERSITAS',
  })

  const loadings = load1

  const form = useForm<{
    id_satuan_organisasi: string
  }>()

  const queryClient = useQueryClient()
  const HandleSaveSession = async (value: { id_satuan_organisasi: string }) => {
    setLoading(true)
    await AxiosClient.post('/simrs/user-session', {
      id_satuan_organisasi: value?.id_satuan_organisasi,
    })
      .then((res) => {
        const url = searchParams.get('url')
        if (res.data.status) {
          toast.success('Berhasil membuat session')
          navigate(`/modules/${url}/dashboard`)
          queryClient.invalidateQueries({
            queryKey: ['session-simrs'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal membuat session')
        setLoading(false)
      })
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center overflow-y-auto flex items-center justify-center p-3 sm:p-5"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <Card className="w-full max-w-lg backdrop-blur-md bg-white/80 shadow-xl border-0 rounded-2xl">
        <CardContent className="p-5 sm:p-6 flex flex-col gap-5">
          <Link to={'/modules'} className="flex items-center gap-2 text-primary text-sm w-fit">
            <ArrowLeft className="size-4" />
            Kembali
          </Link>
          <p className="text-base sm:text-xl font-semibold text-gray-800">
            Pilih Data Universitas yang akan digunakan
          </p>

          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(HandleSaveSession)}
            >
              <SelectBasicInput
                form={form}
                name={'id_satuan_organisasi'}
                isDisabled={loadings}
                placeholder={'Pilih Universitas digunakan'}
                selectClassName={'z-50'}
                data={
                  university?.map((row: SatuanOrganisasiList) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
              />
              <Button disabled={loading} className="w-full sm:w-fit sm:mx-auto">Lanjutkan</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
