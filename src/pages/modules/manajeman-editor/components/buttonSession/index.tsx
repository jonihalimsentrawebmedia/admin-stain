import { useEffect, useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { SelectCustom } from '@/components/common/form/SelectCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import useGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetSessionEditor } from '../../session/index'

export const ButtonSessionEditor = () => {
  const [open, setOpen] = useState(false)

  const form = useForm()

  const { satuanOrganisasi } = useGetSatuanOrganisasi({ kelompok: 'UNIVERSITAS' })
  const { session } = UseGetSessionEditor()

  useEffect(() => {
    if (session) form.setValue('id_university', session?.id_universitas)
  }, [session])

  const HandlerSubmit = async (e: any) => {
    await AxiosClient.post('/editor/user-session', {
      id_universitas: e?.id_university,
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
        {session?.singkatan_universitas}
        <FaGear />
      </Button>

      <DialogCustom
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Ganti Data: Universitas'}
      >
        <div>
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
      </DialogCustom>
    </>
  )
}
