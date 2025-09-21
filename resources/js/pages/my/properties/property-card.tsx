import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, XCircle, CheckCircle2 } from 'lucide-react';
import { Property } from "@/types";
import { formatDistanceToNow } from 'date-fns';

type PropertyCardProps = {
    property: Property;
};

export default function PropertyCard({
    property
}: PropertyCardProps) {
    return <Card>
        <CardHeader className='px-4'>
            <CardTitle>{property.title}</CardTitle>
            <CardDescription className="text-xs">{property.short_desc}</CardDescription>
        </CardHeader>
        <CardContent className='px-4'>
            <div className="w-full aspect-[16/9] overflow-hidden rounded-md bg-muted">
                <img
                    src={
                        property.featured_image_id
                            ? property.media.find(media => media.id === property.featured_image_id)?.original_url
                            : property.media[0]?.original_url
                    }
                    alt="House image"
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
                        <Badge variant="default">
                            <CheckCircle2/>
                            <span>Available</span>
                        </Badge> :
                        <Badge variant="secondary" className="not-dark:bg-red-100 dark:bg-red-700">
                            <XCircle className='not-dark:text-red-600 dark:text-red-200'/>
                            <span className='not-dark:text-red-600 dark:text-red-200'>Occupied</span>
                        </Badge>
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
}