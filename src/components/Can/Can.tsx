import rules, { TRules, IRule, Role, Permission } from "rbac-rules";
import { useAuth } from "contexts/AuthContext";

const check = (
  rules: TRules<IRule>,
  role: Role,
  action: Permission,
  data: any
) => {
  const roleKey = Object.keys(Role).find(key => Role[key as any] === role);
  const permissions = rules[roleKey as any];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }
    return permissionCondition(data);
  }
  return false;
};

interface CanProps {
  /**
   * A permission the component should check against. Extend the file for rbac-rules.ts as necessary.
   */
  perform: Permission;
  /**
   * Set a role that you want to check the permission for. Usually not necessary, as by default, it will check the currentRole of the user
   */
  role?: Role;
  data?: any;
  /***
   * Pass here a callable object that should be rendered depending on the result of the ACL check.
   * Since most times you probably want to pass a component: () = <MyComponent />
   * TODO(df): Do some benchmarking, since using arrow function could have a negative performance impact here when using many CAN components in a list.
   * Alternative: Pass a "Yes" and "No" Component that should get rendered accordingly
   */
  yes: CallableFunction;
  no?: CallableFunction;
}

/**
 * A RBAC component that checks for a given permission, whether the currents user (default) role has access to this component.
 */
const Can = ({ role, perform, data, yes, no }: CanProps) => {
  const { user } = useAuth();
  if (!role && !user) return null;
  return check(
    rules,
    role || (user && user.currentRole) || Role.VIEWER,
    perform,
    data
  )
    ? yes()
    : (no && no()) || null;
};

export default Can;
