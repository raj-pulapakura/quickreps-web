import React from 'react';

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[600px] m-auto mt-16">{children}</div>;
}
