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

export const SelectInstitutionUniversity = () => {
  const [parentId, setParentId] = useState({
    id_university: '',
  })

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { satuanOrganisasi: university, loading: load1 } = UseGetUniversityDomainExist({
    kelompok: 'UNIVERSITAS',
  })
  const { unitList: unit, loading: load2 } = UseGetUnitList({
    kelompok: 'LEMBAGA',
    id_parent: parentId?.id_university,
    context:'lpmi'
  })

  const loading = load1 || load2

  const form = useForm()

  const HandleSaveSession = async (value: any) => {
    await AxiosClient.post('/lembaga/user-session', {
      id_universitas: value?.id_university,
      id_lembaga: value?.id_lembaga,
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
    <>
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
                <p className="text-xl mt-5 font-semibold">Pilih Data Unit yang akan digunakan</p>

                <Form {...form}>
                  <form
                    className={'flex flex-col gap-4 mt-2'}
                    onSubmit={form.handleSubmit(HandleSaveSession)}
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
                        form.setValue('id_lembaga', '')
                      }}
                    />
                    <SelectBasicInput
                      form={form}
                      name={'id_lembaga'}
                      placeholder={'Pilih Lembaga'}
                      selectClassName={'z-40'}
                      isDisabled={loading}
                      data={
                        unit?.map((row) => ({
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
    </>
  )
}
