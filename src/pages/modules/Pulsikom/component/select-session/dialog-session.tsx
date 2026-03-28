import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'
import { UseGetUnitList } from '@/pages/modules/website-unit/select-unit/hook'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { FaGear } from 'react-icons/fa6'
import { UseGetSessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Form } from '@/components/ui/form.tsx'

export const DialogSessionFaculty = () => {
  const [open, setOpen] = useState(false)

  const [parentId, setParentId] = useState({
    id_university: '',
  })

  const [searchParams] = useSearchParams()
  const id_module = searchParams.get('id')

  const { satuanOrganisasi: university, loading: load1 } = UseGetUniversityDomainExist({
    kelompok: 'UNIVERSITAS',
  })
  const { unitList: unit, loading: load2 } = UseGetUnitList({
    kelompok: 'FAKULTAS',
    id_parent: parentId?.id_university,
    id_module: id_module ?? '',
  })
  const { session } = UseGetSessionFaculty()

  useEffect(() => {
    if (session) {
      form.reset({
        id_university: session?.id_universitas,
        id_fakultas: session?.id_fakultas,
      })
    }
  }, [session])

  const loading = load1 || load2
  const form = useForm()

  const HandleSaveSession = async (value: any) => {
    await AxiosClient.post('/fakultas/user-session', {
      id_universitas: value?.id_university,
      id_fakultas: value?.id_fakultas,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success('Berhasil membuat session')
          window.location.reload()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal membuat session')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border-primary text-primary hover:text-primary'}
        disabled={loading}
      >
        <FaGear />
        {session?.singkatan_universitas} / {session?.singkatan_fakultas}
      </Button>

      <DialogBasic title={'Ganti Session Fakultas'} open={open} setOpen={setOpen}>
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
            <div className="flex justify-center">
              <Button>Simpan</Button>
            </div>
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
