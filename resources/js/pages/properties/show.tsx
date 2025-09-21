import Heading from '@/components/heading';
import {Property, type BreadcrumbItem } from '@/types';
import NavBar from '@/components/roja/nav-bar';
import Footer from '@/components/roja/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import HeadingSmall from '@/components/heading-small';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import PropertyImageGallery from '@/components/roja/property/property-image-gallery';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Properties',
        href: route('properties.index'),
    }
];

interface ShowProps {
    property: Property;
}

export default function Show({
    property
}: ShowProps) {
    const propertyBreadcrumbs = [
        ...breadcrumbs,
        {
            title: property.title,
            href: `/landlord/properties/${property.id}`
        }
    ];

    return (
        <div>
            <Head title={property.title} />
            <NavBar className='px-2 sm:px-4 md:px-16 lg:px-24'/>

            <div className={`py-4 md:py-8 px-2 sm:px-4 md:px-16 lg:px-24`}>
                <Breadcrumbs breadcrumbs={propertyBreadcrumbs} />
            </div>

            <div className="px-2 sm:px-4 md:px-16 lg:px-24">
                <Heading title={property.title} description={property.short_desc} />
                
                <PropertyImageGallery property={property} />

                <div className='md:grid grid-cols-3 my-4 md:my-8'>
                    <div className='md:col-span-2'>
                        <Heading title={`${property.type === 'house' ? 'Full House to rent' : 'Room to rent'} located in ${property.neighbourhood}, ${property.city}.`} />
                        
                        <div className="mt-4 inline-flex gap-2">
                            <HeadingSmall title="Availabitity Status"/>
                            {property.rental_status === 'available' ?
                                <Badge variant="default">Available</Badge> :
                                <Badge variant="secondary">Unavailable</Badge>
                            }
                        </div>

                        <div className="mt-4">
                            <HeadingSmall title="Suitable For" description={property.suitable_for}/>
                        </div>

                        <div className="mt-4">
                            <HeadingSmall title="Availability Date" description={property.availability_date}/>
                        </div>
                        
                        <div className="mt-4">
                            <HeadingSmall title="Description"/>
                            {property.description}
                        </div>
                        <div className='mt-4'>
                            <HeadingSmall title="Property Features"/>
                            <ul className="list-disc pl-5 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {property.features.map((feature) => (
                                    <li key={feature.id} className="text-muted-foreground">
                                        {feature.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='self-start max-md:hidden md:col-span-1 p-2 md:p-4 rounded-md border border-sidebar-border/50'>    
                        <div className="mb-4 grid grid-cols-2 items-center gap-2">
                            <p className="text-lg font-semibold">
                                Rent: <span className="text-primary">${property.rent}</span>
                            </p>
                            <p className="text-muted-foreground">
                                Deposit: ${property.deposit}
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">For inquiries, please contact the landlord.</p>
                        <div className='grid grid-cols-2 gap-2'>
                            <a href={`tel:${property.cell_number.split(' ').join('')}`} target="_blank" className="hover:underline">
                                <Button variant="secondary" className="w-full">
                                    <Phone className="mr-2" />
                                    Call
                                </Button>
                            </a>
                            <a href={`https://wa.me/${property.whatsapp_number.split(' ').join('')}??text=I'm%20inquiring%20about%20the%20property%20listing`} target="_blank" className="text-blue-600 hover:underline">
                                <Button variant="default" className="w-full">
                                    <FaWhatsapp size={24} className=""/>
                                    Whatspp
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* For small screen */}
                    <div className='md:hidden pointer-events-none fixed w-full h-full top-0 left-0 z-20'>
                        <div className='absolute pointer-events-auto bottom-0 left-0 p-2 bg-background w-full shadow-lg rounded-md border border-sidebar-border/50'>    
                            <div className="mb-4 grid grid-cols-2 items-center gap-2">
                                <p className="text-lg font-semibold">
                                    Rent: <span className="text-primary">${property.rent}</span>
                                </p>
                                <p className="text-muted-foreground">
                                    Deposit: ${property.deposit}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">For inquiries, please contact the landlord.</p>
                            <div className='grid grid-cols-2 gap-2'>
                                <a href={`tel:${property.cell_number.split(' ').join('')}`} target="_blank" className="text-blue-600 hover:underline">
                                    <Button variant="secondary" className="w-full">
                                        <Phone className="mr-2" />
                                        Call
                                    </Button>
                                </a>
                                <a href={`https://wa.me/${property.whatsapp_number.split(' ').join('')}?text=I'm%20inquiring%20about%20the%20property%20listing`} target="_blank" className="text-blue-600 hover:underline">
                                    <Button variant="default" className="w-full">
                                        <FaWhatsapp size={24} className=""/>
                                        Whatspp
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer className='px-2 sm:px-4 md:px-16 lg:px-24'/>
        </div>
    );
}
