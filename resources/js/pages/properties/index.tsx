import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { LaravelPaginatedResponse, Property, PropertyFeature, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';
import PropertyCard from '../my/properties/property-card';
import NavBar from '@/components/roja/nav-bar';
import MainMenu from '@/components/roja/mobile-menu';
import Footer from '@/components/roja/footer';
import PropertyListing from '@/components/roja/property/property-listing';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Properties',
        href: '/landlord/properties',
    }
];

interface IndexProps {
    properties: LaravelPaginatedResponse<Property>;
    propertyFeatures: PropertyFeature[];
}

export default function Index({
    properties,
    propertyFeatures
}: IndexProps) {
    return (
        <div>
            <Head title="Properties" />
            <NavBar className='px-2 sm:px-4 md:px-16 lg:px-24'/>

            <PropertyListing 
                className='px-2 sm:px-4 md:px-16 lg:px-24'
                properties={properties}
                propertyFeatures={propertyFeatures}
            />

            <Footer className='px-2 sm:px-4 md:px-16 lg:px-24'/>
        </div>
    );
}
