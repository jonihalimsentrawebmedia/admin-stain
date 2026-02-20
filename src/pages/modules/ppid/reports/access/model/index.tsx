export type Bulan =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export interface PeriodeItem {
  Name: Bulan;
  Value: number;
}

export interface StatusDetail {
  total: number;
  persentase: number;
}

export interface StatistikLayanan {
  total: number;
  periode: {
    Name: string;
    Value: number;
  }[];
  lama_waktu_pelayanan: {
    lebih_10_hari: number;
    kurang_10_hari: number;
  };
  status_permohonan_yang_diberikan: Record<string, StatusDetail>;
  alasan_penolakan_permohonan: Record<string, StatusDetail>;
}

export interface StatusDetail {
  total: number;
  persentase: number;
}