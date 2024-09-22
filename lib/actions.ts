import { read, utils } from 'xlsx';
import { fileId } from './utils';

export async function getData() {
  const url = `https://docs.google.com/spreadsheets/d/e/${fileId}/pub?output=xlsx`;

  const workbook = read(await (await fetch(url, { cache: 'no-store' })).arrayBuffer());

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = utils.sheet_to_json(worksheet);

  return data;
}

export async function downloadFile(format?: 'xlsx' | 'csv') {
  const url = `https://docs.google.com/spreadsheets/d/e/${fileId}/pub?output=${format}`;

  fetch(url, { cache: 'no-store' })
  .then((response) => response.blob())
  .then((blob) => {
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `table.${format}`,
    );

    document.body.appendChild(link);

    link.click();

    link.parentNode?.removeChild(link);
  });
}
