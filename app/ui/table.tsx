import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getData } from '@/lib/actions';

export default async function MainTable() {
  const file = await getData();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Fulfilment centr</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {file.map((row) => {
          const { Product, Status, Qty, Value } = row;

          return (
            <TableRow key={`${Product + Status + Qty + Value + Date.now()}`}>
              <TableCell>{Product}</TableCell>
              <TableCell>{Status}</TableCell>
              <TableCell className='font-medium'>
                {row['Fulfilment centr']}
              </TableCell>
              <TableCell className='font-medium'>{Qty}</TableCell>
              <TableCell className='font-medium'>{Value}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
