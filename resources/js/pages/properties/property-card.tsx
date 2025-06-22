import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export default function PropertyCard({
    property
}) {
    return <Card>
        <CardHeader className='px-4'>
            <CardTitle>Full House</CardTitle>
            <CardDescription>3 bedroom cottage with shared kitchen and toilet</CardDescription>
        </CardHeader>
        <CardContent className='px-4'>
            <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" alt="House image" />
            <div className='mt-2 flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <p className='text-lg font-semibold'>
                        <span className='text-primary'>
                            $80
                        </span>
                        <span className='ml-1 text-sm font-normal text-muted-foreground'>
                            per month
                        </span>
                    </p>
                    <Badge>Available</Badge>
                    {/* <Badge variant="secondary">Unavailable</Badge> */}
                </div>
                <p className='font-semibold'>
                    <span className='text-primary'>
                        $40
                    </span>
                    <span className='ml-1 text-sm font-normal text-muted-foreground'>
                        deposit
                    </span>
                </p>
                <div className='flex items-center'>
                    <MapPin size={16} className='mr-1'/>
                    <p className='text-sm'>
                        Highfields, Harare
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
}