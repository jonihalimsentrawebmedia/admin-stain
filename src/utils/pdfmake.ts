// src/utils/pdfMake.ts

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '@/build/vfs_fonts'

;(pdfMake as any).vfs = pdfFonts

/**
 * Build an absolute URL to a font file in the public/fonts/ directory.
 * pdfmake fetches the font via HTTP(S) when the value starts with http:// or https://.
 * Bare filenames (like 'Verdana.ttf') are looked up in the virtual file system (vfs),
 * which only contains Times New Roman fonts. By using absolute URLs, we avoid the
 * "File not found in virtual file system" error.
 */
const fontUrl = (filename: string): string => {
  // Use window.location.origin to get the current base URL (works in both dev and production)
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : ''
  const base = import.meta.env.BASE_URL || '/'
  const basePath = base.endsWith('/') ? base : base + '/'
  return `${origin}${basePath}fonts/${filename}`
}

pdfMake.addFonts({
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
  'Times New Roman': {
    normal: fontUrl('times.ttf'),
    bold: fontUrl('timesb.ttf'),
    italics: fontUrl('timesi.ttf'),
    bolditalics: fontUrl('timesbi.ttf'),
  },
  Arial: {
    normal: fontUrl('Arial.ttf'),
    bold: fontUrl('Arial-Bold.ttf'),
    italics: fontUrl('Arial-Italic.ttf'),
    bolditalics: fontUrl('Arial-BoldItalic.ttf'),
  },
  'Bookman Old Style': {
    normal: fontUrl('BookmanOldStyle-Regular.ttf'),
    bold: fontUrl('BookmanOldStyle-Bold.ttf'),
    italics: fontUrl('BookmanOldStyle-Italic.ttf'),
    bolditalics: fontUrl('BookmanOldStyle-BoldItalic.ttf'),
  },
  'Courier New': {
    normal: fontUrl('CourierNew.ttf'),
    bold: fontUrl('CourierNew-Bold.ttf'),
    italics: fontUrl('CourierNew-Italic.ttf'),
    bolditalics: fontUrl('CourierNew-BoldItalic.ttf'),
  },
  Georgia: {
    normal: fontUrl('Georgia.ttf'),
    bold: fontUrl('Georgia-Bold.ttf'),
    italics: fontUrl('Georgia-Italic.ttf'),
    bolditalics: fontUrl('Georgia-BoldItalic.ttf'),
  },
  Impact: {
    normal: fontUrl('Impact.ttf'),
    bold: fontUrl('Impact-Bold.ttf'),
    italics: fontUrl('Impact-Italic.ttf'),
    bolditalics: fontUrl('Impact-BoldItalic.ttf'),
  },
  Tahoma: {
    normal: fontUrl('Tahoma.ttf'),
    bold: fontUrl('Tahomab.ttf'),
    italics: fontUrl('Tahomi.ttf'),
    bolditalics: fontUrl('Tahomabi.ttf'),
  },
  'Trebuchet MS': {
    normal: fontUrl('Trebuchet.ttf'),
    bold: fontUrl('Trebuchetb.ttf'),
    italics: fontUrl('Trebucheti.ttf'),
    bolditalics: fontUrl('Trebuchetbi.ttf'),
  },
  Verdana: {
    normal: fontUrl('Verdana.ttf'),
    bold: fontUrl('Verdanab.ttf'),
    italics: fontUrl('Verdanai.ttf'),
    bolditalics: fontUrl('Verdanabi.ttf'),
  },
})

export default pdfMake
