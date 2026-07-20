export interface IAuthMenuItem {
  menu: string
  children: IAuthMenuItem[] | null
  akses: boolean
  melihat: boolean
  kelola: boolean
}
