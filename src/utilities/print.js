import pdfMake from "pdfmake/build/pdfmake";
import { formatDateString } from "../utilities/formatDate";

export default function print(
  bookingDetails,
  typeworkName,
  serviceName,
  placeText,
  fetchSendMail
) {
  const formattedDate = formatDateString(bookingDetails.date_booking);
  const docDefinition = {
    pageSize: "A4",
    content: [
      {
        text: [
          { text: `เลขนัดหมายขอเข้ารับบริการของคุณ  \n`, lineHeight: 1.2 },
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
            text: "กรุณาแจ้ง เลขนัดหมายขอเข้ารับบริการ\nต่อเจ้าหน้าเมื่อเข้ารับบริการตามวันเเละเวลาที่นัดหมาย",
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
      font: "THSarabun",

      lineHeight: 1.5,
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  if (!fetchSendMail) {
    pdfDocGenerator.open();
  } else {
    pdfDocGenerator.getBase64(fetchSendMail);
  }
}
