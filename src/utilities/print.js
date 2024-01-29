import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { fonts } from "./customfont";
import { formatDateString } from "../utilities/formatDate";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = fonts;

export default function print(
  bookingDetails,
  typeworkName,
  serviceName,
  placeText,
  isPrint
) {
  const formattedDate = formatDateString(bookingDetails.date_booking);
  var docDefinition = {
    pageSize: "A4",
    content: [
      {
        text: [
          {text:`เลขนัดหมายขอเข้ารับบริการของคุณ \n`,lineHeight: 1.2,},
          {
            text: `${bookingDetails.booking_id}\n`,
            fontSize: 25,
            color: "#1081E9",
            characterSpacing: 2,
            bold: true,
            lineHeight: 1.2,
          },
          `วันที่  ${formattedDate}\n`,
          `ประเภทงาน : ${typeworkName} \n`,
          `งานบริการ : ${serviceName} \n`,
          `ณ ${placeText}\n`,
          `${
            bookingDetails.time_booking === 1
              ? "ช่วงเช้า (เวลา 09.00 - 11.00)"
              : "ช่วงบ่าย (เวลา 13.00 - 15.00)"
          }\n`,
          {
            text: "กรุณาแจ้ง เลขนัดหมายขอเข้ารับบริการ หรือ เลขประจำตัวประชาชน\nต่อเจ้าหน้าเมื่อเข้ารับบริการตามวันเเละเวลาที่นัดหมาย",
            fontSize: 9,
            color: "#F5002C",
          },
        ],
        margin: [0, 60, 0, 0],
        style: {
          fontSize: 16,
          alignment: "center",
        },
      },
    ],

    defaultStyle: {
      font: "Kanit",

      lineHeight: 1.5,
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  if (isPrint) {
    pdfDocGenerator.open();
  } else {
    let fileBase64 = null;
    pdfDocGenerator.getBase64((data) => {
      fileBase64 = data;
    });
    return fileBase64;
  }
}
