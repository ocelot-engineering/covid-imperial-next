import Image from 'next/image';

export function GitHubIcon() {
  return (
    <div className="rounded-full w-8 h-auto hover:fill-red-100">
      <Image
        src={'/github-mark.svg'}
        width={36}
        height={36}
        alt="Click to see source code"
      />
    </div>
  );
}
