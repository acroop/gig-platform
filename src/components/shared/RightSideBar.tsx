import React from 'react';

const roadmaps = [
  { title: 'AI Engineer', link: 'https://roadmap.sh/ai-engineer' },
  { title: 'DevOps Engineer', link: 'https://roadmap.sh/devops' },
  { title: 'Full Stack Developer', link: 'https://roadmap.sh/full-stack' },
  { title: 'AI and Data Scientist', link: 'https://roadmap.sh/ai-data-scientist' },
  { title: 'Blockchain Developer', link: 'https://roadmap.sh/blockchain' },
  { title: 'Engineering Manager', link: 'https://roadmap.sh/engineering-manager' },
  { title: 'Product Manager', link: 'https://roadmap.sh/product-manager' },
  { title: 'Android Developer', link: 'https://roadmap.sh/android' },
  { title: 'MLOps', link: 'https://roadmap.sh/mlops' },
  { title: 'Software Architect', link: 'https://roadmap.sh/software-architect' },
];

function RightSideBar() {
  return (
    <div>
      <section className="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden">
        
        <div className="flex flex-1 flex-col justify-start">
          <h3 className="text-heading4-medium text-light-1">Choose your roadmap</h3>
          <ul className="mt-4 space-y-3">
            {roadmaps.map((roadmap, index) => (
              <li
                key={index}
                className="p-3 rounded-lg bg-dark-4 hover:bg-dark-3 transition-colors"
              >
                <a
                  href={roadmap.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-2 hover:text-light-1 text-heading5-medium"
                >
                  {roadmap.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default RightSideBar;