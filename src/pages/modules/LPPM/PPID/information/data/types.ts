export interface IListInformationTree {
  id_daftar_informasi: string
  id_satuan_organisasi: string
  judul: string
  id_parent: string | null
  url: string | null
  urutan: number
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_parent: string
  children: IListInformationTree[]
}
