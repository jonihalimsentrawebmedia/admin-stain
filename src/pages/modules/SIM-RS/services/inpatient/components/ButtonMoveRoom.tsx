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
import { ArrowRight, Repeat } from 'lucide-react'

const ResolverMoveRoom = z.object({
  id_ruangan: z.string().min(1, 'Ruangan harus dipilih'),
  id_jenis_ruangan: z.string().min(1, 'Jenis Ruangan harus dipilih'),
  tanggal_masuk: z.string().min(1, 'Tanggal Masuk harus diisi'),
  catatan: z.string().optional().nullable(),
})

type TResolverMoveRoom = z.infer<typeof ResolverMoveRoom>

interface Props {
  data: IRegistration
}

export const ButtonMoveRoom = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const activeRoom = data.riwayat_ruangan?.find((r) => r.status === 'AKTIF')

  const form = useForm<TResolverMoveRoom>({
    resolver: zodResolver(ResolverMoveRoom),
    defaultValues: {
      id_ruangan: '',
      id_jenis_ruangan: '',
      tanggal_masuk: '',
      catatan: '',
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

  const HandleSave = async (value: TResolverMoveRoom) => {
    setLoading(true)
    await AxiosClient.put(
      `/simrs/pelayanan/pendaftaran-ruangan/pendaftaran/${data.id_pendaftaran}/pindah-ruangan`,
      {
        id_ruangan: value.id_ruangan,
        id_jenis_ruangan: value.id_jenis_ruangan,
        tanggal_masuk: new Date(value.tanggal_masuk).toISOString(),
        catatan: value.catatan ?? '',
      }
    )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Berhasil memindahkan ruangan')
          queryClient.invalidateQueries({ queryKey: ['registration'] })
          queryClient.invalidateQueries({ queryKey: ['registration-status-inap-count'] })
          queryClient.invalidateQueries({
            queryKey: ['detail-registration', data.id_pendaftaran],
          })
          setOpen(false)
          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal memindahkan ruangan')
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
        className="bg-orange-500 text-white hover:bg-orange-600 px-3 py-1 rounded text-xs font-medium flex items-center gap-1"
      >
        <Repeat className="size-3" />
        Pindah Ruangan
      </button>
      <DialogBasic
        open={open}
        setOpen={setOpen}
        title="Pindah Ruangan"
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

          {activeRoom && (
            <div>
              <TitleLine
                className="text-lg font-semibold text-primary"
                title="2. Riwayat Ruangan Terakhir"
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-gray-500">Jenis Ruangan</p>
                  <p className="text-base font-medium">{activeRoom.nama_jenis_ruangan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ruangan</p>
                  <p className="text-base font-medium">
                    {activeRoom.nama_ruangan} ({activeRoom.nomor_ruangan})
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Masuk</p>
                  <p className="text-base font-medium">
                    {format(new Date(activeRoom.tanggal_masuk), 'dd-MM-yyyy HH:mm')}
                  </p>
                </div>
                {activeRoom.catatan && (
                  <div>
                    <p className="text-sm text-gray-500">Catatan</p>
                    <p className="text-base font-medium">{activeRoom.catatan}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-6">
              <div>
                <TitleLine
                  className="text-lg font-semibold text-primary"
                  title="3. Ruangan Baru"
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
                      placeholder="Masukkan catatan pindah ruangan"
                      className="flex min-h-[80px] w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {activeRoom && (
                <div>
                  <p className="text-gray-700 flex items-center gap-1">
                    Ruangan akan berubah dari{' '}
                    <b className="text-black">
                      {activeRoom.nama_ruangan} ({activeRoom.nomor_ruangan})
                    </b>
                    <ArrowRight className="size-4" />
                    <b className="text-orange-500">Ruangan Baru</b>
                  </p>
                </div>
              )}

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
                  className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Pindah Ruangan'}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogBasic>
    </>
  )
}
