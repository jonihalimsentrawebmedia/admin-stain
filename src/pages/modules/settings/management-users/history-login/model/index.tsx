export interface UserHistories {
  id_user: string;
  nama_lengkap: string;
  level_users: string[];
  telepon: string;
  aktif_sejak: string;
  login_terakhir: string | null;
}

export interface LogActivity {
  id: number;
  user_id: string;
  menu: string;
  action: string;
  table_name: string;
  record_id: string;
  old_data: {
    email: string | null;
  };
  new_data: {
    email: string | null;
  };
  ip_address: string;
  route: string;
  user_agent: string;
  created_at: string;
  nama_user: string;
  nama_satuan_organisasi: string | null;
  aksi: string;
}