'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'United Kingdom', href: '' },
  { name: 'East Midlands', href: 'East Midlands' },
  { name: 'East of England', href: 'East of England' },
  { name: 'London', href: 'London' },
  { name: 'North East', href: 'North East' },
  { name: 'North West', href: 'North West' },
  { name: 'South East', href: 'South East' },
  { name: 'South West', href: 'South West' },
  { name: 'West Midlands', href: 'West Midlands' },
  { name: 'Yorkshire and The Humber', href: 'Yorkshire and The Humber' },
].map((link) => {
  link.href = `/${encodeURIComponent(link.href)}`;
  return link;
});

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname == link.href,
              }
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
