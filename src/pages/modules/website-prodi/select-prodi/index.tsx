import BG from '@/assets/img/bg-modules.png'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'
import { UseGetIdentityPublic } from '@/pages/login/hooks'
import { UseGetUnitList } from '@/pages/modules/website-unit/select-unit/hook'

export const SelectProdi = () => {
  const [searchParams] = useSearchParams()
  const { publicIdentity } = UseGetIdentityPublic()
  const id_module = searchParams.get('id')

  const form = useForm()

  const [parentId, setParentId] = useState({
    id_university: '',
    id_faculty: '',
  })
  const { satuanOrganisasi: university, loading: load1 } = UseGetUniversityDomainExist({
    kelompok: 'UNIVERSITAS',
  })
  const { satuanOrganisasi: faculty, loading: load2 } = UseGetUniversityDomainExist({
    kelompok: 'FAKULTAS',
    id_parent: parentId?.id_university,
  })
  const { unitList: prodi, loading: load3 } = UseGetUnitList({
    kelompok: 'PRODI',
    id_parent: parentId?.id_faculty,
    id_module: id_module ?? '',
  })

  const loading = load1 || load2 || load3

  const navigate = useNavigate()

  const HandlerSubmit = async (e: any) => {
    await AxiosClient.post('/prodi/user-session', {
      id_universitas: e?.id_university,
      id_fakultas: e?.id_faculty,
      id_prodi: e?.id_prodi,
    })
      .then((res) => {
        const url = searchParams.get('url')
        if (res.data.status) {
          navigate(`/modules/${url}/dashboard`)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <div className={'w-screen h-screen relative flex items-center justify-center'}>
      <img
        src={publicIdentity?.background ?? BG}
        className={'w-screen h-screen absolute object-cover z-10'}
      />
      <div className="flex items-center justify-between relative z-20">
        <Card className={'bg-white/30'}>
          <CardContent>
            <div className="w-xl bg-white p-5 rounded">
              <Link to={'/modules'} className={'flex items-center gap-2 text-primary text-sm'}>
                <ArrowLeft className={'text-primary'} />
                Kembali
              </Link>
              <p className="text-xl mt-5 font-semibold">Pilih Data Prodi yang akan digunakan</p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(HandlerSubmit)}
                  className={'flex flex-col gap-4 mt-5'}
                >
                  <SelectBasicInput
                    form={form}
                    name={'id_university'}
                    isDisabled={loading}
                    placeholder={'Pilih Universitas digunakan'}
                    selectClassName={'z-50'}
                    data={
                      university?.map((row) => ({
                        label: row?.nama,
                        value: row?.id_satuan_organisasi,
                      })) ?? []
                    }
                    fx={() => {
                      if (form.watch('id_university')) {
                        setParentId({
                          ...parentId,
                          id_university: form.watch('id_university'),
                        })
                      }
                      form.setValue('id_faculty', '')
                      form.setValue('id_prodi', '')
                    }}
                  />

                  <SelectBasicInput
                    form={form}
                    name={'id_faculty'}
                    placeholder={'Pilih Fakultas'}
                    selectClassName={'z-40'}
                    isDisabled={loading}
                    data={
                      faculty?.map((row) => ({
                        label: row?.nama,
                        value: row?.id_satuan_organisasi,
                      })) ?? []
                    }
                    fx={() => {
                      if (form.watch('id_faculty')) {
                        setParentId({
                          ...parentId,
                          id_faculty: form.watch('id_faculty'),
                        })
                      }
                      form.setValue('id_prodi', '')
                    }}
                  />

                  <SelectBasicInput
                    form={form}
                    name={'id_prodi'}
                    selectClassName={'z-30'}
                    isDisabled={loading}
                    placeholder={'Pilih Program Studi'}
                    data={
                      prodi?.map((row) => ({
                        label: row?.nama,
                        value: row?.id_satuan_organisasi,
                      })) ?? []
                    }
                  />

                  <div className="flex justify-center">
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
