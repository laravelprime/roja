import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from '@/components/ui/badge';
import { MapPin, Building2 } from 'lucide-react';
import { Property } from "@/types";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "@inertiajs/react";

type PropertyCardProps = {
    property: Property;
};

export default function PropertyCard({
    property
}: PropertyCardProps) {
    return <a href={route('properties.show', property.id)} className="no-underline">
        <Card>
            <CardHeader className='px-4'>
                <CardTitle>{property.title}</CardTitle>
                <CardDescription className="text-xs">{property.short_desc}</CardDescription>
            </CardHeader>
            <CardContent className='px-4'>
                <div className="w-full aspect-[16/9] overflow-hidden rounded-md bg-muted">
                    <img
                        src={property.featuredImage ? property.featuredImage.original_url : property.media[0].original_url}
                        alt={`${property.type} image`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className='mt-2 flex flex-col gap-2'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-semibold'>
                            <span className='text-primary'>
                                ${property.rent}
                            </span>
                            <span className='ml-1 text-sm font-normal text-muted-foreground'>
                                per month
                            </span>
                        </p>
                        {property.rental_status === 'available' ?
                            <Badge variant="default">Available</Badge> :
                            <Badge variant="secondary">Occupied</Badge>
                        }
                    </div>
                    <div className="flex items-center justify-between">
                        <p className='font-semibold'>
                            <span className='text-primary'>
                                ${property.deposit}
                            </span>
                            <span className='ml-1 text-sm font-normal text-muted-foreground'>
                                deposit
                            </span>
                        </p>
                        <div className='flex items-center'>
                            <Building2 size={16} className='mr-1'/>
                            <p className='text-sm'>
                                {property.city}
                            </p>
                        </div>
                    </div>
                    
                    <div className='flex items-center'>
                        <MapPin size={16} className='mr-1'/>
                        <p className='text-sm'>
                            {property.neighbourhood}
                        </p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Listed {formatDistanceToNow(new Date(property.created_at), { addSuffix: true })}
                    </p>
                </div>
            </CardContent>
        </Card>
    </a>
}