import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { router, useForm } from "@inertiajs/react";
import { PropertyFilters, PropertyType, SortByOption, Status } from "@/types";
import { useEffect, useState } from "react";

export default function FilterPane(){
    const params = new QueryParamsHelper()
    
    const [filterParams, setFilterParams] = useState<Required<PropertyFilters>>({
        propertyType: params.getArrayParam('propertyType') as PropertyType,
        status: params.getArrayParam('status') as Status,
        city: params.getStringParam('city'),
        neighbourhood: params.getStringParam('neighbourhood'),
        rentRange: {
            min: 0,
            max: 0,
        },
        depositRange: {
            min: 0,
            max: 0,
        },
        availabilityType: 'now',
        availableFromDate: '',
        availableToDate: '',
        suitableFor: 'Any',
        hasParking: false,
        hasWiFi: false,
        hasSecurity: false,
        hasGarden: false,
        hasSolarPower: false,
        hasBorehole: false,

        sortBy: (params.getStringParam('sortBy') ? params.getStringParam('sortBy') : 'date_posted_newest') as SortByOption
    });

    return <div className="flex justify-between space-x-2 w-full md:w-auto">
        <Select
            value={filterParams.sortBy}
            onValueChange={(value) => {
                const updatedParams = {
                    ...filterParams,
                    ['sortBy'] : value as SortByOption
                }
                setFilterParams(updatedParams)
                router.get(route('landlord.properties.index'), prepFilters(updatedParams))
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

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    Filter
                    <Filter/>
                </Button>
            </DialogTrigger>
            <DialogContent className="pr-0">
                <div className="h-96 pr-4 overflow-auto" style={{ scrollbarWidth: 'thin' }}>
                <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                    <DialogDescription>
                        Use the filters below to narrow down your search results.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <div className="text-sm font-[500] mb-2">Property Type</div>
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center space-x-3">
                                <Checkbox 
                                    id="house"
                                    checked={filterParams.propertyType.includes('house') ? true : false} 
                                    onCheckedChange={(checked) => {
                                        let updatedParams = filterParams;
                                        if(checked === true && !filterParams.propertyType.includes('house')) {
                                            updatedParams = {
                                                ...filterParams,
                                                ['propertyType'] : [...filterParams.propertyType, 'house']
                                            }
                                        } else if (checked === false && filterParams.propertyType.includes('house')) {
                                            updatedParams = {
                                                ...filterParams,
                                                ['propertyType'] : filterParams.propertyType.filter(type => type !== 'house')
                                            }
                                        }
                                        setFilterParams(updatedParams)
                                        router.get(route('landlord.properties.index'), prepFilters(updatedParams))
                                    }}
                                />
                                <Label htmlFor="house">House</Label>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Checkbox 
                                    id="room"
                                    checked={filterParams.propertyType.includes('room') ? true : false} 
                                    onCheckedChange={(checked) => {
                                        let updatedParams = filterParams;
                                        if(checked === true && !filterParams.propertyType.includes('room')) {
                                            updatedParams = {
                                                ...filterParams,
                                                ['propertyType'] : [...filterParams.propertyType, 'room']
                                            }
                                        } else if (checked === false && filterParams.propertyType.includes('room')) {
                                            updatedParams = {
                                                ...filterParams,
                                                ['propertyType'] : filterParams.propertyType.filter(type => type !== 'room')
                                            }
                                        }
                                        setFilterParams(updatedParams)
                                        router.get(route('landlord.properties.index'), prepFilters(updatedParams))
                                    }}
                                />
                                <Label htmlFor="room">Room</Label>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <div className="text-sm font-[500] mb-2">Status</div>
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center space-x-3">
                                <Checkbox 
                                    id="available"
                                    checked={filterParams.status.includes('available') ? true : false} 
                                    onCheckedChange={(checked) => {
                                        let updatedParams = filterParams;
                                        if(checked === true && !filterParams.status.includes('available')) {
                                            updatedParams = {
                                                ...filterParams,
                                                ['status'] : [...filterParams.status, 'available']
                                            }
                                        } else if (checked === false && filterParams.status.includes('available')) {
                                            updatedParams = {
                                                ...filterParams,
                                                ['status'] : filterParams.status.filter(type => type !== 'available')
                                            }
                                        }
                                        setFilterParams(updatedParams)
                                        router.get(route('landlord.properties.index'), prepFilters(updatedParams))
                                    }}
                                />
                                <Label htmlFor="available">Available</Label>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Checkbox 
                                    id="rented"
                                    checked={filterParams.status.includes('rented') ? true : false} 
                                    onCheckedChange={(checked) => {
                                        let updatedParams = filterParams;
                                        if(checked === true && !filterParams.status.includes('rented')) {
                                            updatedParams = {
                                                ...filterParams,
                                                ['status'] : [...filterParams.status, 'rented']
                                            }
                                        } else if (checked === false && filterParams.status.includes('rented')) {
                                            updatedParams = {
                                                ...filterParams,
                                                ['status'] : filterParams.status.filter(type => type !== 'rented')
                                            }
                                        }
                                        setFilterParams(updatedParams)
                                        router.get(route('landlord.properties.index'), prepFilters(updatedParams))
                                    }}
                                />
                                <Label htmlFor="rented">Rented</Label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="city">City</Label>
                        <Input 
                            id="city" 
                            name="city" 
                            type="text"
                            value={filterParams.city}
                            onChange={(e)=>{
                                const updatedParams = {
                                    ...filterParams,
                                    ['city'] : e.currentTarget.value
                                }

                                setFilterParams(updatedParams)
                            }}
                            onBlur={(e)=>{
                                router.get(route('landlord.properties.index'), prepFilters(filterParams))
                            }} 
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="neighbourhood">Neighbourhood</Label>
                        <Input 
                            id="neighbourhood" 
                            name="neighbourhood"
                            value={filterParams.neighbourhood}
                            onChange={(e)=>{
                                const updatedParams = {
                                    ...filterParams,
                                    ['neighbourhood'] : e.currentTarget.value
                                }

                                setFilterParams(updatedParams)
                            }}
                            onBlur={(e)=>{
                                router.get(route('landlord.properties.index'), prepFilters(filterParams))
                            }}  
                        />
                    </div>
                </div>
                <div>
                    <div className="text-sm font-[500] mb-2">Rent Range</div>
                    <ul className="grid grid-cols-2 gap-2">
                        <li className="flex items-center space-x-3">
                            <Label htmlFor="house">Min</Label>
                            <Input id=""/>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Label htmlFor="house">Max</Label>
                            <Input id=""/>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="text-sm font-[500] mb-2">Deposit Range</div>
                    <ul className="grid grid-cols-2 gap-2">
                        <li className="flex items-center space-x-3">
                            <Label htmlFor="house">Min</Label>
                            <Input id=""/>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Label htmlFor="house">Max</Label>
                            <Input id=""/>
                        </li>
                    </ul>
                </div>
                <DialogFooter>
                    <div className="flex justify-between w-full">
                    <Button variant="outline">
                        Reset
                    </Button>
                        <div className="flex space-x-2">
                            <DialogClose asChild>
                                <Button>Cancel</Button>
                            </DialogClose>
                            {/* <Button 
                                onClick={() => {
                                    // const newUrl = `${window.location.pathname}?${params.toString()}`;
                                    // router.get(newUrl);
                                }}
                            >Apply</Button> */}
                        </div>    
                    </div>
                    
                </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>

        {/* <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="default">
                    Filter
                    <Filter/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[400px]">
                <DropdownMenuLabel>Basic Filters</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span className="whitespace-nowrap">Property Type:</span>
                        <Input type="checkbox" className="w-4 h-4 ml-2" /> House
                        <Input type="checkbox" className="w-4 h-4 ml-2" /> Room
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className="whitespace-nowrap">Property Status:</span>
                        <Input type="checkbox" className="w-4 h-4 ml-2" /> Available
                        <Input type="checkbox" className="w-4 h-4 ml-2" /> Rented
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className="whitespace-nowrap">City:</span> 
                        <Input type="checkbox" className="w-4 h-4 ml-2" /> Harare
                        <Input type="checkbox" className="w-4 h-4 ml-2" /> Bulawayo
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className="whitespace-nowrap">Neighbourhood:</span> 
                        <Input type="text" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Price Range</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span className="whitespace-nowrap">Min Rent (USD):</span> 
                        <Input type="text" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className="whitespace-nowrap">Max Rent (USD):</span> 
                        <Input type="text" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className="whitespace-nowrap">Min Deposit (USD):</span> 
                        <Input type="text" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className="whitespace-nowrap">Max Deposit (USD):</span> 
                        <Input type="text" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-end">
                    <Button variant="outline" size="sm" className="mr-2">Reset</Button>
                    <Button variant="default" size="sm">Apply Filters</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> */}
    </div>
}

function prepFilters(filters: Record<string, any>): Record<string, any> {
    const cleaned: Record<string, any> = {};

    for (const key in filters) {
        const value = filters[key];

        if (Array.isArray(value) && value.length > 0) {
            cleaned[key] = value.join(',');
        } else if (typeof value === 'boolean' && value) {
            cleaned[key] = value;
        } else if (typeof value === 'number' && value !== 0) {
            cleaned[key] = value;
        } else if (typeof value === 'string' && value !== '') {
            cleaned[key] = value;
        } else if (typeof value === 'object' && value !== null) {
            const nested = prepFilters(value);
            if (Object.keys(nested).length > 0) {
                cleaned[key] = nested;
            }
        }
    }

    return cleaned;
}

class QueryParamsHelper {
    private params: URLSearchParams;

    constructor() {
        this.params = new URLSearchParams(window.location.search);
    }

    public getStringParam(key: string): string {
        return this.params.get(key) ? this.params.get(key) as string : ''
    }

    public getBooleanParam(key: string): boolean {
        return this.params.get(key) === 'true';
    }

    public getNumberParam(key: string): number {
        const val = this.params.get(key);
        return val ? Number(val) : 0;
    }

    public getArrayParam(key: string): string[] {
        const val = this.params.get(key);
        return val ? val.split(',') : [];
    }
}