'use client';

import { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ReactDNDProvider = ({ children }: PropsWithChildren) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default ReactDNDProvider;
