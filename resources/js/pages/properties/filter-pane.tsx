import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export default function FilterPane(){
    return <div className="flex justify-between space-x-2 w-full md:w-auto">
        <Select>
            <SelectTrigger className="w-[10rem]">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="price_asc">Price Low</SelectItem>
                <SelectItem value="price_desc">Price High</SelectItem>
                <SelectItem value="name_asc">Name A-Z</SelectItem>
                <SelectItem value="name_desc">Name Z-A</SelectItem>
                <SelectItem value="date_asc">Date Oldest</SelectItem>
                <SelectItem value="date_desc">Date Oldest</SelectItem>
            </SelectContent>
        </Select>

        <Button variant="default">
            Filter
            <Filter/>
        </Button>
    </div>
}