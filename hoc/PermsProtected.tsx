import { decodePerms } from "../perms";
import { getUser } from "blah";

interface IProps {
  permsInt: number;
  children: jsx.Element;
  UnAuthenticatedFallback: jsx.Element;
  UnAuthorizedFallback: jsx.Element;
}
const isSubset = (arr1: any[], arr2: any[]) =>
  arr2.every((i) => arr1.includes(i));

function DefaultUnAuthenticatedFallback() {
  <div>Nö</div>;
}
function DefaultUnAuthorizedFallback() {
  <div>Nope</div>;
}
export default function permsProtected({
  permsInt: requiredPermsInt,
  children,
  UnAuthenticatedFallback = DefaultUnAuthenticatedFallback,
  UnAuthorizedFallback = DefaultUnAuthorizedFallback,
}: IProps) {
  const user = getUser();
  const userPermsInt = user?.permsInt;

  const isAuthenticated = user != null;
  const isAuthorized = isSubset(
    decodePerms(userPermsInt),
    decodePerms(requiredPermsInt)
  );

  if (!isAuthenticated) return UnAuthenticatedFallback;
  if (!isAuthorized) return UnAuthorizedFallback;
  return children;
}
