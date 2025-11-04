export const dummyData: any[] = [
  {
    id: 1,
    nama_user: "Rudi Tabuti",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "081234567890",
    email: "rudi.tabuti@gmail.com",
    status: "Aktif",
    aktif_sejak: "31-10-2025\n14:00:00",
  },
  {
    id: 2,
    nama_user: "Sofia Kurnia",
    level: "Admin Fakultas",
    secondary_level: "Editor FTIK",
    no_handphone: "082234567891",
    email: "sofia.kurnia@gmail.com",
    status: "Tidak Aktif",
    aktif_sejak: "-",
  },
  {
    id: 3,
    nama_user: "Dani Samudra",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "083234567892",
    email: "dani.samudra@gmail.com",
    status: "Aktif",
    aktif_sejak: "02-11-2025\n11:30:00",
  },
  {
    id: 4,
    nama_user: "Maya Indira",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "084234567893",
    email: "maya.indira@gmail.com",
    status: "Aktif",
    aktif_sejak: "03-11-2025\n10:15:00",
  },
  {
    id: 5,
    nama_user: "Joko Prasetiyo",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "085234567894",
    email: "joko.prasetiyo@gmail.com",
    status: "Aktif",
    aktif_sejak: "04-11-2025\n13:45:00",
  },
  {
    id: 6,
    nama_user: "Lina Sari",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "086234567895",
    email: "lina.sari@gmail.com",
    status: "Aktif",
    aktif_sejak: "05-11-2025\n15:00:00",
  },
  {
    id: 7,
    nama_user: "Budi Santoso",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "087234567896",
    email: "budi.santoso@gmail.com",
    status: "Aktif",
    aktif_sejak: "06-11-2025\n12:30:00",
  },
  {
    id: 8,
    nama_user: "Nina Rahayu",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "088234567897",
    email: "nina.rahayu@gmail.com",
    status: "Aktif",
    aktif_sejak: "07-11-2025\n08:00:00",
  },
  {
    id: 9,
    nama_user: "Tina Larasati",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "089234567898",
    email: "tina.larasati@gmail.com",
    status: "Aktif",
    aktif_sejak: "08-11-2025\n16:20:00",
  },
  {
    id: 10,
    nama_user: "Anton Wijaya",
    level: "Admin Fakultas",
    secondary_level: null,
    no_handphone: "090234567899",
    email: "anton.wijaya@gmail.com",
    status: "Aktif",
    aktif_sejak: "09-11-2025\n14:50:00",
  },
];


export const optionSatuan= [
  // Kolom Kiri Baris 1-8
  { label: "P2M", value: "p2m" },
  { label: "Fakultas Ekonomi", value: "fakultas_ekonomi" },
  { label: "Fakultas Bahasa", value: "fakultas_bahasa" },
  { label: "Fakultas Komputer", value: "fakultas_komputer" },
  { label: "P2M", value: "p2m_2" }, // Diberi sufiks agar value unik
  { label: "Fakultas Ekonomi", value: "fakultas_ekonomi_2" },
  { label: "Fakultas Bahasa", value: "fakultas_bahasa_2" },
  { label: "Fakultas Komputer", value: "fakultas_komputer_2" },

  // Kolom Kanan Baris 1-8
  { label: "P2M", value: "p2m_3" },
  { label: "Fakultas Ekonomi", value: "fakultas_ekonomi_3" },
  { label: "Fakultas Bahasa", value: "fakultas_bahasa_3" },
  { label: "Fakultas Komputer", value: "fakultas_komputer_3" },
  { label: "P2M", value: "p2m_4" },
  { label: "Fakultas Ekonomi", value: "fakultas_ekonomi_4" },
  { label: "Fakultas Bahasa", value: "fakultas_bahasa_4" },
  { label: "Fakultas Komputer", value: "fakultas_komputer_4" },
];

export const dummyDataLevelUser = [
  {
    id: 1, // Tambahan untuk kebutuhan internal
    level: "Admin Fakultas",
    // Baris 1: Satuan Kerja adalah string tunggal
    satuan_kerja: "Fakultas Ilmu Bahasa",
    status: "Aktif",
    aktif_sejak: "09-11-2025\n14:10:00",
    diubah: "-",
  },
  {
    id: 2, // Tambahan untuk kebutuhan internal
    level: "Editor Website",
    // Baris 2: Satuan Kerja adalah array/list
    satuan_kerja: [
      "Pusat Penjaminan Mutu (P2M)",
      "Fakultas Ilmu Budaya",
      "Fakultas Ekonomi",
    ],
    status: "Aktif",
    aktif_sejak: "09-11-2025\n14:10:00",
    diubah: "09-11-2025\n14:10:00",
  },
  // Contoh data tambahan (Tidak Aktif)
  {
    id: 3,
    level: "Staf Umum",
    satuan_kerja: "Biro Administrasi Akademik",
    status: "Tidak Aktif",
    aktif_sejak: "01-01-2025\n08:00:00",
    diubah: "10-10-2025\n12:30:00",
  },
];