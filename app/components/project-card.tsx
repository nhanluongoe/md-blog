import Link from './link';

const ProjectCard = async ({ title, description, href, year, repo }) => {
  const { stargazers_count: numOfStars } = await (
    await fetch(`https://api.github.com/repos/nhanluongoe/${repo}`, {
      next: { revalidate: 60 * 60 }, // revalidate every 1 hour
    })
  ).json();

  return (
    <div className="flex-1 p-4 transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-md border border-gray-200 border-opacity-60 bg-gray-50 p-3 dark:border-gray-900 dark:bg-black">
        <div>
          <div className="flex justify-between pb-2">
            <time className="text-accent-500">{year}</time>
            {!!numOfStars && (
              <div className="font-ibm">
                <span className="mr-1 text-gray-900 dark:text-gray-300">
                  {numOfStars}
                </span>
                ⭐️
              </div>
            )}
          </div>
          <h2 className="mb-2 text-lg leading-5 tracking-tight md:text-xl">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <p className="md:text-md prose mb-3 max-w-none text-sm text-gray-900 dark:text-gray-300">
            {description}
          </p>
          <div className="flex gap-3">
            <Link
              href={`https://github.com/nhanluongoe/${repo}`}
              className="rounded-lg border border-gray-200 px-2 py-1 font-medium leading-6 hover:border-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-200"
              aria-label={`Link to ${title}`}
            >
              Source
            </Link>
            {href && (
              <Link
                href={href}
                className="rounded-lg border border-gray-200 px-2 py-1 font-medium leading-6 hover:border-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-200"
                aria-label={`Link to ${title}`}
              >
                Demo
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
