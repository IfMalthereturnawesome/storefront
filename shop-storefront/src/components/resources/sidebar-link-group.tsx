interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => React.ReactNode;
  open: boolean;
  toggle: () => void;
}

export default function SidebarLinkGroup({
                                           children,
                                           open,
                                           toggle
                                         }: SidebarLinkGroupProps) {
  return (
      <li className="mb-1">
        {children(toggle, open)}
      </li>
  );
}

