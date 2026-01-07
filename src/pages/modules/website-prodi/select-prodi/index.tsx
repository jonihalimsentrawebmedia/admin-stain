import BG from '@/assets/img/bg-modules.png'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetGroupOrganizationFlexible } from '@/pages/modules/website-prodi/select-prodi/hooks'
import { useState } from 'react'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'

export const SelectProdi = () => {
  const [searchParams] = useSearchParams()

  const form = useForm()

  const [parentId, setParentId] = useState({
    id_university: '',
    id_faculty: '',
  })

  const { dataSatuan: university } = UseGetGroupOrganizationFlexible({ kelompok: 'UNIVERSITAS' })
  const { dataSatuan: faculty } = UseGetGroupOrganizationFlexible({
    kelompok: 'FAKULTAS',
    id_parent: parentId?.id_university,
  })
  const { dataSatuan: prodi } = UseGetGroupOrganizationFlexible({
    kelompok: 'PRODI',
    id_parent: parentId?.id_faculty,
  })

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
      <img src={BG} className={'w-screen h-screen absolute object-cover z-10'} />
      <div className="flex items-center justify-between relative z-20">
        <Card className={'bg-white/30'}>
          <CardContent>
            <div className="w-xl bg-white p-5 rounded">
              <Link to={'/modules'} className={'flex items-center gap-2 text-primary text-sm'}>
                <ArrowLeft className={'text-primary'} />
                Kembali
              </Link>
              <p className="text-xl mt-5 font-semibold"></p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(HandlerSubmit)} className={'flex flex-col gap-4'}>
                  <SelectBasicInput
                    form={form}
                    name={'id_university'}
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
