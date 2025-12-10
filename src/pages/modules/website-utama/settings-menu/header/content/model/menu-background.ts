export interface MenuBackgroundItem {
  id_menu_background: string;
  id_menu: string;
  gambar: string; // Tipe string karena berisi URL gambar
  urutan: number; // Tipe number karena berisi nilai urutan/angka
  status: 'Y' | 'N' | string; // Tipe string/literal string
}