import { useEffect, useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import type { IModulesList } from '@/pages/modules/interface'
import useGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
import { InputCheckbox } from '@/components/common/form/InputCheckbox.tsx'
import { FaGear } from 'react-icons/fa6'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetListSettings } from '@/pages/modules/settings/module/conntroller/listSettings.tsx'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data: IModulesList
  kelompok: 'PRODI' | 'UNIT' | 'LEMBAGA'
}

export const ButtonSettings = (props: Props) => {
  const [loading, setLoading] = useState(false)

  const { data, kelompok } = props

  const { listSettings } = UseGetListSettings({
    limit: '0',
    page: '0',
    id_module: data?.id_module,
  })

  console.log(listSettings)

  const [open, setOpen] = useState(false)
  const form = useForm()
  const { satuanOrganisasi } = useGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: kelompok,
  })

  useEffect(() => {
    if (listSettings) {
      const temp = listSettings?.map((item: any) => item.id_satuan_organisasi)

      form.setValue('id', temp)
    }
  }, [listSettings])

  const queryClient = useQueryClient()

  const HandleSave = async (e: any) => {
    console.log(e?.id)
    setLoading(true)
    await AxiosClient.post(`/pengaturan/modules-unit/${data?.id_module}`, e?.id)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success save settings')
          queryClient.invalidateQueries({
            queryKey: ['list-settings'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'bg-blue-500 p-1.5 rounded hover:bg-blue-600 text-white'}
        onClick={() => setOpen(!open)}
      >
        <FaGear />
      </button>

      <DialogCustom open={open} setOpen={setOpen} title={'Settings'} className={'rounded max-w-5xl'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className="grid grid-cols-2 gap-5">
            {satuanOrganisasi.map((item, k) => (
              <InputCheckbox
                form={form}
                key={k}
                name={'id'}
                data={[{ value: item.id_satuan_organisasi, label: item.nama }]}
              />
            ))}

            <div className="col-span-2 flex justify-end gap-2 mt-5">
              <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
            </div>
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}
