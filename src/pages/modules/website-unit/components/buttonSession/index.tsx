import { useEffect, useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import { Button } from '@/components/ui/button.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'
import { UseGetUnitList } from '../../select-unit/hook'

export const ButtonSessionUnit = ({ session }: { session?: ISessionUnit }) => {
  const [open, setOpen] = useState(false)
  const [parentId, setParentId] = useState({
    id_university: '',
    id_module: '',
  })

  const { satuanOrganisasi: university, loading: load1 } = UseGetUniversityDomainExist({
    kelompok: 'UNIVERSITAS',
  })
  // const { satuanOrganisasi: unit, loading: load2 } = UseGetUniversityDomainExist({
  //   kelompok: 'UNIT',
  //   id_parent: parentId?.id_university,
  //   id_modu
  // })
  const { unitList: unit, loading: load2 } = UseGetUnitList({
    kelompok: 'UNIT',
    id_parent: parentId?.id_university,
    id_module: parentId.id_module,
  })

  const loading = load1 || load2

  const form = useForm()

  useEffect(() => {
    if (session) {
      form.setValue('id_university', session?.id_universitas)
      form.setValue('id_unit', session?.id_unit)
      const module = JSON.parse(localStorage.getItem('module') ?? '')
      setParentId({
        id_university: session?.id_universitas,
        id_module: module.id_module,
      })
    }
  }, [session])

  const HandlerSubmit = async (e: any) => {
    await AxiosClient.post('/unit/user-session', {
      id_universitas: e?.id_university,
      id_unit: e?.id_unit,
    })
      .then((res) => {
        toast.success(res.data.message)
        window.location.reload()
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'text-primary border-primary hover:text-primary'}
      >
        {session?.singkatan_universitas}/ {session?.nama_unit}
        <FaGear />
      </Button>

      <DialogBasic
        className={'lg:max-w-2xl rounded'}
        open={open}
        disableOutsideDialog
        setOpen={setOpen}
        title={'Ganti Data: Universitas'}
      >
        <div>
          <Form {...form}>
            <form
              className={'flex flex-col gap-4 mt-2'}
              onSubmit={form.handleSubmit(HandlerSubmit)}
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
                  form.setValue('id_unit', '')
                }}
              />
              <SelectBasicInput
                form={form}
                name={'id_unit'}
                placeholder={'Pilih Unit'}
                isDisabled={loading}
                selectClassName={'z-40'}
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
      </DialogBasic>
    </>
  )
}
