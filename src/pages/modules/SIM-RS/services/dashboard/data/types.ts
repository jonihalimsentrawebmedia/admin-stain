import type { LucideIcon } from 'lucide-react'
import { ClipboardPlus, FilePlus2, Stethoscope, UserPlus } from 'lucide-react'

export interface StatisticCardType {
  title: string
  value: string | number
  icon: LucideIcon
  iconBg?: string
}

export interface StatisticCardType {
  title: string
  value: string | number
  icon: LucideIcon
  iconBg?: string
}

export interface QuickActionType {
  title: string
  icon: LucideIcon
  onClick?: () => void
}

export const quickActions = [
  {
    title: 'Pasien',
    icon: UserPlus,
    link: '/modules/sim-rs/reference/patient/add',
  },
  {
    title: 'Pendaftaran',
    icon: ClipboardPlus,
    link: '/modules/sim-rs/services/registration/add',
  },
  {
    title: 'Dokter',
    icon: Stethoscope,
    link: '/modules/sim-rs/reference/doctor/add',
  },
  {
    title: 'Pemeriksaan',
    icon: FilePlus2,
    link: '/modules/sim-rs/services/registration?status=DIPANGGIL',
  },
]

export interface IDashboard {
  total_pasien: number
  total_rawat_jalan: number
  total_rawat_inap: number
  total_dokter: number
}

export interface IPendaftaranPerPoliItem {
  id_poli: string
  nama_poli: string
  jumlah: number
  persentase: number
}

export interface IPendaftaranPerPoli {
  total: number
  items: IPendaftaranPerPoliItem[]
}

export interface IGrafikKunjunganItem {
  label: string
  jumlah: number
}

export interface IGrafikKunjungan {
  periode: string
  items: IGrafikKunjunganItem[]
}
