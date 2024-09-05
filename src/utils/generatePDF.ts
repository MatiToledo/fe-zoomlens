import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Dispatch, RefObject } from "react";

export default function generatePDF(
  ref: RefObject<HTMLDivElement>,
  setIsMounted: Dispatch<React.SetStateAction<boolean>>,
  title: string
) {
  setIsMounted(true);
  setTimeout(async () => {
    if (ref.current) {
      const principalTable = ref.current;
      const scale = 4;
      const principalTableCanvas = await html2canvas(principalTable, {
        useCORS: true,
        scale: 2,
      });
      const imgWidth = principalTableCanvas.width;
      const imgHeight = principalTableCanvas.height;
      const principalTableImg = principalTableCanvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [imgWidth / scale, imgHeight / scale],
      });

      pdf.addImage(
        principalTableImg,
        "PNG",
        0,
        0,
        imgWidth / scale,
        imgHeight / scale
      );

      pdf.save(title);

      setIsMounted(false);
    }
  }, 100);
}
