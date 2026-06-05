declare module 'html-to-pdfmake' {
  interface HtmlToPdfmakeOptions {
    defaultStyles?: Record<string, any>
    [key: string]: any
  }

  function htmlToPdfmake(html: string, options?: HtmlToPdfmakeOptions): any

  export default htmlToPdfmake
}
