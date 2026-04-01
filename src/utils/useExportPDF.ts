import jsPDF from "jspdf";
import { useHistory } from "../contexts/HistoryContext";

export function useExportPDF() {
  const { history } = useHistory();

  const exportPDF = () => {
    const doc = new jsPDF();
    const marginX = 14;
    let y = 20;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Histórico de Simulações", marginX, y);

    y += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(`Gerado em ${new Date().toLocaleString("pt-BR")}`, marginX, y);
    doc.setTextColor(0);
    y += 10;

    history.forEach((item, index) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setDrawColor(200);
      doc.line(marginX, y, 196, y);
      y += 6;

      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(
        `Cálculo ${index + 1} — ${item.type} — ${new Date(item.dateOfItem).toLocaleString("pt-BR")}`,
        marginX,
        y,
      );
      doc.setTextColor(0);
      y += 6;

      const fields: [string, string][] =
        item.type === "IR"
          ? [
              [
                "Salário bruto",
                item.salary.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }),
              ],
              [
                "INSS",
                item.inss.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }),
              ],
              [
                "IR",
                item.ir.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }),
              ],
              [
                "Salário líquido",
                item.netSalary.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }),
              ],
            ]
          : item.type === "IPVA"
            ? [
                [
                  "Valor do veículo",
                  item.vehicleValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                ],
                [
                  "IPVA",
                  item.ipva.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                ],
                [
                  "Valor líquido",
                  item.netValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                ],
                ["Alíquota", `${item.rate}%`],
              ]
            : [
                [
                  "Valor da mercadoria",
                  item.merchandiseValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                ],
                [
                  "ICMS",
                  item.icms.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                ],
                [
                  "Valor sem ICMS",
                  item.valueWithoutICMS.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                ],
                ["Alíquota", `${item.ratePercent}%`],
              ];

      doc.setFontSize(11);
      fields.forEach(([label, value]) => {
        doc.setFont("helvetica", "normal");
        doc.text(label, marginX, y);
        doc.setFont("helvetica", "bold");
        doc.text(value, 196, y, { align: "right" });
        y += 7;
      });

      y += 4;
    });

    doc.save("simulation-history.pdf");
  };

  return { exportPDF };
}
