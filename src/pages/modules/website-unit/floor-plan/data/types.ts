interface AuditUser {
  nama_user_created: string
  nama_user_updated: string
}

export interface IFloorPlan extends AuditUser {
  id_unit_denah_lantai: string
  id_satuan_organisasi: string

  denah_lantai_url: string
  denah_lantai_key: string

  nama_lantai: string
  urutan: number
}
