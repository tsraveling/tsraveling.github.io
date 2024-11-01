import React from "react";

interface PageProps {
  title: string;
  date: Date;
  className?: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, date, className, children }) => {
  const fullDate = React.useMemo(
    () =>
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [date]
  );
  const dateCode = React.useMemo(
    () => date.toISOString().split("T")[0],
    [date]
  );

  return (
    <main className={className}>
      <article className="prose prose-lg prose-stone dark:prose-invert max-w-3xl md:prose-p:leading-loose md:prose-ul:leading-loose">
        <h1 className="pb-1 bg-yellow-200 dark:bg-transparent dark:border-solid dark:border-b-2 dark: border-yellow-400 mb-6">
          {title}
        </h1>
        <em>
          <time
            data-pubdate="pubdate"
            data-datetime={dateCode}
            title={fullDate}
          >
            Feb. 8, 2022
          </time>
        </em>
        <div className="border-solid md:border-l-2 border-gray-300 dark:border-gray-800 md:pl-8">
          {children}
        </div>
      </article>
    </main>
  );
};

export default Page;
