import Heading from "@/components/heading";
import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FiltersForm, PropertyFeature } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FilterPane({
    propertyFeatures,
    className
}: {
    propertyFeatures: PropertyFeature[],
    className?: string
}) {
    const propertyTypes = [{
        value: 'house',
        label: 'House'
    },{
        value: 'room',
        label: 'Room'
    }];

    const minPrice = 0;
        const maxPrice = 5000;
        const minDeposit = 0;
        const maxDeposit = 5000;
        
        const { data, setData, processing, errors } = useForm<Required<FiltersForm>>({
            propertyType: [],
            city: '',
            neighbourhood: '',
            priceRange: [minPrice, maxPrice],
            depositRange: [minDeposit, maxDeposit],
            features: [],
            sortBy: 'date_posted_newest',
        });

    const [isApplyingFilters, setIsApplyingFilters] = useState(false)
    const [isResettingFilters, setIsResettingFilters] = useState(false)

    //initializing the form with default values from url params if any
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const features = [];
        let index = 0;

        while (true) {
            const value = urlParams.get(`features[${index}]`);
            if (value === null) break;
            features.push(Number(value));
            index++;
        }

        const propertyTypes = [];
        let ndx = 0;

        while (true) {
            const value = urlParams.get(`propertyType[${ndx}]`);
            if (value === null) break;
            propertyTypes.push(value);
            ndx++;
        }

        const initialData: Required<FiltersForm> = {
            propertyType: propertyTypes || [],
            city: urlParams.get('city') || '',
            neighbourhood: urlParams.get('neighbourhood') || '',
            priceRange: [
                parseInt(urlParams.get('priceRange[0]') || String(data.priceRange[0]), 10),
                parseInt(urlParams.get('priceRange[1]') || String(data.priceRange[1]), 10)
            ],
            depositRange: [
                parseInt(urlParams.get('depositRange[0]') || String(data.depositRange[0]), 10),
                parseInt(urlParams.get('depositRange[1]') || String(data.depositRange[1]), 10)
            ],
            features: features || [],
            sortBy: urlParams.get('sortBy') || 'date_posted_newest',
        };
        
        setData(initialData);
    },[]);

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

    const applyFilters = (e: React.FormEvent) => {
        setIsApplyingFilters(true)
        e.preventDefault();

        router.get('/properties', prepFilters(data), {replace: true, preserveState: false, preserveScroll: true});
    };

    const resetFilters = () => {
        setIsResettingFilters(true)
        
        router.visit('/properties', {
            method: 'get',
        });
    };
    
    return (
        <div className={`${className} self-start border border-sidebar-border/50 p-3 rounded-xl`}>
            <Heading 
                title="Filter Properties" 
                description="Use the filters below to narrow down your search results."
            />
            <form className="flex flex-col gap-6" onSubmit={applyFilters}>
                <div className="grid gap-6">
                    <div>
                        <Label htmlFor="sortBy">Sort By</Label>
                        <Select
                            value={data.sortBy}
                            onValueChange={(value) => {
                                setData('sortBy', value);
                            }}
                        >
                            <SelectTrigger className="w-full">
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

                    <div className="grid gap-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {propertyTypes.map((propertyType)=>(<div 
                                key={propertyType.value}
                                className="flex items-center space-x-3"
                            >
                                <Checkbox
                                    id={propertyType.value}
                                    name={propertyType.value}
                                    checked={data.propertyType.includes(propertyType.value)}
                                    onClick={() => {
                                        if(data.propertyType.includes(propertyType.value)) {
                                            setData('propertyType', data.propertyType.filter(type => type !== propertyType.value));
                                        }else {
                                            setData('propertyType', [...data.propertyType, propertyType.value]);
                                        }
                                    }}
                                    tabIndex={3}
                                />
                                <Label className="text-muted-foreground" htmlFor={propertyType.value}>{[propertyType.label]}</Label>
                            </div>))}
                        </div>
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            type="city"
                            autoFocus
                            tabIndex={1}
                            autoComplete="city"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            placeholder="Harare, Bulawayo, Mutare etc"
                        />
                        <InputError message={''} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="neighbourhood">Neighbourhood</Label>
                        <Input
                            id="neighbourhood"
                            type="neighbourhood"
                            autoFocus
                            tabIndex={1}
                            autoComplete="neighbourhood"
                            value={data.neighbourhood}
                            onChange={(e) => setData('neighbourhood', e.target.value)}
                            placeholder="Borrowdale, Avondale, etc"
                        />
                        <InputError message={''} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Price Range (USD/month)</Label>
                        </div>
                        <div className="flex space-x-2">
                            <Input 
                                placeholder="MIN" 
                                type="number"
                                value={data.priceRange[0]}
                                onChange={(e) => { setData('priceRange', [
                                    Number(e.target.value),
                                    data.priceRange[1]
                                ])}} 
                            />
                            <Input 
                                placeholder="MAX" 
                                type="number"
                                value={data.priceRange[1]}
                                onChange={(e) => { setData('priceRange', [
                                    data.priceRange[0],
                                    Number(e.target.value)
                                ])}} 
                            />
                        </div>
                        <InputError message={''} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Deposit Range (USD/month)</Label>
                        </div> 
                        <div className="flex space-x-2">
                            <Input 
                                placeholder="MIN" 
                                type="number"
                                value={data.depositRange[0]}
                                onChange={(e) => { setData('depositRange', [
                                    Number(e.target.value),
                                    data.depositRange[1]
                                ])}} 
                            />
                            <Input 
                                placeholder="MAX" 
                                type="number"
                                value={data.depositRange[1]}
                                onChange={(e) => { setData('depositRange', [
                                    data.depositRange[0],
                                    Number(e.target.value)
                                ])}} 
                            />
                        </div>
                        <InputError message={''} />
                    </div>
                    
                    <div className="grid gap-2">
                        <div className="flex items-center mb-2">
                            <Label>Advanced Features</Label>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                            {propertyFeatures.map((feature) => (
                                <div key={feature.id} className="flex items-center space-x-3">
                                    <Checkbox
                                        id={feature.name}
                                        name={feature.name}
                                        checked={data.features.includes(feature.id)}
                                        onClick={() => {
                                            if(data.features.includes(feature.id)) {
                                                setData('features', data.features.filter(feature_id => feature_id !== feature.id));
                                            }else {
                                                setData('features', [...data.features, feature.id]);
                                            }
                                        }}
                                        tabIndex={3}
                                    />
                                    <Label className="text-muted-foreground" htmlFor={feature.name}>{feature.name}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="mt-4 w-full" 
                            tabIndex={4} 
                            disabled={false}
                            onClick={resetFilters}
                        >
                            {processing && isResettingFilters && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Reset
                        </Button>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={false}>
                            {processing && isApplyingFilters && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}