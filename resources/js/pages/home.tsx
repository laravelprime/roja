import { Head } from '@inertiajs/react';
import NavBar from '@/components/roja/nav-bar';
import Footer from '@/components/roja/footer';

export default function Home() {
    return (
        <div>
            <Head title="Welcome" />
            <NavBar className='px-2 sm:px-4 md:px-16 lg:px-24'/>

            <div className='px-2 sm:px-4 md:px-16 lg:px-24'>
                Stuff Here
            </div>

            <Footer className='px-2 sm:px-4 md:px-16 lg:px-24'/>
        </div>
    );
}
