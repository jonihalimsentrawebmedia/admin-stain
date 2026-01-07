import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Label } from '@/components/ui/label'
import type { StaffProfile } from '@/pages/modules/website-utama/program-studi/detail/model/staff.ts'

const StaffColumnsProfile = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const queryClient = useQueryClient()

  async function checkedHp(idStaff: string) {
    await AxiosClient.patch(`/prodi/profil/staff/${idStaff}/no-telepon`, {})
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['staff-profile'],
          })

          toast.success(res.data.message || 'Success Pengajuan tambah bidang kerjasama')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  async function checkedEmail(idStaff: string) {
    await AxiosClient.patch(`/prodi/profil/staff/${idStaff}/email`, {})
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['staff-profile'],
          })

          toast.success(res.data.message || 'Success Pengajuan tambah bidang kerjasama')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  const columns: ColumnDef<StaffProfile>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
      cell: ({ row }) => {
        return (
          <div>
            <Avatar>
              <AvatarImage src={row.original.gambar_url} alt={row.original.nama} />
              <AvatarFallback>
                <User className="text-gray-300" />
              </AvatarFallback>
            </Avatar>
            {row.original.nama}
          </div>
        )
      },
    },
    {
      accessorKey: 'nip',
      header: 'NIP',
    },
    {
      accessorKey: 'jabatan_struktural',
      header: 'Jabatan Struktural',
    },
    {
      accessorKey: 'unit_kerja',
      header: 'Unit Kerja',
    },
    {
      accessorKey: 'no_hp',
      header: 'No. HP',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div>
            <div>{values.no_hp}</div>
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={values.tampil_no_hp}
                onCheckedChange={() => {
                  checkedHp(values.nip)
                }}
              />
              <Label className={`${values.tampil_no_hp ? 'text-primary' : 'text-[#999]'}`}>
                {values.tampil_no_hp ? 'Tampil' : 'Tidak Tampil'}
              </Label>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div>
            <div>{values.no_hp}</div>
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={values.tampil_email}
                onCheckedChange={() => {
                  checkedEmail(values.nip)
                }}
              />
              <Label className={`${values.tampil_email ? 'text-primary' : 'text-[#999]'}`}>
                {values.tampil_email ? 'Tampil' : 'Tidak Tampil'}
              </Label>
            </div>
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default StaffColumnsProfile
