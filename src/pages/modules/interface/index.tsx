export interface IModulesList {
  id_module: string
  nama_module: string
  kategori: string
  gambar: string
  controller: string
  urutan: number
  created_at: Date
  updated_at: Date
}

export interface IModules {
  id_module: string
  nama_module: string
  controller: string
  gambar: string
}
