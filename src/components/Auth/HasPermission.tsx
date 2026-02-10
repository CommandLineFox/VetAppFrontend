import {Permission} from "../../constants/permissions.constants";
import {useAuthContext} from "../../context/AuthContext";

interface HasPermissionProps {
    requiredPermission: Permission;
    children: React.ReactNode;
}

export const HasPermission: React.FC<HasPermissionProps> = ({ requiredPermission, children }) => {
    const { permissions, isAuthenticated } = useAuthContext();

    const hasAccess = isAuthenticated && (permissions.includes(requiredPermission) || permissions.includes('ADMIN'));

    if (!hasAccess) {
        return null;
    }

    return <>{children}</>;
};