import { Property } from "@/types";
import { LayoutGrid } from "lucide-react";
import { ImageCarousel } from "./image-carousel";
import { ImageDialog } from "./image-dialog";
import { Button } from "@/components/ui/button";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function PropertyImageGallery({ property }: { property: Property }) {
    const images = property.media.map((img) => {
        return {
            original: img.original_url,
            thumbnail: img.original_url,
        }
    })
    
    return <div className="bg-muted">
        <ImageGallery showPlayButton={false} items={images} />
    </div>
    
    // return (<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 relative">
    //     <div className='bg-red-50 aspect-[16/9] overflow-hidden rounded-md'>
    //         <img
    //             src={property.media[0].original_url}
    //             alt={`Property image 1`}
    //             className="w-full h-full object-cover"
    //         />
    //     </div>
    //     <div className='grid grid-cols-2 gap-2 aspect-[16/9] overflow-hidden'>
    //         {property.media.slice(1, 5).map((media, index) => (
    //             <div key={index} className="w-full overflow-hidden bg-muted rounded-md">
    //                 <img
    //                     src={media.original_url}
    //                     alt={`Property image ${index + 2}`}
    //                     className="w-full h-full object-cover"
    //                 />
    //             </div>
    //         ))}
    //     </div>
    //     <ImageDialog 
    //         DialogTriggerBtn={<Button variant="default" className='absolute bottom-2 right-0 md:bottom-4 md:right-4 z-10'>
    //                 <LayoutGrid />
    //                 Browse All Images
    //             </Button>}
            
    //         property={property}
    //     />
    // </div>)
}