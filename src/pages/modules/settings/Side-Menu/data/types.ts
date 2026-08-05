export interface IMenu {
  id_menu: string
  id_module: string
  parent_id?: string | null
  label: string
  link: string
  icon?: string
  urutan: number
  is_active: boolean
  children?: IMenu[]
}
