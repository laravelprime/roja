import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Bed, CheckCircle2, Home, Plus, X, XCircle } from 'lucide-react';

import FileUpload from "./file-upload";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { FilePondErrorDescription } from 'filepond';


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
    rental_status: string;
    cell_number: string;
    whatsapp_number: string;
    features: string[];
    imageIds: {
        id: string;
        serverId: string;
    }[];
};

type PropertyFeature = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Properties',
        href: '/my/properties',
    },
    {
        title: 'Add Property',
        href: '/my/properties/create',
    }
];

export default function Index({featuresList}: {featuresList: PropertyFeature[]}) {
    const [feature, setFeature] = useState('')
    const { flash } = usePage<SharedData>().props
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
        rental_status: '',
        cell_number: '',
        whatsapp_number: '',
        features: [],
        imageIds: [],
    })

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash.success, flash.error]);

    const handleProcess = (error: any, file: any) => {
        // console.log(error);

        if (error) {
            // console.error('Upload failed', error);
            return;
        }
        
        if(!file.serverId) {
            console.error('Invalid file object: No server id returned', file);
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

    const labelFileProcessingError = (error : FilePondErrorDescription) => {
        console.log(error.code);

        let errorMessage = '';
        switch (error.code) {
            case 499:
                errorMessage = 'No image file was uploaded. Please select an image to upload.';
                break;
            case 498:
                errorMessage = 'Only jpg, jpeg, png, gif, svg are allowed.';
                break;
            case 497:
                errorMessage = 'Image file is too large. Maximum allowed size is 2MB.';
                break;
            default:
                errorMessage = 'File upload failed. Please try again.';
        }

        return errorMessage;
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        post(route('my.properties.store'),{
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
        setFeature('');
    }

    const removeFeature = (index: number) => {
        const updatedFeatures = data.features.filter((_, i) => i !== index);
        setData('features', updatedFeatures);
    }

    const { csrf_token } = usePage<SharedData>().props;

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
                                <Label htmlFor="status">Rental Status</Label>

                                <Select
                                    onValueChange={(value) => { setData('rental_status', value); }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Rental Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">
                                            <CheckCircle2 className='text-green-500'/>
                                            <span className='text-green-500'>Available</span>
                                        </SelectItem>
                                        <SelectItem value="occupied">
                                            <XCircle className='text-red-600'/>
                                            <span className='text-red-600'>Occupied</span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.rental_status} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="cell_number">Cell Number</Label>
                                <Input 
                                    id="cell_number" 
                                    name="cell_number"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="cell_number"
                                    value={data.cell_number}
                                    onChange={ e => { setData('cell_number', e.target.value) }} 
                                    disabled={processing}
                                    placeholder="e.g +263 77 212 3456"
                                />
                                <InputError message={errors.cell_number} className="mt-2" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="whatsapp_number">Whatsapp Number</Label>
                                <Input 
                                    id="whatsapp_number" 
                                    name="whatsapp_number"
                                    type="text"
                                    // required
                                    autoFocus
                                    autoComplete="whatsapp_number"
                                    value={data.whatsapp_number}
                                    onChange={ e => { setData('whatsapp_number', e.target.value) }} 
                                    disabled={processing}
                                    placeholder="e.g +263 77 212 3456"
                                />
                                <InputError message={errors.whatsapp_number} className="mt-2" />
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
                                        <SelectItem value="room">
                                            <Bed/>
                                            Room
                                        </SelectItem>
                                        <SelectItem value="house">
                                            <Home/>
                                            House
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="feature">Features</Label>
                            <ul className="list-disc grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {featuresList.map((feature) => (
                                    <li key={feature.id} className="text-sm text-muted-foreground list-none inline-flex items-center space-x-2">
                                        <Checkbox
                                            checked={data.features.includes(String(feature.id))}
                                            onCheckedChange={(checked) => {
                                                checked ? setData('features', [...data.features, String(feature.id)])
                                                    : setData('features', data.features.filter((value) => value !== String(feature.id)))
                                                    
                                            }}
                                        />
                                        <div className="flex items-center">
                                            {feature.name}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <InputError message={errors.features} className="mt-2" />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="description">Images of the Property</Label>
                            <p className="text-muted-foreground text-sm">At least 1 image of your property</p>
                            <FileUpload 
                                handleProcess={handleProcess} 
                                handleRemove={handleRemove}
                                resetTrigger={false}
                                labelFileProcessingError={labelFileProcessingError}
                            />
                            <InputError message={errors.imageIds} className="mt-2" />
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-2 mt-4'>
                        <Button 
                            variant="outline"
                            type='button'
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
