import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash: { success?: string; error?: string };
    csrf_token: string;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

interface PropertyMedia {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    conversions_disk: string;
    size: number;
    manipulations: any[];
    custom_properties: any[];
    generated_conversions: any[];
    responsive_images: any[];
    order_column: number;
    created_at: string;
    updated_at: string;
    original_url: string;
    preview_url: string;
}

interface PropertyFeature {
  id: number;
  property_id: number;
  feature: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};

export interface Property {
    id: number;
    user_id: number;
    title: string;
    short_desc: string;
    description: string;
    city: string;
    neighbourhood: string;
    type: string;
    rent: number;
    deposit: number;
    suitable_for: string;
    availability_date: string;
    rental_status: string;
    cell_number: string;
    whatsapp_number: string;
    featured_image_id: number | null;
    created_at: string;
    updated_at: string;
    media: PropertyMedia[];
    features: PropertyFeature[];
}

export interface PropertyFeature {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface FiltersForm {
    propertyType: string[];
    city: string;
    neighbourhood: string;
    priceRange: [number, number];
    depositRange: [number, number];
    features: string[];
    sortBy: string;
}

export interface LaravelPaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface LaravelPaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: LaravelPaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export type Status = string[];
export type PropertyType = Array<'house' | 'room'>;
export type SortByOption = 'rent_low_to_high' | 'rent_high_to_low' | 'date_posted_newest' | 'date_posted_oldest' | 'neighbourhood_az' | 'neighbourhood_za'

export type PropertyFilters = {
    // Basic Filters
    propertyType: PropertyType;
    status: Status;
    city: string;
    neighbourhood: string;

    // Price Range Filters
    rentRange: {
        min: number;
        max: number;
    };
    depositRange: {
        min: number;
        max: number;
    };

    // Availability Filters
    availabilityType: 'now' | 'soon' | 'future'
    availableFromDate: string; // ISO date string
    availableToDate: string; // ISO date string

    // Demographic Filters
    suitableFor: 'Family' | 'Couple' | 'Single Lady' | 'Single Male' | 'Students' | 'Any';

    // Feature-based Filters
    hasParking: boolean;
    hasWiFi: boolean;
    hasSecurity: boolean;
    hasGarden: boolean;
    hasSolarPower: boolean;
    hasBorehole: boolean;

    // Sort Options
    sortBy: SortByOption;
};