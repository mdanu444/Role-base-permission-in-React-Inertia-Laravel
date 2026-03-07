
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

export default function Edit() {
    const breadcrumbs = [
        {
            title: 'Permissions',
            href: '/permissions/{id}/edit',
        },
    ];

const { permission } = usePage().props;

    const {data, setData, put, processing, errors} = useForm({
        name: permission.name,
    });
    // console.log(data.name);

    const formHandler = (e) => {
        e.preventDefault();
        put(route('permissions.update', permission.id ));
    }

    return (
        <>
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Permission Content Starts Here */}
                <Card className="flex align-center justify-between">
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                    <CardAction >
                        <Button variant="default">
                            <Link href={route('permissions.index')}>Back to Permissions</Link>
                        </Button>
                    </CardAction>
                    </CardHeader>
                    <hr />
                   <CardContent>
                    {/* Edit Permission Form Starts Here */}
                        <div className="mb-4 w-1/3 mx-auto">
                    <form onSubmit={formHandler}>
                            <label htmlFor="name" className="block  p-2 text-gray-600">Permission Name</label>
                            <input value={data.name} onChange={(e) => setData({...data, name: e.target.value})} type="text" name="name" id="name" className="mt-1 block w-full border mb-3 rounded text-md p-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 " />
                        <Button className="block" type="submit" variant="default">Update Permission</Button>
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
