// src/components/common/ExportMenu.tsx
import { useState } from "react";
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, type ButtonProps } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";
import { exportToPDF, exportToXLSX, type ColumnDef } from "@/utils/exportUtils";

type Props<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
  fileName: string;
  title?: string;
  disabled?: boolean;
  buttonProps?: ButtonProps;
};

export default function ExportMenu<T>({ rows, columns, fileName, title, disabled, buttonProps }: Props<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onExportXLSX = () => {
    exportToXLSX(rows, columns, fileName);
    setAnchorEl(null);
  };
  const onExportPDF = () => {
    exportToPDF(rows, columns, fileName, title ?? fileName);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={e => setAnchorEl(e.currentTarget)}
        disabled={disabled || rows.length === 0}
        {...buttonProps}
      >
        Exportar datos
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={onExportXLSX}>
          <ListItemIcon><GridOnIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Exportar a Excel" />
        </MenuItem>
        <MenuItem onClick={onExportPDF}>
          <ListItemIcon><PictureAsPdfIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Exportar a PDF" />
        </MenuItem>
      </Menu>
    </>
  );
}
