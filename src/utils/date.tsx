export function formatDateTime(isoString: string) {
    // 1. Buat objek Date dari string ISO
    const dateObj = new Date(isoString);

    // 2. Ekstrak Komponen Tanggal (Pastikan selalu 2 digit)
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Ditambah 1 karena getMonth() dimulai dari 0 (Januari)
    const year = dateObj.getFullYear();

    // 3. Ekstrak Komponen Waktu (Pastikan selalu 2 digit)
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    // 4. Gabungkan menjadi format yang diinginkan
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return {
        date: formattedDate,
        time: formattedTime
    }
}