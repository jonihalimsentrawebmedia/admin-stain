/**
 * Build an absolute URL to a font file in the public/fonts/ directory.
 * This mirrors the logic in src/utils/pdfmake.ts.
 */
const fontUrl = (filename: string): string => {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const base = import.meta.env.BASE_URL || '/'
  const basePath = base.endsWith('/') ? base : base + '/'
  return `${origin}${basePath}fonts/${filename}`
}

/**
 * Central font map used by PDF generators across the E-Office module.
 *
 * Keys are the font display names used in setting.jenis_font.
 * Values are pdfmake font definitions with absolute URLs so pdfmake
 * fetches them via HTTP rather than looking them up in the (limited) vfs.
 *
 * All font files are hosted in public/fonts/ and copied from src/assets/fonts/.
 */
export const FONT_MAP: Record<string, { normal: string; bold: string; italics: string; bolditalics: string }> = {
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
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
  Tahoma: {
    normal: fontUrl('Tahoma.ttf'),
    bold: fontUrl('Tahomab.ttf'),
    italics: fontUrl('Tahomi.ttf'),
    bolditalics: fontUrl('Tahomabi.ttf'),
  },
  'Times New Roman': {
    normal: fontUrl('times.ttf'),
    bold: fontUrl('timesb.ttf'),
    italics: fontUrl('timesi.ttf'),
    bolditalics: fontUrl('timesbi.ttf'),
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
}

export const PDF_FONT_FAMILIES = Object.keys(FONT_MAP)
