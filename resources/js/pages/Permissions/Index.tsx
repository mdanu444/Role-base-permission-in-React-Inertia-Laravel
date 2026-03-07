import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import InputError from "@/components/input-error";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Field} from "@/components/ui/field";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Can from "@/hooks/useCan";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types/navigation";



export default function Index(){
    const permissionsData = usePage().props.permissions;
    // console.log(permissionsData);

    const {data, setData, post, processing, errors} = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/permissions');
        setAddPermissionDialogOpen(false);
        setData({
            name: "",
        });
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Permissions',
            href: '/permissions',
        },
    ];

    const [AddPermissionDialogOpen, setAddPermissionDialogOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Permission Content Starts Here */}
                <Card className="flex align-center justify-between">
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                    <CardAction >
                        {Can('create permissions') && (
                            <Button variant="default" className="btn cursor-pointer" onClick={() => setAddPermissionDialogOpen(true)}>Create Permission</Button>
                        )}
                    </CardAction>
                    </CardHeader>
                    <hr />
                   <CardContent>
                    {/* Permission table starts here */}
                         <Table>
                            <TableHeader>

                            <TableRow className="bg-slate-500 dark:bg-slate-700">
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Created At</TableHead>
                                {Can('edit permissions') || Can('delete permissions') ? (
                                    <TableHead>Actions</TableHead>
                                ) : null}
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permissionsData && permissionsData.data.map((data) => (
                                <TableRow key={data.id} className="odd:bg-slate-100 dark:odd:bg-slate-800">
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{new Date(data.created_at).toLocaleDateString('en-GB')}</TableCell>
                                            {Can('edit permissions') ||  Can('delete permissions') ? (
                                    <TableCell>
                                        {Can('edit permissions') && ( 
                                                <Link title="Click to edit Permission." className="font-semibold mr-2 rounded bg-green-400 px-2 py-1 shadow" href={route('permissions.edit', data.id)}>Edit</Link>
                                        )}
                                        {Can('delete permissions') && (
                                                <Link title="Click to delete Permission." className="font-semibold mr-2 rounded bg-red-400 p-1 cursor-pointer" href={route('permissions.destroy', data.id)} method="delete"  onClick={() => confirm('Are you sure you want to delete this permission?')}>Delete</Link>
                                        )}
                                    </TableCell>
                                            ): null}
                                </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                         {/* প্যাগিনেশন বাটনগুলো */}
                <div className="px-4 py-3 border-t">
                    <Pagination links={permissionsData.links} />
                </div>
{/* Permissions table ends here */}
                   </CardContent>
                </Card>
{/* Permissions content ends here */}

                {/* Add New permission model starts herer    */}
    <Dialog open={AddPermissionDialogOpen} onOpenChange={()  => setAddPermissionDialogOpen(false)}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button className="hidden" variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create New Permission</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        <FieldGroup>

            <Field>
              <Label htmlFor="name">Permission Name</Label>
              <Input id="name" name="Name" placeholder="Type name here..." defaultValue={data.name} onChange={(e) =>{setData({name: e.target.value})}} aria-invalid={!!errors.name} />
            </Field>
            <InputError message={errors.name} className="mt-2" />
        </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
                    {/* Add New permission model ends here    */}
            </div>
        </AppLayout>
    );
}

