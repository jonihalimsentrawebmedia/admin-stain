export interface IProfileLeader {
  id_satuan_organisasi: string
  id_lembaga: string
  url_gambar: string
  key_gambar: string
  nama_ketua: string
  deskripsi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export type IProfileLeaderData = IProfileLeader

export type IProfileSecretary = Omit<IProfileLeaderData, 'nama_ketua'> & {
  nama_sekretaris: string
}
