export function formatDateTime(isoString: string | null) {
  if (!isoString) return { time: '', date: '' }
  // 1. Buat objek Date dari string ISO
  const dateObj = new Date(isoString)

  // 2. Ekstrak Komponen Tanggal (Pastikan selalu 2 digit)
  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Ditambah 1 karena getMonth() dimulai dari 0 (Januari)
  const year = dateObj.getFullYear()

  // 3. Ekstrak Komponen Waktu (Pastikan selalu 2 digit)
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')
  const seconds = String(dateObj.getSeconds()).padStart(2, '0')

  // 4. Gabungkan menjadi format yang diinginkan
  const formattedDate = `${day}-${month}-${year}`
  const formattedTime = `${hours}:${minutes}:${seconds}`

  return {
    date: formattedDate,
    time: formattedTime,
  }
}

export function formatDateTimeCustom(value?: string | null) {
  if (value) {
    const temp = value.split(' ')
    const tempDate = value[0].split('-').reverse().join('-')

    return {
      time: temp[1],
      date: tempDate,
    }
  }
  return {
    time: '',
    date: '',
  }
}

export function cekSelisihHari(a:string) {
  // 1. Ubah input dan hari ini ke objek Date
  const tanggalInput = new Date(a);
  const hariIni = new Date();

  // 2. Reset waktu ke jam 00:00:00 agar perbandingan hanya pada tanggal
  tanggalInput.setHours(0, 0, 0, 0);
  hariIni.setHours(0, 0, 0, 0);

  // 3. Hitung selisih dalam milidetik, lalu ubah ke satuan hari
  const selisihMilidetik = hariIni.getTime() - tanggalInput.getTime();
  const selisihHari = Math.floor(selisihMilidetik / (1000 * 60 * 60 * 24));

  // 4. Logika Return
  if (selisihHari === 0) {
    return "hari ini";
  } else if (selisihHari === 1) {
    return "1 hari sebelumnya";
  } else if (selisihHari > 1) {
    return `${selisihHari} hari sebelumnya`;
  } else {
    // Jika selisih negatif, berarti tanggal input ada di masa depan
    return `${Math.abs(selisihHari)} hari mendatang`;
  }
}
