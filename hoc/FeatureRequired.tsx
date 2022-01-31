enum Feature {
  LocalStorage = 1,
  Cookies = 2,
}
interface IProps {
  feature: Feature[];
  children: JSX.Element;
  UnAvailableFallback: JSX.Element;
}
const isSubset = (arr1: any[], arr2: any[]) =>
  arr2.every((i) => arr1.includes(i));

const DefaultUnAvailableFallback = <div>Nö</div>;

export default function permsProtected({
  feature,
  children,
  UnAvailableFallback = DefaultUnAvailableFallback,
}: IProps) {
  const isAvailable = false;

  if (!isAvailable) return UnAvailableFallback;
  return children;
}
