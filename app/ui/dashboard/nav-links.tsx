'use client';

import { usePathname, useRouter } from 'next/navigation';

const links = [
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

export default function NavDropdown() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="font-bold">
      <select
        id="region"
        name="regionValue"
        className="rounded-md border border-gray-200 text-xs md:text-sm outline-2 h-10 px-4"
        onChange={(event) => router.push(event.target.value)}
        defaultValue={pathname}
      >
        {links.map((link) => (
          <option key={link.name} value={link.href}>
            {link.name}
          </option>
        ))}
      </select>
    </div>
  );
}
