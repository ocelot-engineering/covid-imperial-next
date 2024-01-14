import NavDropdown from '@/app/ui/dashboard/nav-links';
import { GitHubIcon } from '@/app/ui/dashboard/icons';

export default function HeaderNav() {
  return (
    <div className="flex w-screen h-20 flex-row justify-between bg-slate-400 text-slate-900 p-6">
      <h1 className="text-4xl font-bold">COVID-19</h1>
      <NavDropdown />
      <GitHubIcon />
    </div>
  );
}
