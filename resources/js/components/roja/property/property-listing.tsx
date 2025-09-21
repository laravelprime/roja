import { BreadcrumbItem, FiltersForm, LaravelPaginatedResponse, Property, PropertyFeature } from "@/types"
import PropertyCards from "./property-cards";
import PropertyListingPagination from "./property-listing-pagination";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface PropertyListingProps {
    properties: LaravelPaginatedResponse<Property>,
    propertyFeatures: PropertyFeature[];
    className?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Properties',
        href: route('properties.index'),
    }
];

export default function PropertyListing({properties, propertyFeatures, className}: PropertyListingProps) {
    return (<>
        <div className={`pt-4 md:pt-8 ${className}`}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className={`flex flex-col space-y-3 py-4 md:py-8 ${className}`}>
            <PropertyCards 
                properties={properties} 
                propertyFeatures={propertyFeatures}
            />
        </div>
        <div className={`pt-4 pb-8 md:pt-4 md:pb-8 ${className}`}>
            <PropertyListingPagination properties={properties}/>
        </div>
    </>)   
}