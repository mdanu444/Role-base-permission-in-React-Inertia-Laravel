import { Head, Link, useForm, usePage } from "@inertiajs/react";

import Pagination from "@/components/Pagination";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Can from "@/hooks/useCan";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types/navigation";



export default function Index() {
    const rolesData = usePage().props.roles;

    // const { data, setData, post, processing, errors } = useForm({
    //     name: "",
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     post('/roles');
    //     setAddRoleDialogOpen(false);
    //     setData({
    //         name: "",
    //     });
    // }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Roles',
            href: '/roles',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Role Content Starts Here */}
                <Card className="flex align-center justify-between">
                    <CardHeader>
                        <CardTitle>Roles</CardTitle>
                        <CardAction >
                            {Can('create roles') && (
                                <Link href={route('roles.create')} className="rounded bg-blue-950 px-2 py-1 shadow text-white text-sm py-2 px-4">Create Role</Link>
                            )}
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        {/* Role table starts here */}
                        <Table>
                            <TableHeader>

                                <TableRow className="bg-slate-500 dark:bg-slate-700">
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Permissions</TableHead>
                                    <TableHead>Created At</TableHead>
                                        {Can('edit roles') || Can('delete roles') ? (
                                    <TableHead>Actions</TableHead>
                                        ): null}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rolesData && rolesData.data.map((data) => (
                                    <TableRow key={data.id} className="odd:bg-slate-100 dark:odd:bg-slate-800">
                                        <TableCell>{data.id}</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell className="flex flex-wrap gap-3">{data.permissions?.map((perm) =>
                                            <span className="bg-green-300 rounded rounded p-1 px-2 shadow cursor-pointer" key={perm.id}>{perm.name}</span>
                                        ) || 'No permissions assigned'}</TableCell>
                                        <TableCell>{new Date(data.created_at).toLocaleDateString('en-GB')}</TableCell>

                                        {Can('edit roles') || Can('delete roles') ? (
                                        <TableCell>
                                            {Can('edit roles') && ( 
                                                <Link title="Click to edit Role." className="font-semibold mr-2 rounded bg-green-400 px-2 py-1 shadow" href={route('roles.edit', data.id)}>Edit</Link>
                                            )}
                                            {Can('delete roles') && (
                                                <Link title="Click to delete Role." className="font-semibold mr-2 rounded bg-red-400 p-1 cursor-pointer" href={route('roles.destroy', data.id)} method="delete" onClick={() => confirm('Are you sure you want to delete this Role?')}>Delete</Link>
                                            )}
                                        </TableCell>
                                        ): null}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* প্যাগিনেশন বাটনগুলো */}
                        <div className="px-4 py-3 border-t">
                            <Pagination links={rolesData.links} />
                        </div>
                        {/* Roles table ends here */}
                    </CardContent>
                </Card>
                {/* Roles content ends here */}
            </div>
        </AppLayout>
    );
}

