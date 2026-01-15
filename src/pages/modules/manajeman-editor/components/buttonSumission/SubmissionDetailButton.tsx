import { useState } from 'react'
import useGetSatuanOrganisasiPengajuanDetail from '../../controller/useGetSatuanOrganisasiPengajuanDetail'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISatuanOrganisasi } from '../../controller/useGetSatuanOrganisasiPengajuan'
import { cekSelisihHari, formatDateTime } from '@/utils/date'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FastForward } from 'lucide-react'

import { IoInformationCircle } from 'react-icons/io5'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import ModalAccept from './ModalAccept'
import ModalCancel from './ModalCancel'
import { IconCancel, IconChecklist } from '@/components/common/table/icon'
export function colostStatusPublish(color: string) {
  return color == 'DIPROSES'
    ? 'text-[#2769CD]'
    : color == 'DITOLAK'
      ? 'text-red-500'
      : 'text-primary'
}
const SubmissionDetailButton = () => {
  const [open, setOpen] = useState(false)
  const [openAccept, setOpenAccept] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [idSatuanOrganisasi, setIdSatuanOrganisasi] = useState('')
  const {
    loading,
    meta,
    satuanOrganisasiHistory,
    setLimit,
    setPage,
    setSearch,

    limit,
    page,
  } = useGetSatuanOrganisasiPengajuanDetail()
  const columns: ColumnDef<ISatuanOrganisasi>[] = [
    // Kolom # (Nomor Urut)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(Number(page) - 1) * Number(limit) + idx + 1}</div>
      }, // Menggunakan index baris + 1
    },

    // Kolom ID
    {
      accessorKey: 'diajukan_at',
      header: 'Tgl Diajukan',
      cell: ({ row }) => {
        const values = row.original
        const dateAt = formatDateTime(values.tanggal)
        return (
          <div>
            {dateAt.date}, {dateAt.time}
            <br />
            <span className="text-[#2769CD]">{cekSelisihHari(values.tanggal)}</span>
          </div>
        )
      },
    },

    // Kolom ID Parent
    {
      accessorKey: 'diajukan_user',
      header: 'Diajukan Oleh',
      cell: ({ row }) => {
        const values = row.original

        return (
          <div>
            {values.nama_admin}
            <br />
            {values.level}
          </div>
        )
      },
    },

    // Kolom Nama Unit
    {
      accessorKey: 'nama',
      header: 'Unit/Satuan Kerja',
      cell: ({ row }) => {
        const values = row.original

        return (
          <div>
            {values.nama_satuan_organisasi}
            <br />
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const values = row.original
        const color =
          values.status_publish == 'DIPROSES'
            ? 'text-[#2769CD]'
            : values.status_publish == 'DITOLAK'
              ? 'text-red-500'
              : 'text-primary'

        return <div className={color}>{values.status_publish}</div>
      },
    },
    {
      accessorKey: 'lihat-data',
      header: 'Lihat Data',
      cell: ({ row }) => {
        const values = row.original

        return (
          <Link
            to={`/modules/editor/faculty/${values.id_satuan_organisasi}/detail/${values.id_draft}`}
          >
            <Button
              variant={'outline'}
              className="border border-primary text-primary hover:text-primary"
            >
              <FastForward className="size-4" />
              Lihat Data
            </Button>
          </Link>
        )
      },
    },

    // Kolom Aksi (Icon Biru, Kuning, Merah)
    {
      accessorKey: 'aksi',
      header: '', // Kolom aksi di gambar tidak memiliki header teks
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            {(values.status_publish == 'DIPROSES' || values.status_publish == 'DRAFT') && (
              <>
                <button
                  onClick={() => {
                    setOpen(false)
                    setOpenAccept(true)
                    setIdSatuanOrganisasi(values.id_satuan_organisasi)
                  }}
                >
                  <IconChecklist />
                </button>

                <button
                  onClick={() => {
                    setOpen(false)
                    setOpenReject(true)
                    setIdSatuanOrganisasi(values.id_satuan_organisasi)
                  }}
                >
                  <IconCancel />
                </button>
              </>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        variant={'outline'}
        className="border-[#2769CD] border text-[#2769CD] bg-white hover:text-[#2769CD]"
      >
        <IoInformationCircle className="size-5 text-[#2769CD]" />
        Pengajuan Data ({satuanOrganisasiHistory.length})
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl font-bold">Riwayat Pengajuan Data</p>}
      >
        <div>
          <TableCustom
            addFilter={
              <SelectFilter
                selectClassName={'min-w-[8rem]'}
                label="Tampilkan"
                name={'limit'}
                fx={(v) => {
                  setLimit(v ?? '10')
                }}
                options={[
                  { label: '10 Data', value: '10' },
                  { label: '25 Data', value: '25' },
                  { label: '50 Data', value: '50' },
                  { label: '100 Data', value: '100' },
                ]}
              />
            }
            columns={columns}
            data={satuanOrganisasiHistory}
            isShowLimit={false}
            loading={loading}
            meta={meta}
            setPage={setPage}
            setSearch={setSearch}
          />
        </div>
      </DialogCustom>

      <ModalAccept
        open={openAccept}
        queryKey="editor-profile-satuan-organisasi-list"
        url={`/editor/profil/${idSatuanOrganisasi}/publish`}
        setOpen={(e) => {
          setOpenAccept(e)
          setOpen(true)
        }}
      />
      <ModalCancel
        open={openReject}
        queryKey="editor-profile-satuan-organisasi-list"
        url={`/editor/profil/${idSatuanOrganisasi}/tolak`}
        setOpen={(e) => {
          setOpenReject(e)
          setOpen(true)
        }}
      />
    </>
  )
}

export default SubmissionDetailButton
