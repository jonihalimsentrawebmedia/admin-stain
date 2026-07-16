import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UseGetRoom } from '@/pages/modules/SIM-RS/reference/room/hooks/index.tsx'
import { UseGetRoomType } from '@/pages/modules/SIM-RS/reference/room-type/hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import type { IRegistration } from '@/pages/modules/SIM-RS/services/register/data/types.ts'
import { ArrowRight } from 'lucide-react'

const ResolverRoom = z.object({
  id_ruangan: z.string().min(1, 'Ruangan harus dipilih'),
  id_jenis_ruangan: z.string().min(1, 'Jenis Ruangan harus dipilih'),
  catatan: z.string().optional().nullable(),
  tanggal_masuk: z.string().min(1, 'Tanggal Masuk harus diisi'),
})

type TResolverRoom = z.infer<typeof ResolverRoom>

interface Props {
  data: IRegistration
}

export const ButtonRoom = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<TResolverRoom>({
    resolver: zodResolver(ResolverRoom),
    defaultValues: {
      id_ruangan: '',
      id_jenis_ruangan: '',
      catatan: '',
      tanggal_masuk: '',
    },
  })

  const { roomType } = UseGetRoomType({ limit: '0', page: '0' })
  const { room } = UseGetRoom({
    limit: '0',
    page: '0',
    id_jenis_ruangan: form.watch('id_jenis_ruangan'),
  })

  const roomData =
    room?.map((r) => ({
      label: `${r.nama} - ${r.nomor}`,
      value: r.id_ruangan.toString(),
    })) ?? []

  const roomTypeData =
    roomType?.map((rt) => ({
      label: rt.nama,
      value: rt.id_jenis_ruangan.toString(),
    })) ?? []

  const HandleSave = async (value: TResolverRoom) => {
    setLoading(true)
    await AxiosClient.put(
      `/simrs/pelayanan/pendaftaran-ruangan/pendaftaran/${data.id_pendaftaran}`,
      {
        ...value,
        tanggal_masuk: new Date(value.tanggal_masuk).toISOString(),
      }
    )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Berhasil menentukan ruangan')
          queryClient.invalidateQueries({ queryKey: ['registration'] })
          queryClient.invalidateQueries({ queryKey: ['registration-status-inap-count'] })
          setOpen(false)
          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal menentukan ruangan')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-teal-500 text-white hover:bg-teal-600 px-3 py-1 rounded text-xs font-medium"
      >
        Tentukan Ruangan
      </button>
      <DialogBasic
        open={open}
        setOpen={setOpen}
        title="Tentukan Ruangan"
        className="lg:min-w-2xl rounded"
      >
        <div className="flex flex-col gap-6">
          <div>
            <TitleLine className="text-lg font-semibold text-primary" title="1. Informasi Pasien" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-sm text-gray-500">No. Pendaftaran</p>
                <p className="text-base font-medium">{data.no_pendaftaran}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">No. Rekam Medis</p>
                <p className="text-base font-medium">{data.no_rekam_medis_pasien}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nama Pasien</p>
                <p className="text-base font-medium">{data.nama_pasien}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Poli</p>
                <p className="text-base font-medium">{data.nama_poli}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dokter</p>
                <p className="text-base font-medium">{data.nama_dokter}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal Daftar</p>
                <p className="text-base font-medium">
                  {format(new Date(data.tanggal_pendaftaran), 'dd-MM-yyyy HH:mm')}
                </p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-6">
              <div>
                <TitleLine
                  className="text-lg font-semibold text-primary"
                  title="2. Informasi Rawat Inap"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                  <SelectBasicInput
                    name="id_jenis_ruangan"
                    form={form}
                    label="Jenis Ruangan"
                    placeholder="Pilih Jenis Ruangan"
                    data={roomTypeData}
                    usePortal
                  />
                  <SelectBasicInput
                    name="id_ruangan"
                    form={form}
                    label="Ruangan"
                    placeholder="Pilih Ruangan"
                    data={roomData}
                    usePortal
                  />
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Tanggal Masuk
                    </label>
                    <input
                      type="datetime-local"
                      {...form.register('tanggal_masuk')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {form.formState.errors.tanggal_masuk && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.tanggal_masuk.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      {...form.register('catatan')}
                      placeholder="Masukkan catatan"
                      className="flex min-h-[80px] w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className={'text-gray-700 flex items-center gap-1'}>
                  Status akan berubah dari <b className={'text-black'}>Menunggu Ruangan</b>
                  <ArrowRight className={'size-4'} />
                  <b className={'text-blue-500'}>Dirawat</b>
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogBasic>
    </>
  )
}
