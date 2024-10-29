import React from "react";

interface PageProps {
  title: string;
  date: Date;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, date, children }) => {
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
    <main>
      <article className="prose prose-lg pt-5 max-w-3xl mx-auto">
        <h1>{title}</h1>
        <p>
          <em>
            <time
              data-pubdate="pubdate"
              data-datetime={dateCode}
              title={fullDate}
            >
              Feb. 8, 2022
            </time>
          </em>
        </p>
        {children}
      </article>
    </main>
  );
};

export default Page;
