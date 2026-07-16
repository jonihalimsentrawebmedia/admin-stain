import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { ColorPickerField } from '@/components/common/form/ColorPickerField'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetColorSIMRS } from './hooks/index.tsx'
import { IoInformationCircle } from 'react-icons/io5'

const ColorSettingSIMRS = () => {
  const [loading, setLoading] = useState(false)
  const { color } = UseGetColorSIMRS()

  const form = useForm()

  useEffect(() => {
    if (color) {
      form.reset({ warna_primary: color?.warna_primary })
    }
  }, [color])

  const queryClient = useQueryClient()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put('/simrs/pengaturan/warna', {
      warna_primary: e?.warna_primary,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengubah warna')
          setLoading(false)
          queryClient.invalidateQueries({ queryKey: ['color-simrs'] })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl sm:text-2xl text-[#444] font-medium">Pengaturan Warna</p>

      <div className="flex gap-2 items-center w-fit px-2 py-1 text-[#2769CD] border border-[#2769CD] rounded text-sm">
        <IoInformationCircle className="size-4 shrink-0" />
        <span>Silahkan pilih warna yang ingin anda gunakan</span>
      </div>

      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(HandleSave)}>
          <ColorPickerField
            name="warna_primary"
            title="Warna Primer/Primary"
            description="*Warna utama yang digunakan pada menu aktif, button, dan elemen utama lainnya."
          />

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={loading} className={'text-white'}>
              <Save /> Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ColorSettingSIMRS
