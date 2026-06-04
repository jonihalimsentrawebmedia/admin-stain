import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

;(pdfMake as any).vfs = (pdfFonts as any).vfs

interface GenerateAttendancePdfProps {
  event: any
  attendance: any
  values: any
}

export const generateAttendancePdf = ({
  event,
  attendance,
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

  attendance?.daftar_tamu?.forEach((row: any, index: number) => {
    const data = []

    if (values.nomor) data.push(index + 1)
    if (values.Nama_peserta) data.push(row.nama)
    if (values.instansi) data.push(row.instansi)
    if (values.hp) data.push(row.hp)
    if (values.email) data.push(row.email || '-')
    if (values.jabatan) data.push(row.jabatan || '-')
    if (values.tanda_tangan) data.push('')

    body.push(data)
  })

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

interface GenerateAttendancePdfProps {
  event: any
  attendance: any
  values: any
}

export const generatePreviewAttendancePdf = ({
  event,
  attendance,
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

  attendance?.daftar_tamu?.forEach((row: any, index: number) => {
    const data = []

    if (values.nomor) data.push(index + 1)
    if (values.Nama_peserta) data.push(row.nama)
    if (values.instansi) data.push(row.instansi)
    if (values.hp) data.push(row.hp)
    if (values.email) data.push(row.email || '-')
    if (values.jabatan) data.push(row.jabatan || '-')
    if (values.tanda_tangan) data.push('')

    body.push(data)
  })

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

  // pdfMake.createPdf(docDefinition).print()

  return { docDefinition }
}
