export interface INavItem {
  label: string;
  subLabel?: string;
  children?: INavItem[];
  href?: string;
}
