// src/utils/pdfMake.ts

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '@/build/vfs_fonts'

;(pdfMake as any).vfs = pdfFonts

pdfMake.addFonts({
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },

  TimesNewRoman: {
    normal: 'times.ttf',
    bold: 'timesb.ttf',
    italics: 'timesi.ttf',
    bolditalics: 'timesbi.ttf',
  },
})

export default pdfMake
