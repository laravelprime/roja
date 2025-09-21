import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { LaravelPaginatedResponse, Property, SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';

import PropertyCard from './property-card';
import PropertyListingPagination from '@/components/roja/property/property-listing-pagination';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Properties',
        href: route('my.properties.index'),
    }
];

interface IndexProps {
    properties: LaravelPaginatedResponse<Property>;
}

export default function Index({
    properties
}: IndexProps) {
    const { flash } = usePage<SharedData>().props

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash.success, flash.error]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Properties" />
            
            <div className="px-4 py-6">
                <Heading title="My Properties" description="Manage your properties" />

                <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:justify-between md:items-center">
                    {/* <FilterPane/> */}
                    <div className='my-4 hidden md:block'>
                        {properties.total === 0 ?
                            (<p className="text-muted-foreground text-sm">No properties found.</p>) : 
                            (<p className="text-muted-foreground text-sm">{properties.total} properties available.</p>)
                        }
                    </div>

                    <Link href={route('my.properties.create')}>
                        <Button variant="default" className='cursor-pointer'>
                            <Plus/>
                            Add Listing
                        </Button>
                    </Link>
                </div>

                <div className='my-4 md:hidden'>
                    {properties.total === 0 ?
                        (<p className="text-muted-foreground text-sm">No properties found.</p>) : 
                        (<p className="text-muted-foreground text-sm">{properties.total} properties available.</p>)
                    }
                </div>

                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {properties.data.map((property) => (
                        <Link href={route('my.properties.edit', property.id)} key={property.id}>
                            <PropertyCard
                                property={property}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-4 pb-6">
                <PropertyListingPagination properties={properties}/>
            </div>
        </AppLayout>
    );
}
