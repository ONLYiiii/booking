import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '@/assets/fonts/th-sarabun.js'

pdfMake.vfs = pdfFonts
pdfMake.fonts = {
  Roboto: {
    normal: 'THSarabun.woff',
    bold: 'THSarabunBold.woff',
  },
  THSarabun: {
    normal: 'THSarabun.woff',
    bold: 'THSarabunBold.woff',
  },
  THSarabunIT9: {
    normal: 'THSarabunIT9.woff',
    bold: 'THSarabunIT9Bold.woff',
  },
}

const primaryStyle = () => {
  return {
    font: 'THSarabun',
    fontSize: 16,
    lineHeight: 1.5,
    columnGap: 20,
  }
}
const SarabunIT9Style = () => {
  return {
    font: 'THSarabunIT9',
    fontSize: 16,
    lineHeight: 1,
    columnGap: 20,
  }
}

const pdfPrintPreview = (content) => {
  const pdfDocGenerator = window.pdfMake.createPdf(content)
  pdfDocGenerator.getBlob(function (blob) {
    const pdfPreview = document.getElementById('pdfPreview')
    if (pdfPreview) {
      pdfPreview.remove()
    }
    const iframe = document.createElement('iframe')
    iframe.id = 'pdfPreview'
    iframe.style.display = 'none'
    iframe.src = URL.createObjectURL(blob)
    document.body.appendChild(iframe)
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
  })
}

export default {
  primaryStyle,
  pdfPrintPreview,
  SarabunIT9Style,
}
