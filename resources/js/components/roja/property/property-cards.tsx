import { LaravelPaginatedResponse, Property, PropertyFeature } from "@/types";
import PropertyCard from "./property-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FilterPane from "./filter-pane";

export default function PropertyCards({
    properties,
    propertyFeatures
}: {
    properties: LaravelPaginatedResponse<Property>,
    propertyFeatures: PropertyFeature[]
}) {
    return (
        <>
            <div className="flex items-center justify-between border border-sidebar-border/50 p-3 rounded-xl max-md:mt-4 mb-4 w-full">
                <div>
                    {properties.total === 0 ? 
                        (<p className="text-muted-foreground text-sm">No properties found.</p>) : 
                        (<p className="text-muted-foreground text-sm">{properties.total} properties available.</p>)
                    }
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">Filter</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] h-[90vh] p-0 overflow-hidden">
                        <div className="w-full h-full overflow-auto scrollba">
                            <FilterPane propertyFeatures={propertyFeatures} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.data.map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </>
    );
}