
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

export default function Edit() {
    const breadcrumbs = [
        {
            title: 'Users',
            href: '/users/{id}/edit',
        },
    ];

const  roles:any = usePage().props.roles;

    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('users.store'));

    }




    return (
        <>
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="role" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Permission Content Starts Here */}
                <Card className="flex align-center justify-between">
                    <CardHeader>
                        <CardTitle>users</CardTitle>
                    <CardAction >
                        <Button variant="default">
                            <Link href={route('users.index')}>Go Back</Link>
                        </Button>
                    </CardAction>
                    </CardHeader>
                    <hr />
                   <CardContent>
                    {/* Edit Permission Form Starts Here */}
                        <div className="mb-4 w-1/3 mx-auto">
                    <form onSubmit={handleSubmit}>
                            <label htmlFor="name" className="block  p-2 text-gray-600">User Name</label>
                            <input value={data.name} type="text" name="name" id="name" className="mt-1 block w-full border mb-3 rounded text-md p-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 " onChange={(e) => setData('name', e.target.value )} />

                            <label htmlFor="email" className="block  p-2 text-gray-600">User Email</label>
                            <input value={data.email} type="email" name="email" id="email" className="mt-1 block w-full border mb-3 rounded text-md p-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 " onChange={(e) => setData('email', e.target.value )} />

                            <label htmlFor="password" className="block  p-2 text-gray-600">User Password</label>
                            <input value={data.password} type="password" name="password" id="password" className="mt-1 block w-full border mb-3 rounded text-md p-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 " onChange={(e) => setData('password', e.target.value )} />

                            <label htmlFor="role" className="block  p-2 text-gray-600">Assign Role</label>
                            <select value={data.role} name="role" id="role" className="mt-1 block w-full border mb-3 rounded text-md p-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 " onChange={(e) => setData('role', e.target.value )}>
                                <option value="">Select Role</option>
                                {roles.map((role: {id:number, name: string}) => (
                                    <option key={role.id} value={role.name}>{role.name}</option>
                                ))}
                            </select>
                            <Button type="submit" disabled={processing}>Create</Button>
                    </form>
                        </div>
                   </CardContent>
                   </Card>
            </div>
        </AppLayout>
        </>
    )
}
