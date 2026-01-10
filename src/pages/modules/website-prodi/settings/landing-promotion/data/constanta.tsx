export interface ILandingPagePosition {
  id: number
  title: string
  items: {
    label: string
    value: string
  }[]
}

export const DataLandingPromotion: ILandingPagePosition[] = [
  {
    id: 1,
    title: 'Posisi Atas',
    items: [
      {
        label: '📍 Letak',
        value: 'Paling atas halaman',
      },
      {
        label: '🎯 Fungsi',
        value: 'Menarik perhatian pertama',
      },
    ],
  },
  {
    id: 2,
    title: 'Posisi Tengah',
    items: [
      {
        label: '📍 Letak',
        value: 'Bagian inti halaman',
      },
      {
        label: '🎯 Fungsi',
        value: 'Menjelaskan detail promosi',
      },
    ],
  },
  {
    id: 3,
    title: 'Posisi Bawah',
    items: [
      {
        label: '📍 Letak',
        value: 'Menjelang atau di bagian footer',
      },
      {
        label: '🎯 Fungsi',
        value: 'Penegasan & penutup promosi',
      },
    ],
  },
  {
    id: 4,
    title: 'Sidebar Kiri',
    items: [
      {
        label: '📍 Letak',
        value: 'Sisi kiri halaman',
      },
      {
        label: '🎯 Fungsi',
        value: 'Navigasi & promosi sekunder',
      },
    ],
  },
]
