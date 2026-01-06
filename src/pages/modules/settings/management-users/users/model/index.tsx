import { z } from "zod";
export const levelUserSchema = z.object({
  id_level_user: z.string().min(1, { message: "ID level user harus diisi." }),
});
export const UsersResolver = z.object({
  gambar: z.string(),

  // Tipe: string (Nama lengkap)
  nama_lengkap: z.string().min(1, { message: "Nama lengkap harus diisi." }),

  // Tipe: string (Jabatan)
  jabatan: z.string().min(1, { message: "Jabatan harus diisi." }),

  // Tipe: Literal Union ('P' | 'L'), wajib diisi
  jenis_kelamin: z.string({ error: "Jenis Kelamin Wajib Disii" }),

  // Tipe: string (Nomor telepon), bisa ditambahkan validasi format regex lebih lanjut
  telepon: z
    .string({ error: "Nomor Telepon Wajib Diisi" })
    .min(11, { error: "Nomor Telepon Minimal 11 Digit" }),

  // Tipe: string (Email), menggunakan validasi format bawaan Zod
  email: z.string().email({ message: "Format email tidak valid." }),

  // Tipe: Literal Union ('Y' | 'N'), wajib diisi
  status: z.string({ error: "Status Wajib Diisi" }),
  satuan_kerja: z.union([z.string(), z.array(z.string())]).optional().nullable(),
  level_user: levelUserSchema,
});

export type UsersType = z.infer<typeof UsersResolver>;
export interface UserList {
  id_user: string;
  nama_lengkap: string;
  level_users: string[]; // Array of strings, e.g., ["Administrator", "Guest"]
  telepon: string;
  email: string;
  status: "Y" | "N"; // Can be 'Y' or 'N'
  aktif_sejak: string; // Typically a string representing the date/time
}



interface UserLevelMulti {
  id_users_multi_level: string; // UUID
  id_user: string; // Foreign key ke User
  id_level_user: string; // ID Level
  status: string; // Tipe data kosong, mungkin 'Y' | 'N' | ''
  aktif_sejak: string; // ISO 8601 string (Date/Time with timezone)
  created_at: string; // ISO 8601 string (Date/Time with timezone)
  created_user: string; // ID user yang membuat data
  updated_at: string; // ISO 8601 string (Date/Time with timezone)
  updated_user: string; // ID user yang terakhir memperbarui data
  nama_level_user: string;
  list_unit:string[]
  list_unit_nama:string[],


}

export interface UserDetail {
  id_user: string; // UUID
  email: string;
  jenis_kelamin: 'L' | 'P'; // Mengasumsikan hanya 'L' atau 'P'
  jabatan: string;
  nama_lengkap: string;
  telepon: string;
  gambar: string; // URL gambar
  status: 'Y' | 'N'; // Mengasumsikan hanya 'Y' atau 'N'
  created_at: string; // ISO 8601 string (Date/Time with timezone)
  created_user: string;
  updated_at: string; // ISO 8601 string (Date/Time with timezone)
  updated_user: string;
  satuan_kerja:string[]

  // Properti Array Nested
  level_users_multi: UserLevelMulti[];
}
