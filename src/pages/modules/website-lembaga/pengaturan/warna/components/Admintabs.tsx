import { ColorPickerField, getContrastTextColor } from '@/components/common/form/ColorPickerField'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Save } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Admintabs = () => {
  const form = useForm()
  const [isShow,setIsShow]=useState(false)
  const[reset,setReset]=useState(false)
  const [data] = useState({
    primary: '#297D56',
  })
  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-4 p-4" onSubmit={form.handleSubmit(() => {})}>
          <div className="flex md:justify-between gap-4">
          
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={() => setReset(true)}>
                Kembalikan ke Default
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: data?.primary,
                  color: getContrastTextColor(data?.primary),
                }}
              >
                <Save />
                Simpan
              </Button>
            </div>
          </div>
          <>
            <ColorPickerField
              name="primary"
              title="Warna Primer/Primary"
              description="*Warna utama yang digunakan pada menu aktif, button."
              disabled={false}
            />

            <ColorPickerField
              name="secondary"
              title="Warna Sekunder/Secondary"
              description="*Warna sekunder yang digunakan sebagai warna header."
              disabled={true}
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
            <Button
              type="button"
              variant="outline"
           
              onClick={() => setIsShow(false)}
            >
              Batal
            </Button>

            <Button
              type="button"
              onClick={() => {
               
              }}
              style={{
                backgroundColor: data?.primary,
                color: getContrastTextColor(data?.primary),
              }}
              variant="default"
          
            >
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
            <Button
              type="button"
              variant="outline"
        
              onClick={() => setReset(false)}
            >
              Batal
            </Button>

            <Button
              type="button"
         
              style={{
                backgroundColor: data?.primary,
                color: getContrastTextColor(data?.primary),
              }}
              onClick={() => {
                // form.reset(DEFAULT_COLOR) // ✅ reset form
                // setReset(false) // ✅ tutup dialog reset
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

export default Admintabs
