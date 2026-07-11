import BG from '@/assets/img/bg-modules.png'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'
import { UseGetUnitList } from '@/pages/modules/website-unit/select-unit/hook'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const SelectSessionFaculty = () => {
  const [parentId, setParentId] = useState({
    id_university: '',
  })

  const [searchParams] = useSearchParams()
  const id_module = searchParams.get('id')
  const navigate = useNavigate()

  const { satuanOrganisasi: university, loading: load1 } = UseGetUniversityDomainExist({
    kelompok: 'UNIVERSITAS',
  })
  const { unitList: unit, loading: load2 } = UseGetUnitList({
    kelompok: 'FAKULTAS',
    id_parent: parentId?.id_university,
    id_module: id_module ?? '',
  })

  const loading = load1 || load2

  const form = useForm()

  const HandleSaveSession = async (value: any) => {
    await AxiosClient.post('/fakultas/user-session', {
      id_universitas: value?.id_university,
      id_fakultas: value?.id_fakultas,
    })
      .then((res) => {
        const url = searchParams.get('url')
        if (res.data.status) {
          toast.success('Berhasil membuat session')
          navigate(`/modules/${url}/dashboard`)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal membuat session')
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
            Pilih Data Fakultas yang akan digunakan
          </p>

          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(HandleSaveSession)}
            >
              <SelectBasicInput
                form={form}
                name={'id_university'}
                isDisabled={loading}
                placeholder={'Pilih Universitas digunakan'}
                selectClassName={'z-50'}
                data={
                  university?.map((row: SatuanOrganisasiList) => ({
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
                  form.setValue('id_fakultas', '')
                }}
              />
              <SelectBasicInput
                form={form}
                name={'id_fakultas'}
                placeholder={'Pilih Fakultas'}
                selectClassName={'z-40'}
                isDisabled={loading}
                data={
                  unit?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
              />
              <Button className="w-full sm:w-fit sm:mx-auto">Lanjutkan</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
