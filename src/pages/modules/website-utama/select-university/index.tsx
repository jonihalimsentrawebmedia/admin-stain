import BG from '@/assets/img/bg-modules.png'
import {Card, CardContent} from '@/components/ui/card.tsx'
import {ArrowLeft} from 'lucide-react'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import {SelectCustom} from '@/components/common/form/SelectCustom.tsx'
import {Form} from '@/components/ui/form.tsx'
import {useForm} from 'react-hook-form'
import {Button} from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'
import {UseGetUniversityDomainExist} from '@/pages/modules/website-utama/select-university/hooks'
import {UseGetIdentityPublic} from "@/pages/login/hooks";

export const SelectUniversity = () => {
  const form = useForm()
  const {satuanOrganisasi} = UseGetUniversityDomainExist({kelompok: 'UNIVERSITAS'})
  const {publicIdentity} = UseGetIdentityPublic()

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const HandlerSubmit = async (e: any) => {
    await AxiosClient.post('/website-utama/user-session', {
      id_satuan_organisasi: e?.id_university,
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
    <div className={'w-screen h-screen relative flex items-center justify-center'}>
      <img src={publicIdentity?.background ?? BG} className={'w-screen h-screen absolute object-cover z-10'}/>
      <div className="flex items-center justify-between relative z-20">
        <Card className={'bg-white/30'}>
          <CardContent>
            <div className="w-xl bg-white p-5 rounded">
              <Link to={'/modules'} className={'flex items-center gap-2 text-primary text-sm'}>
                <ArrowLeft className={'text-primary'}/>
                Kembali
              </Link>
              <p className="text-xl mt-5 font-semibold"></p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(HandlerSubmit)}>
                  <SelectCustom
                    form={form}
                    name={'id_university'}
                    placeholder={'Pilih Universitas digunakan'}
                    data={
                      satuanOrganisasi?.map((row) => ({
                        label: row?.nama,
                        value: row?.id_satuan_organisasi,
                      })) ?? []
                    }
                    level1
                  />

                  <div className="mt-5 flex justify-center">
                    <Button>Lanjutkan</Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
