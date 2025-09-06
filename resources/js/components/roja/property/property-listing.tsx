import { BreadcrumbItem, FiltersForm, LaravelPaginatedResponse, Property, PropertyFeature } from "@/types"
import FilterPane from "./filter-pane";
import SortByPane from "./sortby-pane";
import PropertyCards from "./property-cards";
import PropertyListingPagination from "./property-listing-pagination";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useForm } from "@inertiajs/react";

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
    const minPrice = 0;
    const maxPrice = 1000;
    const minDeposit = 0;
    const maxDeposit = 1000;
    
    const { data, setData, processing, errors } = useForm<Required<FiltersForm>>({
        propertyType: [],
        city: '',
        neighbourhood: '',
        priceRange: [minPrice, maxPrice],
        depositRange: [minDeposit, maxDeposit],
        features: [],
        sortBy: 'date_posted_newest',
    });
    
    return (<>
        <div className={`pt-4 md:pt-8 ${className}`}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className={`md:grid grid-cols-3 gap-3 py-4 md:py-8 ${className}`}>
            <FilterPane propertyFeatures={propertyFeatures} data={data} setData={setData} processing={processing}/>

            <div className="col-span-2">
                <SortByPane properties={properties} data={data} setData={setData}/>
                <PropertyCards properties={properties}/>
            </div>
        </div>
        <div className={`pt-4 pb-8 md:pt-4 md:pb-8 ${className}`}>
            <PropertyListingPagination properties={properties}/>
        </div>
    </>)   
}