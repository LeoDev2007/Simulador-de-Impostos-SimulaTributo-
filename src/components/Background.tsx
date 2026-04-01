import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-gradient-to-r from-white to-gray-200 w-full min-h-screen">
      {children}
    </section>

  );
};

export default Background;
