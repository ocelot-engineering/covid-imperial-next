import Image from 'next/image';

export function GitHubIcon() {
  return (
    <div className="rounded-full w-7 md:w-9 hover:outline hover:outline-slate-200 hover:bg-slate-200">
      <a
        target="_blank"
        href="https://github.com/ocelot-engineering/covid-imperial-next"
      >
        <Image
          src={'/github-mark.svg'}
          width={40}
          height={40}
          alt="Click to see source code"
        />
      </a>
    </div>
  );
}
