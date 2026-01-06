import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { IconDelete } from '@/components/common/table/icon'
import { Button } from '@/components/ui/button'
import { Trash2Icon, X } from 'lucide-react'
import { useState } from 'react'
import type { SatuanOrganisasiList } from '../../model'
import useDeleteSatuanOrganisasi from '../../controller/useDeleteSatuanOrganisasi'
interface Props {
  data: SatuanOrganisasiList
}
const ButtonDelete = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const { handleDelete, loading } = useDeleteSatuanOrganisasi({
    id: data.id_satuan_organisasi,
    kelompok: 'FAKULTAS',
  })
  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
        }}
      >
        <IconDelete />
      </button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Data Prodi?</p>}
      >
        <p>
          Anda akan menghapus fakultas “{data.nama}”. Apakah Anda yakin untuk menghapus fakultas
          yang dipilih?
        </p>

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button
            disabled={loading}
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            <Trash2Icon />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonDelete
