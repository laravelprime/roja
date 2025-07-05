import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from 'lucide-react';

import FileUpload from "./file-upload";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type PropertyForm = {
    title: string;
    short_desc: string;
    description: string;
    city: string;
    neighbourhood: string;
    type: string;
    rent: number|string; // Use string to handle empty input
    deposit: number|string; // Use string to handle empty input
    suitable_for: string;
    availability_date: string;
    status: string;
    contact_number: string;
    features: string[];
    imageIds: {
        id: string;
        serverId: string;
    }[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Properties',
        href: '/landlord/properties',
    },
    {
        title: 'Add Property',
        href: '/landlord/properties/create',
    }
];

export default function Index() {
    const [feature, setFeature] = useState('')
    const {data, setData, processing, errors, post, reset} = useForm<Required<PropertyForm>>({
        title: '',
        short_desc: '',
        description: '',
        city: '',
        neighbourhood: '',
        type: '',
        rent: '',
        deposit: '',
        suitable_for: '',
        availability_date: '',
        status: '',
        contact_number: '',
        features: [],
        imageIds: [],
    })

    const handleProcess = (error: any, file: any) => {
        if (error) {
            console.error('Upload failed', error);
            return;
        }      

        const fileId = {
            id: file.id,
            serverId: file.serverId,
        };
        setData('imageIds', [...data.imageIds, fileId]);
    };

    const handleRemove = (file: any) => {
        const removedId = file.id;
        setData(
            'imageIds',
            data.imageIds.filter(imgObj => imgObj.id !== removedId)
        );
        return true;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        post(route('landlord.properties.store'),{
            onSuccess: () => {
                reset()
            }
        });
    }

    const addFeature = () => {
        if (!feature.trim()) {
            return; // Do not add empty features
        }
        setData('features', [...data.features, feature]);
    }

    const removeFeature = (index: number) => {
        const updatedFeatures = data.features.filter((_, i) => i !== index);
        setData('features', updatedFeatures);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Property" />
            
            <div className="px-4 py-6">
                <Heading title="Add Property" description="Add your property's title, type, price and features" />

                <form onSubmit={submit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input 
                                id="title" 
                                name="title"
                                type="text"
                                // required
                                autoFocus
                                autoComplete="title"
                                value={data.title}
                                onChange={ e => { setData('title', e.target.value) }} 
                                disabled={processing}
                                placeholder="e.g. 3 Bedroom House"
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="short_desc">Short Description</Label>
                            <Input 
                                id="short_desc" 
                                name="short_desc"
                                type="text"
                                // required
                                autoFocus
                                autoComplete="short_desc"
                                value={data.short_desc}
                                onChange={ e => { setData('short_desc', e.target.value) }} 
                                disabled={processing}
                                placeholder="e.g. 3 Bedroom House in Avondale with Garden"
                            />
                            <InputError message={errors.short_desc} className="mt-2" />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description" 
                                name="description"
                                // required
                                autoFocus
                                autoComplete="description"
                                onChange={ e => { setData('description', e.target.value) }} 
                                disabled={processing}
                                placeholder="e.g This is a beautiful 3 bedroom house with a spacious garden and modern amenities." 
                                defaultValue={data.description}
                            ></Textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="neighbourhood">Neighbourhood</Label>
                                <Input 
                                    id="neighbourhood" 
                                    name="neighbourhood"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="neighbourhood"
                                    value={data.neighbourhood}
                                    onChange={ e => { setData('neighbourhood', e.target.value) }} 
                                    disabled={processing}
                                    placeholder="e.g. Avondale, Borrowdale, etc."
                                />
                                <InputError message={errors.neighbourhood} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="city">City</Label>
                                <Input 
                                    id="city" 
                                    name="city"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="city"
                                    value={data.city}
                                    onChange={ e => { setData('city', e.target.value) }} 
                                    disabled={processing}
                                    placeholder="e.g. Harare, Bulawayo, etc."
                                />
                                <InputError message={errors.city} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="rent">Rent (USD)</Label>
                                <Input 
                                    id="rent" 
                                    name="rent"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="rent"
                                    value={data.rent}
                                    onChange={ e => { setData('rent', e.target.value === '' ? '' : parseFloat(e.target.value)) }} 
                                    disabled={processing}
                                    placeholder="e.g. 150, 300 etc."
                                />
                                <InputError message={errors.rent} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="deposit">Deposit (USD)</Label>
                                <Input 
                                    id="deposit" 
                                    name="deposit"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="deposit"
                                    value={data.deposit}
                                    onChange={ e => { setData('deposit', e.target.value === '' ? '' : parseFloat(e.target.value)) }} 
                                    disabled={processing}
                                    placeholder="e.g. 0, 150 etc."
                                />
                                <InputError message={errors.deposit} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="suitable_for">Suitable For</Label>
                                <Input 
                                    id="suitable_for" 
                                    name="suitable_for"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="suitable_for"
                                    value={data.suitable_for}
                                    onChange={ e => { setData('suitable_for', e.target.value) }} 
                                    disabled={processing}
                                    placeholder="Single Male, Female, Couple, Family, Anyone"
                                />
                                <InputError message={errors.suitable_for} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="availability">Availability Date</Label>
                                <Input 
                                    id="availabilityDate" 
                                    name="availabilityDate"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="availabilityDate"
                                    value={data.availability_date}
                                    onChange={ e => { setData('availability_date', e.target.value) }} 
                                    disabled={processing}
                                    placeholder="Now or Future Date"
                                />
                                <InputError message={errors.availability_date} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="status">Status</Label>

                                <Select
                                    onValueChange={(value) => { setData('status', value); }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">available</SelectItem>
                                        <SelectItem value="rented">rented</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="contact_number">Contact Number</Label>
                                <Input 
                                    id="contact_number" 
                                    name="contact_number"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="contact_number"
                                    value={data.contact_number}
                                    onChange={ e => { setData('contact_number', e.target.value) }} 
                                    disabled={processing}
                                    placeholder="Preferably Whatsapp No."
                                />
                                <InputError message={errors.contact_number} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="type">Property Type</Label>
                                <Select
                                    onValueChange={(value) => { setData('type', value); }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Property Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="room">room</SelectItem>
                                        <SelectItem value="house">house</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="feature">Features</Label>
                            <div className="flex gap-2 lg:w-1/2">
                                <Input 
                                    id="feature" 
                                    name="feature"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="feature"
                                    value={feature}
                                    onChange={ e => { setFeature(e.target.value) }} 
                                    disabled={processing}
                                />
                                <Button onClick={addFeature} type="button" disabled={processing}>
                                    <Plus />
                                </Button>
                            </div>
                            <InputError message={errors.features} className="mt-2" />
                            <ul className="list-disc pl-5">
                                {data.features.map((feature, index) => (
                                    <li key={index} className="text-sm text-muted-foreground">
                                        <div className="flex items-center">
                                            {feature}
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="ml-1"
                                                onClick={() => removeFeature(index)}
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                        <InputError message={errors[`features.${index}`]} className="mt-2" />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="description">Images of the Property</Label>
                            <p className="text-muted-foreground text-sm">At least 1 image of your property</p>
                            <FileUpload handleProcess={handleProcess} handleRemove={handleRemove}/>
                            <InputError message={errors.imageIds} className="mt-2" />
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-2 mt-4'>
                        <Button 
                            variant="outline"
                            onClick={() => {
                                reset()
                                history.back()
                            }}
                            disabled={processing}
                        >Cancel</Button>
                        <Button type="submit">Add Property</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
