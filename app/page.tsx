import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import MainTable from './ui/table';

export default function Dashboard() {
  return (
    <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <MainTable />
      </CardContent>
    </Card>
  );
}
