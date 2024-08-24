import React from 'react';

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
