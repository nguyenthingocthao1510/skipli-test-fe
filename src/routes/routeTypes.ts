export interface RoutesProps {
  path: string;
  element: React.ReactNode;
  name?: string;
  children?: RoutesProps[];
  isPrivate?: boolean;
}
