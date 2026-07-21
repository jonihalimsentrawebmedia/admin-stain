import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailRegistration } from '../../register/hooks/index.tsx'
import { UseGetPemeriksaan, type IResepObatItem } from '../../register/diagnosis/hooks/index.tsx'
import { format } from 'date-fns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'

const DetailOutpatient = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading } = UseGetDetailRegistration(id ?? '')
  const { pemeriksaan } = UseGetPemeriksaan(id ?? '')

  const resepObatColumns: ColumnDef<IResepObatItem>[] = useMemo(
    () => [
      {
        accessorKey: 'order',
        header: '#',
        cell: ({ row }) => <>{row.index + 1}</>,
      },
      { accessorKey: 'nama_obat', header: 'Nama Obat' },
      { accessorKey: 'satuan', header: 'Satuan' },
      {
        accessorKey: 'harga_satuan',
        header: 'Harga',
        cell: ({ row }) =>
          new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
            row.original.harga_satuan
          ),
      },
      {
        accessorKey: 'frekuensi',
        header: 'Frekuensi',
        cell: ({ row }) => <>{row.original.frekuensi}x/hari</>,
      },
      {
        accessorKey: 'durasi',
        header: 'Durasi',
        cell: ({ row }) => <>{row.original.durasi} hari</>,
      },
      { accessorKey: 'jumlah', header: 'Jumlah' },
      {
        accessorKey: 'total',
        header: 'Harga Total',
        cell: ({ row }) =>
          new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
            row.original.harga_satuan * row.original.jumlah
          ),
      },
    ],
    []
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Data tidak ditemukan</p>
      </div>
    )
  }

  const badgeColor =
    detail.status === 'MENUNGGU'
      ? 'bg-yellow-100 text-yellow-700'
      : detail.status === 'DIPANGGIL'
        ? 'bg-blue-100 text-blue-700'
        : detail.status === 'SELESAI'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'

  const statusLabel =
    detail.status === 'MENUNGGU'
      ? 'Menunggu'
      : detail.status === 'DIPANGGIL'
        ? 'Dipanggil'
        : detail.status === 'SELESAI'
          ? 'Selesai'
          : 'Dibatalkan'

  const jkLabel = detail.jenis_kelamin_pasien === 'L' ? 'Laki-laki' : 'Perempuan'
  const tglLahir = format(new Date(detail.tanggal_lahir_pasien), 'dd-MM-yyyy')

  return (
    <div className="space-y-5">
      <ButtonTitleGroup
        isBack
        label="Detail Rawat Jalan"
        buttonGroup={[
          ...(pemeriksaan
            ? [
                {
                  type: 'edit' as const,
                  label: 'Edit Pemeriksaan',
                  onClick: () =>
                    navigate(
                      `/modules/sim-rs/services/outpatient/detail/${detail.id_pendaftaran}/edit-pemeriksaan`
                    ),
                },
              ]
            : []),
        ]}
      />

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Informasi Pendaftaran</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">No. Pendaftaran</p>
            <p className="text-base font-medium">{detail.no_pendaftaran}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Pendaftaran</p>
            <p className="text-base font-medium">
              {format(new Date(detail.tanggal_pendaftaran), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Informasi Pasien</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">No. Rekam Medis</p>
            <p className="text-base font-medium">{detail.no_rekam_medis_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nama Pasien</p>
            <p className="text-base font-medium">{detail.nama_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jenis Kelamin</p>
            <p className="text-base font-medium">{jkLabel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tempat Lahir</p>
            <p className="text-base font-medium">{detail.tempat_lahir_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Lahir</p>
            <p className="text-base font-medium">{tglLahir}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Tujuan Pelayanan</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Poli</p>
            <p className="text-base font-medium">{detail.nama_poli}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dokter</p>
            <p className="text-base font-medium">{detail.nama_dokter}</p>
          </div>
        </div>
      </div>

      {pemeriksaan && (
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-primary">Data Pemeriksaan</p>
            <button
              onClick={() =>
                navigate(
                  `/modules/sim-rs/services/outpatient/detail/${detail.id_pendaftaran}/edit-pemeriksaan`
                )
              }
              className="text-sm text-primary hover:underline font-medium"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-2">
              <p className="text-sm text-gray-500">No. Pemeriksaan</p>
              <p className="text-base font-medium">{pemeriksaan.no_pemeriksaan}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Keluhan Utama</p>
              <p className="text-base font-medium">{pemeriksaan.keluhan_utama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Diagnosa</p>
              <p className="text-base font-medium">
                {pemeriksaan.daftar_diagnosis?.length > 0
                  ? pemeriksaan.daftar_diagnosis.map((d) => d.nama_diagnosis).join(', ')
                  : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rencana Tindakan</p>
              <p className="text-base font-medium">
                {pemeriksaan.daftar_procedure?.length > 0
                  ? pemeriksaan.daftar_procedure.map((p) => p.nama_procedure).join(', ')
                  : '-'}
              </p>
            </div>
            {pemeriksaan.catatan && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Catatan</p>
                <p className="text-base font-medium">{pemeriksaan.catatan}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Keputusan</p>
              <p className="text-base font-medium">
                {pemeriksaan.keputusan === 'RAWAT_JALAN' ? 'Rawat Jalan' : 'Rawat Inap'}
              </p>
            </div>
          </div>

          {(pemeriksaan.daftar_resep_obat?.length ?? 0) > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Daftar Resep Obat</p>
              <TableCustom
                data={pemeriksaan.daftar_resep_obat}
                columns={resepObatColumns}
                isShowFilter={false}
                isShowPagination={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DetailOutpatient
