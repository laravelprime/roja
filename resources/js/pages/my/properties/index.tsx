import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { LaravelPaginatedResponse, Property, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';

import FilterPane from './filter-pane';
import PropertyCard from './property-card';
import PropertyListingPagination from '@/components/roja/property/property-listing-pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Properties',
        href: route('my.properties.index'),
    }
];

interface IndexProps {
    properties: LaravelPaginatedResponse<Property>;
    // propertyFeatures: PropertyFeature[];
}

export default function Index({
    properties
}: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Properties" />
            
            <div className="px-4 py-6">
                <Heading title="Properties" description="Manage your properties" />

                <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:justify-between">
                    <FilterPane/>                    

                    <Link href={route('my.properties.create')}>
                        <Button variant="default" className='cursor-pointer'>
                            <Plus/>
                            Add Listing
                        </Button>
                    </Link>
                </div>

                <div className='my-4'>
                    {properties.total === 0 ?
                        (<p className="text-muted-foreground text-sm">No properties found.</p>) : 
                        (<p className="text-muted-foreground text-sm">{properties.total} properties available.</p>)
                    }
                </div>

                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {properties.data.map((property) => (
                        <Link href={route('my.properties.show', property.id)} key={property.id}>
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
