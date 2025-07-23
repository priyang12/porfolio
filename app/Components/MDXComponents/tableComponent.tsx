export const Table = ({ children }: React.PropsWithChildren) => (
  <table className="my-5 w-full border-collapse border border-neutral-700 text-left text-sm">
    {children}
  </table>
);

export const Thead = ({ children }: React.PropsWithChildren) => (
  <thead className="font-semibold text-neutral-50">{children}</thead>
);

export const Tbody = ({ children }: React.PropsWithChildren) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

export const Tr = ({ children }: React.PropsWithChildren) => (
  <tr className="">{children}</tr>
);

export const Th = ({ children }: React.PropsWithChildren) => (
  <th className="border border-gray-300 px-4 py-2">{children}</th>
);

export const Td = ({ children }: React.PropsWithChildren) => (
  <td className="border border-gray-300 px-4 py-2">{children}</td>
);

export const tableComponents = {
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
};
