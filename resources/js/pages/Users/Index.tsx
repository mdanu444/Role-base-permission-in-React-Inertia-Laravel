import { Head, Link, useForm, usePage } from "@inertiajs/react";

import Pagination from "@/components/Pagination";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Can from "@/hooks/useCan";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types/navigation";



export default function Index() {
    const usersData = usePage().props.usersData;


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* user Content Starts Here */}
                <Card className="flex align-center justify-between">
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardAction >
                            {Can('create users') && (
                                <Link href={route('users.create')} className="rounded bg-blue-950 px-2 py-1 shadow text-white text-sm py-2 px-4">Create user</Link>
                            )}
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        {/* user table starts here */}
                        <Table>
                            <TableHeader>

                                <TableRow className="bg-slate-500 dark:bg-slate-700">
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Roles</TableHead>
                                    <TableHead>Created At</TableHead>
                                    {Can('edit users') || Can('delete users') ? (<TableHead>Actions</TableHead>):null}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usersData && usersData.data.map((data) => (
                                    <TableRow key={data.id} className="odd:bg-slate-100 dark:odd:bg-slate-800">
                                        <TableCell>{data.id}</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell className="flex flex-wrap gap-3">{data.roles?.map((role) =>
                                            <span className="bg-green-300 rounded rounded p-1 px-2 shadow cursor-pointer" key={role.id}>{role.name}</span>
                                        ) || 'No roles assigned'}</TableCell>
                                        <TableCell>{new Date(data.created_at).toLocaleDateString('en-GB')}</TableCell>
                                        {Can('edit users') || Can('delete users') ? (

                                        <TableCell>

                                            {Can('edit users') && (
                                                <Link title="Click to edit user." className="font-semibold mr-2 rounded bg-green-400 px-2 py-1 shadow" href={route('users.edit', data.id)}>Edit</Link>
                                            )}
                                            {Can('delete users') && (   
                                                <Link title="Click to delete user." className="font-semibold mr-2 rounded bg-red-400 p-1 cursor-pointer" href={route('users.destroy', data.id)} method="delete" onClick={() => confirm('Are you sure you want to delete this user?')}>Delete</Link>
                                            )}
                                        </TableCell>
                                            ): null
                                            }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* প্যাগিনেশন বাটনগুলো */}
                        <div className="px-4 py-3 border-t">
                            <Pagination links={usersData.links} />
                        </div>
                        {/* users table ends here */}
                    </CardContent>
                </Card>
                {/* users content ends here */}
            </div>
        </AppLayout>
    );
}

