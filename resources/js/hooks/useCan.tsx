import { usePage } from "@inertiajs/react";


export default function Can(permission) {
    const auth = usePage().props.auth;
    const permissions = auth.permissions;
    if (auth && permissions) {        
        return permissions.includes(permission);
    }
    return false;
}