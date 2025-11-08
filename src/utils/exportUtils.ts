// src/utils/exportUtils.ts
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable, { type UserOptions } from "jspdf-autotable";

export type CellValue = string | number | boolean | Date | null | undefined;

export type ColumnDef<T> = {
  key: keyof T;
  header: string;
  formatter?: (value: T[keyof T], row: T) => CellValue;
};

// --- helpers de normalización (PDF no acepta undefined) ---
type PdfCell = string | number | boolean | null;
const toPdfCell = (v: CellValue): PdfCell => {
  if (v === undefined) return "";
  if (v instanceof Date) return v.toISOString(); // o formatea a gusto
  return v as PdfCell;
};

export function exportToXLSX<T>(
  rows: T[],
  columns: ColumnDef<T>[],
  fileName: string
) {
  const data: (string | number | boolean | Date | null)[][] = rows.map((r) =>
    columns.map((c) => {
      const raw = r[c.key] as T[keyof T];
      const val = c.formatter ? c.formatter(raw, r) : (raw as CellValue);
      // XLSX tolera Date y null, pero mejor evitamos undefined
      return val === undefined ? "" : (val as never);
    })
  );

  const headers = [columns.map((c) => c.header)];
  const ws = XLSX.utils.aoa_to_sheet([...headers, ...data]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

export function exportToPDF<T>(
  rows: T[],
  columns: ColumnDef<T>[],
  fileName: string,
  title = fileName
) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const headers: string[] = columns.map((c) => c.header);
  const body: PdfCell[][] = rows.map((r) =>
    columns.map((c) => {
      const raw = r[c.key] as T[keyof T];
      const val = c.formatter ? c.formatter(raw, r) : (raw as CellValue);
      return toPdfCell(val);
    })
  );

  doc.setFontSize(14);
  doc.text(title, 40, 40);

  const options: UserOptions = {
    head: [headers],
    body, // ya es PdfCell[][]
    startY: 60,
    styles: { fontSize: 9, halign: "left", valign: "middle" },
    headStyles: { fillColor: [33, 150, 243] },
  };

  autoTable(doc, options);
  doc.save(`${fileName}.pdf`);
}

// Helpers comunes
export const formatCurrency = (
  value: number,
  locale: string = "es-PE",
  currency: string = "PEN"
): string =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

export const formatDate = (
  isoOrDate: string | Date,
  locale: string = "es-PE"
): string =>
  new Date(isoOrDate).toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
