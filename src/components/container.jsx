import React from "react";

const Container = ({ children }) => {
  return (
    <div className="flex flex-1 md:my-0 my-10 max-h-screen">
      <div className="p-2 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full fixed">
        {children}
      </div>
    </div>
  );
};

export default Container;
