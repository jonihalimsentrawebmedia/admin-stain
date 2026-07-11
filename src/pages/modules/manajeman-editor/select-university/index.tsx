import BG from '@/assets/img/bg-modules.png'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SelectCustom } from '@/components/common/form/SelectCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const SelectUniversityEditor = () => {
  const form = useForm()
  
  const { satuanOrganisasi } = UseGetUniversityDomainExist({ kelompok: 'UNIVERSITAS' })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const HandlerSubmit = async (e: any) => {
    await AxiosClient.post('/editor/user-session', {
      id_universitas: e?.id_university,
    })
      .then((res) => {
        const url = searchParams.get('url')
        if (res.data.status) {
          navigate(`/modules/${url}/dashboard`)
          Cookies.set('id_satuan_organisasi', e?.id_university)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
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
          <p className="text-base sm:text-xl font-semibold text-gray-800"></p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandlerSubmit)} className="flex flex-col gap-4">
              <SelectCustom
                form={form}
                name={'id_university'}
                placeholder={'Pilih Universitas digunakan'}
                data={
                  satuanOrganisasi?.map((row: SatuanOrganisasiList) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
                level1
              />

              <Button className="w-full sm:w-fit sm:mx-auto">Lanjutkan</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
