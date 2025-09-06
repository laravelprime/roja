import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { router } from "@inertiajs/react";

import { FiltersForm, LaravelPaginatedResponse, Property } from "@/types";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export default function SortByPane({
    properties,
    data,
    setData
}: {
    properties: LaravelPaginatedResponse<Property>,
    data: FiltersForm,
    setData: any
}) {
    // Helper to prepare filters for router.get
    function prepFilters(filters: FiltersForm) {
        return {
            propertyType: filters.propertyType,
            city: filters.city,
            neighbourhood: filters.neighbourhood,
            priceRange: filters.priceRange,
            depositRange: filters.depositRange,
            features: filters.features,
            sortBy: filters.sortBy
        };
    }

    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border border-sidebar-border/50 p-3 rounded-xl max-md:mt-4 mb-4 w-full">
            <div>
                {properties.total === 0 ? 
                    (<p className="text-muted-foreground text-sm">No properties found.</p>) : 
                    (<p className="text-muted-foreground text-sm">{properties.total} properties available.</p>)
                }
            </div>
            <div className="flex items-center gap-2">
                <Label>Sortby:</Label>
                <Select
                    value={data.sortBy}
                    onValueChange={(value) => {
                        setData('sortBy', value);
                    }}
                >
                    <SelectTrigger className="w-[12rem]">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rent_low_to_high">Rent: Low to High</SelectItem>
                        <SelectItem value="rent_high_to_low">Rent: High to Low</SelectItem>
                        <SelectItem value="date_posted_newest">Date Posted: Newest</SelectItem>
                        <SelectItem value="date_posted_oldest">Date Posted: Oldest</SelectItem>
                        <SelectItem value="neighbourhood_az">Neighbourhood: A-Z</SelectItem>
                        <SelectItem value="neighbourhood_za">Neighbourhood: Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}