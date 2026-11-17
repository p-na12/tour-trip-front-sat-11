function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getColumnName(index) {
  let number = index + 1;
  let name = "";
  while (number > 0) {
    const remainder = (number - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    number = Math.floor((number - remainder - 1) / 26);
  }
  return name;
}

function makeSpreadsheetXml(rows) {
  const tableRows = rows
    .map(
      (row, rowIndex) =>
        `<row r="${rowIndex + 1}">${row
          .map((value, columnIndex) => {
            const reference = `${getColumnName(columnIndex)}${rowIndex + 1}`;
            if (typeof value === "number") {
              return `<c r="${reference}" t="n"><v>${value}</v></c>`;
            }
            return `<c r="${reference}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(
              value,
            )}</t></is></c>`;
          })
          .join("")}</row>`,
    )
    .join("");

  const lastColumn = getColumnName(rows[0].length - 1);
  const lastRow = rows.length;
  const declaration = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

  return {
    worksheet: `${declaration}<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:${lastColumn}${lastRow}"/><sheetData>${tableRows}</sheetData><autoFilter ref="A1:${lastColumn}${lastRow}"/></worksheet>`,
    workbook: `${declaration}<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Booking Report" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    workbookRelationships: `${declaration}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`,
    packageRelationships: `${declaration}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    contentTypes: `${declaration}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`,
  };
}

export async function createExcelWorkbook(rows) {
  if (!rows.length || !rows[0].length) {
    throw new Error("Excel export requires at least one row and one column.");
  }

  const { strToU8, zipSync } = await import("fflate");
  const files = makeSpreadsheetXml(rows);

  return zipSync({
    "[Content_Types].xml": strToU8(files.contentTypes),
    "_rels/.rels": strToU8(files.packageRelationships),
    "xl/workbook.xml": strToU8(files.workbook),
    "xl/_rels/workbook.xml.rels": strToU8(files.workbookRelationships),
    "xl/worksheets/sheet1.xml": strToU8(files.worksheet),
  });
}
