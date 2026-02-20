import { ColorPickerField } from '@/components/common/form/ColorPickerField'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetColorAdmin } from '@/pages/modules/website-lembaga/pengaturan/warna/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

const WebsiteTabs = () => {
  const form = useForm()
  const [isShow, setIsShow] = useState(false)
  const [reset, setReset] = useState(false)
  const [loading, setLoading] = useState(false)

  const { color } = UseGetColorAdmin('public')

  useEffect(() => {
    if (color) {
      form.reset({
        primary: color?.warna_primer,
        secondary: color?.warna_sekunder,
      })
    }
  }, [color])

  const queryClient = useQueryClient()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/unit-ppid/pengaturan-warna/public', {
      warna_primary: e?.primary,
      warna_secondary: e?.secondary,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengubah warna admin')
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['color-admin-unit-ppid'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-4 p-4" onSubmit={form.handleSubmit(HandleSave)}>
          <div className="flex md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={() => setReset(true)}>
                Kembalikan ke Default
              </Button>
              <Button type="submit" disabled={loading}>
                <Save />
                Simpan
              </Button>
            </div>
          </div>
          <>
            <ColorPickerField
              name="primary"
              title="Warna Primer/Primary"
              description="*Warna utama yang digunakan sebagai warna utama website (bagian atas website (Header), latar belakang judul besar, atau menu utama.)"
            />

            <ColorPickerField
              name="secondary"
              title="Warna Sekunder/Secondary"
              description="*Warna sekunder yang digunakan sebagai warna pembeda"
            />
          </>
        </form>
      </Form>

      <Dialog open={isShow} onOpenChange={setIsShow}>
        <DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Ubah Warna Admin</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin menyimpan perubahan Warna Admin ini?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setIsShow(false)}>
              Batal
            </Button>

            <Button type="button" onClick={() => {}} variant="default">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={reset} onOpenChange={setReset}>
        <DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Reset Warna Admin</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin mereset warna admin ke warna default? Tindakan ini akan
              menimpa pengaturan warna saat ini.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setReset(false)}>
              Batal
            </Button>

            <Button
              type="button"
              onClick={() => {
                form.reset({
                  primary: color?.warna_primer,
                  secondary: color?.warna_sekunder,
                }) // ✅ reset form
                setReset(false) // ✅ tutup dialog reset
                // onSubmit() // ✅ simpan ke backend
              }}
            >
              Reset & Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default WebsiteTabs
