import { Head, Link } from '@inertiajs/react';
import NavBar from '@/components/roja/nav-bar';
import Footer from '@/components/roja/footer';
import { Button } from '@/components/ui/button';
import { Property } from '@/types';
import PropertyCard from './my/properties/property-card';

export default function Home({ latestProperties }: { latestProperties: Array<Property> }) {
    return (
        <div>
            <Head title="Welcome" />
            <NavBar className='px-2 sm:px-4 md:px-16 lg:px-24'/>

            {/* Hero Section */}
            <div className='px-2 sm:px-4 md:px-16 lg:px-24'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 mb-16'>
                    <div className='flex items-center justify-center'>
                        <div>
                            <h1 className='text-4xl sm:text-4xl font-bold mb-4'>Find your next home. No viewing fees. No deposits. No agents.</h1>
                            <p className='text-lg mb-8 italic'>Roja is a rental platform that connects tenants directly with landlords, cutting out the middleman and saving you money.</p>
                            <div className='flex space-x-4'>
                                <Link href="/register">
                                    <Button variant='default'>
                                        Register
                                    </Button>
                                </Link>
                                <div className="relative inline-block">
                                    <Link 
                                        className='transition-transform duration-200 ease-in-out inline-block hover:scale-[1.05]'
                                        href={route('properties.index')}
                                    >
                                        <Button variant='outline'>
                                            Browse Properties
                                        </Button>
                                    </Link>
                                    <span className="text-4xl absolute right-40 top-[50%] -translate-y-[110%] translate-x-10 animate-point rotate-[60deg]">
                                        👉
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img 
                            src="https://assets.laravelprime.com/dev/roja/public/assets/img/roja_hero_image.png" 
                            alt="Image showing happy landlord and tenant and disgruntled agent."
                            className='w-full h-auto rounded-lg shadow-md'
                        />
                    </div>
                </div>
            </div>

            {/* How it works section */}
            <div className='px-2 sm:px-4 md:px-16 lg:px-24 bg-sidebar'>
                <div className='text-center py-8'>
                    <h2 className='text-3xl font-bold mb-4'>How It Works</h2>
                    <p className='text-lg italic mb-8'>Renting made simple and affordable.</p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='bg-background p-6 rounded-lg shadow-md'>
                            <div className='mb-4'>
                                <span className='text-6xl'>🏠</span>
                            </div>
                            <h3 className='text-xl font-semibold mb-2'>1. Browse Listings</h3>
                            <p>Explore a wide range of rental properties directly from landlords.</p>
                        </div>
                        <div className='bg-background p-6 rounded-lg shadow-md'>
                            <div className='mb-4'>
                                <span className='text-6xl'>📞</span>
                            </div>
                            <h3 className='text-xl font-semibold mb-2'>2. Contact Landlords</h3>
                            <p>Communicate directly with landlords to arrange viewings and ask questions.</p>
                        </div>
                        <div className='bg-background p-6 rounded-lg shadow-md'>
                            <div className='mb-4'>
                                <span className='text-6xl'>📝</span>
                            </div>
                            <h3 className='text-xl font-semibold mb-2'>3. Rent with Ease</h3>
                            <p>Complete your rental agreement without any agent fees or viewing costs.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Listings */}
            <div className='px-2 sm:px-4 md:px-16 lg:px-24 py-8'>
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold mb-4'>Featured Listings</h2>
                    <p className='text-lg italic'>Handpicked properties from our landlords.</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {latestProperties.map((property) => (<Link 
                        key={property.id} 
                        href={route('properties.show', property.id)}
                    >
                        <PropertyCard property={property} />
                    </Link>))}
                </div>
            </div>

            {/* For Landlords */}
            <div className='px-2 sm:px-4 md:px-16 lg:px-24 bg-sidebar border-b border-sidebar-border'>
                <div className='text-center py-8'>
                    <h2 className='text-3xl font-bold mb-4'>Are You a Landlord?</h2>
                    <p className='text-lg italic mb-8'>Join Roja today and start listing your properties directly to tenants.</p>
                    <Link href="/register">
                        <Button variant='default'>
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>

            <Footer className='px-2 sm:px-4 md:px-16 lg:px-24'/>
        </div>
    );
}
