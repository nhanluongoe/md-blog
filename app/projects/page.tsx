import Card from '@/components/project-card';
import projectsData from './data/projectsData';

export default function Projects() {
  return (
    <>
      <div className="">
        <div className="space-y-2 md:space-y-5">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            My Projects
          </h1>
        </div>
        <div className="container py-2 md:py-8">
          <div className="-m-4 grid grid-cols-1 flex-wrap items-stretch md:grid-cols-2">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                repo={d.repo}
                description={d.description}
                year={d.year}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
