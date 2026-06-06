import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

;(pdfMake as any).vfs = (pdfFonts as any).vfs

interface GenerateAttendancePdfProps {
  event: any
  // attendance: any
  values: any
}

export const generateAttendancePdf = ({
  event,
  // attendance,
  values,
}: GenerateAttendancePdfProps) => {
  const columns = []

  if (values.nomor)
    columns.push({
      text: 'No.',
      style: 'tableHeader',
    })

  if (values.Nama_peserta)
    columns.push({
      text: 'Nama Peserta',
      style: 'tableHeader',
    })

  if (values.instansi)
    columns.push({
      text: 'Instansi/Alamat',
      style: 'tableHeader',
    })

  if (values.hp)
    columns.push({
      text: 'HP',
      style: 'tableHeader',
    })

  if (values.email)
    columns.push({
      text: 'Email',
      style: 'tableHeader',
    })

  if (values.jabatan)
    columns.push({
      text: 'Jabatan',
      style: 'tableHeader',
    })

  if (values.tanda_tangan)
    columns.push({
      text: 'Tanda Tangan',
      style: 'tableHeader',
    })

  const body = [columns]

  // attendance?.daftar_tamu?.forEach((row: any, index: number) => {
  //   const data = []
  //
  //   if (values.nomor) data.push(index + 1)
  //   if (values.Nama_peserta) data.push(row.nama)
  //   if (values.instansi) data.push(row.instansi)
  //   if (values.hp) data.push(row.hp)
  //   if (values.email) data.push(row.email || '-')
  //   if (values.jabatan) data.push(row.jabatan || '-')
  //   if (values.tanda_tangan) data.push('')
  //
  //   body.push(data)
  // })

  const docDefinition: any = {
    pageOrientation: values.hasil_cetak,
    pageMargins: [40, 40, 40, 60],

    content: [
      {
        text: 'DAFTAR HADIR',
        style: 'title',
      },

      {
        margin: [0, 20, 0, 15],
        columns: [
          {
            width: 150,
            text: ['Nama Kegiatan\n', 'Hari / Tanggal\n', 'Waktu\n', 'Tempat\n', 'Penyelenggara'],
          },
          {
            text: [
              `: ${event?.nama_kegiatan}\n`,
              `: ${
                event?.tanggal_mulai
                  ? format(new Date(event.tanggal_mulai), 'EEEE, dd MMMM yyyy', { locale: id })
                  : ''
              }\n`,
              `: ${event?.waktu}\n`,
              `: ${event?.tempat}\n`,
              `: ${event?.penyelenggara}`,
            ],
          },
        ],
      },

      {
        table: {
          headerRows: 1,
          dontBreakRows: true,
          body,
        },
      },

      {
        margin: [0, 80, 0, 0],
        columns: [
          {
            width: '*',
            stack: [
              {
                text: 'Diketahui,',
                bold: true,
              },
              {
                text: values.diketahui_jabatan,
                margin: [0, 5, 0, 60],
              },
              {
                text: values.diketahui_nama,
                bold: true,
              },
            ],
          },

          {
            width: '*',
            alignment: 'right',
            stack: [
              {
                text: 'Mengetahui,',
                bold: true,
              },
              {
                text: values.mengetahui_jabatan,
                margin: [0, 5, 0, 60],
              },
              {
                text: values.mengetahui_nama,
                bold: true,
              },
            ],
          },
        ],
      },
    ],

    styles: {
      title: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },

      tableHeader: {
        bold: true,
        alignment: 'center',
      },
    },
  }

  pdfMake.createPdf(docDefinition).download(`Daftar-Hadir-${event?.nama_kegiatan}.pdf`)
}
;(pdfMake as any).vfs = (pdfFonts as any).vfs

export const generatePreviewAttendancePdf = ({ event, values }: GenerateAttendancePdfProps) => {
  const columns = []
  const widths = []

  if (values.nomor) {
    columns.push({
      text: 'No.',
      style: 'tableHeader',
      fontSize: 10,
    })
    widths.push(20)
  }

  if (values.Nama_peserta) {
    columns.push({
      text: 'Nama Peserta',
      style: 'tableHeader',
      fontSize: 10,
    })
    widths.push('*')
  }

  if (values.instansi) {
    columns.push({
      text: 'Instansi/Alamat',
      style: 'tableHeader',
      fontSize: 10,
    })
    widths.push('*')
  }

  if (values.hp) {
    columns.push({
      text: 'HP',
      style: 'tableHeader',
      fontSize: 10,
    })
    widths.push(values?.hasil_cetak === 'portrait' ? 65 : 100)
  }

  if (values.email) {
    columns.push({
      text: 'Email',
      style: 'tableHeader',
      fontSize: 10,
    })
    widths.push(values?.hasil_cetak === 'portrait' ? 65 : 100)
  }

  if (values.jabatan) {
    columns.push({
      text: 'Jabatan',
      style: 'tableHeader',
      fontSize: 10,
    })
    widths.push(values?.hasil_cetak === 'portrait' ? 50 : 100)
  }

  if (values.tanda_tangan) {
    columns.push({
      text: 'TTD',
      style: 'tableHeader',
      fontSize: 10,
    })
    widths.push(values?.hasil_cetak === 'portrait' ? 50 : 100)
  }

  const body = [columns]

  for (let i = 0; i < Number(values.jumlah_row || 0); i++) {
    const row: any[] = []

    if (values.nomor) row.push({ text: `${i + 1}`, alignment: 'center' })
    if (values.Nama_peserta) row.push('')
    if (values.instansi) row.push('')
    if (values.hp) row.push('')
    if (values.email) row.push('')
    if (values.jabatan) row.push('')
    if (values.tanda_tangan) row.push('')
    body.push(row)
  }

  const docDefinition: any = {
    pageOrientation: values.hasil_cetak,
    pageMargins: [40, 40, 40, 60],

    footer: (currentPage: number, pageCount: number) => {
      return {
        margin: [40, 40, 40, 0],
        columns: [
          {
            text: `Dicetak pada ${format(new Date(), 'EEEE, dd MMMM yyyy HH:mm', {
              locale: id,
            })}`,
            fontSize: 9,
            color: '#666',
          },
          {
            text: `Halaman ${currentPage} dari ${pageCount}`,
            alignment: 'right',
            fontSize: 9,
            color: '#666',
          },
        ],
      }
    },

    content: [
      {
        text: 'DAFTAR HADIR',
        style: 'title',
      },

      {
        margin: [0, 15, 0, 15],
        columns: [
          {
            width: 150,
            text: ['Nama Kegiatan\n', 'Hari / Tanggal\n', 'Waktu\n', 'Tempat\n', 'Penyelenggara'],
          },
          {
            text: [
              `: ${event?.nama_kegiatan}\n`,
              `: ${
                event?.tanggal_mulai
                  ? format(new Date(event.tanggal_mulai), 'EEEE, dd MMMM yyyy', { locale: id })
                  : ''
              }\n`,
              `: ${event?.waktu}\n`,
              `: ${event?.tempat}\n`,
              `: ${event?.penyelenggara}`,
            ],
          },
        ],
      },

      {
        table: {
          headerRows: 1,
          dontBreakRows: true,
          widths: [...widths],
          heights: (rowIndex: any) => (rowIndex === 0 ? 0 : 30),
          body,
        },
        layout: {
          paddingTop: (index: any) => (index === 0 ? 10 : 15),
          paddingBottom: (index: any) => (index === 0 ? 10 : 5),
          paddingLeft: () => 4,
          paddingRight: () => 4,
        },
      },

      {
        margin: [0, 80, 0, 0],
        columns: [
          {
            width: '*',
            alignment: 'center',
            stack: [
              {
                text: 'Yang Diketahui',
                bold: true,
              },
              {
                text:
                  values.diketahui_jabatan === ''
                    ? '........................................,'
                    : values.diketahui_jabatan + ',',
                margin: [0, 5, 0, 60],
              },
              {
                text:
                  values.diketahui_nama === ''
                    ? '........................................'
                    : values?.diketahui_nama,
                bold: true,
              },
            ],
          },

          {
            width: '*',
            alignment: 'center',
            stack: [
              {
                text: 'Diketahui Oleh',
                bold: true,
              },
              {
                text:
                  values.mengetahui_jabatan === ''
                    ? '........................................,'
                    : values.mengetahui_jabatan + ',',
                margin: [0, 5, 0, 60],
              },
              {
                text:
                  values.mengetahui_nama === ''
                    ? '........................................'
                    : values.mengetahui_nama,
                bold: true,
              },
            ],
          },
        ],
      },
    ],

    styles: {
      title: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },

      tableHeader: {
        bold: true,
        alignment: 'center',
      },
    },
  }

  return { docDefinition }
}
