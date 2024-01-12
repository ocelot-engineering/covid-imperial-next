export default function HeaderNav() {
  return (
    <div className="flex w-screen h-20 flex-row justify-between bg-gray-400 p-6">
      <h1>COVID-19</h1>
      <select
        className="rounded-md border border-gray-200 py-[9px] px-6 text-sm outline-2 h-10"
        defaultValue={`london`}
      >
        <option value="london">London</option>
        <option value="north east">North East</option>
      </select>
    </div>
  );
}
