import { LaravelPaginatedResponse, Property } from "@/types";
import PropertyCard from "./property-card";

export default function PropertyCards({properties}: {properties: LaravelPaginatedResponse<Property>}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {properties.data.map((property) => (
                <PropertyCard key={property.id} property={property}/>
            ))}
        </div>
    );
}