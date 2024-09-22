import Link from 'next/link';
import DownloadButton from './downloadButton';

export default function Header() {
  return <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-slate-50 px-4 md:px-6 z-50'>
  <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
    <Link
      href='/'
      className='text-foreground transition-colors hover:text-foreground'
    >
      Dashboard
    </Link>
    <Link
      href='/statistics'
      className='text-foreground transition-colors hover:text-foreground'
    >
      Statistics
    </Link>
  </nav>
  <div className='md:ml-auto'>
    <DownloadButton />
  </div>
</header>
}
