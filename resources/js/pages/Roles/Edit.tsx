
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

export default function Edit() {
    const breadcrumbs = [
        {
            title: 'Roles',
            href: '/roles/{id}/edit',
        },
    ];

const  permissions = usePage().props.permissions;

    const role = usePage().props.role;

    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions.map(permission => ({ id: permission.id})),
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('roles.update', role.id));

    }

    function handleToggle(perm: { id: number; name: string }) {
    // perm হলো লারাভেল থেকে আসা একটি অবজেক্ট {id: 1, name: '...'}
    const currentPermissions = [...data.permissions];

    // চেক করা হচ্ছে এই আইডির কোনো অবজেক্ট অলরেডি অ্যারেতে আছে কি না
    const index = currentPermissions.findIndex(item => item.id === perm.id);

    if (index > -1) {
        // যদি থাকে, তবে ওই ইনডেক্স থেকে অবজেক্টটি সরিয়ে দাও
        currentPermissions.splice(index, 1);
    } else {
        // যদি না থাকে, তবে পুরো অবজেক্টটি (id এবং name সহ) যোগ করো
        currentPermissions.push({
            id: perm.id,
        });
    }

    // স্টেট আপডেট
    setData('permissions', currentPermissions);
}


    return (
        <>
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Permission Content Starts Here */}
                <Card className="flex align-center justify-between">
                    <CardHeader>
                        <CardTitle>Roles</CardTitle>
                    <CardAction >
                        <Button variant="default">
                            <Link href={route('roles.index')}>Go Back</Link>
                        </Button>
                    </CardAction>
                    </CardHeader>
                    <hr />
                   <CardContent>
                    {/* Edit Permission Form Starts Here */}
                        <div className="mb-4 w-1/3 mx-auto">
                    <form onSubmit={handleSubmit}>
                            <label htmlFor="name" className="block  p-2 text-gray-600">Role Name</label>
                            <input value={data.name} type="text" name="name" id="name" className="mt-1 block w-full border mb-3 rounded text-md p-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 " onChange={(e) => setData({...data, name: e.target.value })} />

                            <br />
                            <span className="font-bold">Select Permisions for the role.</span>
                            <div className="flex flex-wrap gap-4 bg-amber-100 p-4 rounded">
                            {permissions.map((permission: { id: number; name: string }) => (
                            <span key={permission.id} className="flex items-center mb-2">
                                <input
                                    onChange={() => handleToggle(permission)}
                                    // এখানে (p) হলো অবজেক্ট, তাই p.id দিয়ে চেক করতে হবে
                                    checked={data.permissions.some((p: any) => p.id === permission.id)}
                                    type="checkbox"
                                    id={`permission-${permission.id}`}
                                    name="permissions[]"
                                    value={permission.id}
                                    className="mr-2"
                                />
                                <label htmlFor={`permission-${permission.id}`} className="text-gray-700">
                                    {permission.name}
                                </label>
                            </span>
                        ))}
                            </div>
                            <br />
                            <Button type="submit" disabled={processing}>Update</Button>
                    </form>
                        </div>
                    {/* Edit Permission Form Ends Here */}
                   </CardContent>
                   </Card>
            </div>
        </AppLayout>
        </>
    )
}
