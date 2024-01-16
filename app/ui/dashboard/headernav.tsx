import NavDropdown from '@/app/ui/dashboard/nav-links';
import { GitHubIcon } from '@/app/ui/dashboard/icons';

export default function HeaderNav() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 h-20 bg-slate-400 text-slate-900 p-6 h-20 items-center">
      <h1 className="text-2xl md:text-4xl font-bold">COVID-19</h1>
      <div className="md:justify-self-center">
        <NavDropdown />
      </div>
      <div className="justify-self-end">
        <GitHubIcon />
      </div>
    </div>
  );
}
