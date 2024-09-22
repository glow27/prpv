'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { downloadFile } from '@/lib/actions';

export default function DownloadButton() {
  const getFile = async (format: 'xlsx' | 'csv') => {
    await downloadFile(format)
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Download</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem key='xlsx' onSelect={() => getFile('xlsx')}>
          <span>.xlsx</span>
        </DropdownMenuItem>
        <DropdownMenuItem key='csv' onSelect={() => getFile('csv')}>
          <span>.csv</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
