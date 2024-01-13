import NavLinks from './nav-links';

export default function HeaderNav() {
  return (
    <div className="flex w-screen h-20 flex-row justify-between bg-gray-400 p-6">
      <p>COVID-19</p>
      <NavLinks />
      <p>GitHub</p>

      {/* <select
        className="rounded-md border border-gray-200 py-[9px] px-6 text-sm outline-2 h-10"
        defaultValue={`london`}
      >
        {links.map((link) => (
          <option key={link.value} value={link.value}>
            {link.name}
          </option>
        ))}
      </select> */}
    </div>
  );
}
