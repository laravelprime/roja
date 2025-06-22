import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import FilterPane from './filter-pane';
import PropertyCard from './property-card';
import { AddProperty } from './add-property-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Properties',
        href: '/landlord/properties',
    }
];

export default function Index() {
    const properties = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Properties" />
            
            <div className="px-4 py-6">
                <Heading title="Properties" description="Manage your properties" />

                <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:justify-between">
                    <FilterPane/>                    

                    <AddProperty/>
                </div>

                <div className='my-4'>
                    {properties.length === 0 ?
                        (<p className="text-muted-foreground text-sm">No properties found.</p>) : 
                        (<p className="text-muted-foreground text-sm">{properties.length} properties available.</p>)
                    }
                </div>

                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    {properties.map((property, ndx) => (
                        <PropertyCard
                            key={ndx} 
                            property={property}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
