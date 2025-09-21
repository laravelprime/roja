import { LaravelPaginatedResponse, Property } from "@/types";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PropertyListingPagination({ 
	properties 
}: { 
	properties: LaravelPaginatedResponse<Property> 
}) {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					{properties.prev_page_url ? (
						<PaginationPrevious href={properties.prev_page_url} />
					) : (
						<span className="pointer-events-none opacity-50">
							<PaginationPrevious href="#" />
						</span>
					)}
				</PaginationItem>

				{properties.current_page !== 1 && (<PaginationItem>
					<PaginationLink href={properties.first_page_url}>
						1
					</PaginationLink>
				</PaginationItem>)}

				{properties.current_page - 1 > 1 && (<PaginationItem>
					<strong>. . . . . . . .</strong>
				</PaginationItem>)}

				<PaginationItem>
					<PaginationLink href="#" isActive>
						{properties.current_page}
					</PaginationLink>
				</PaginationItem>

				{properties.last_page - properties.current_page > 1 &&(<PaginationItem>
					<strong>. . . . . . . .</strong>
				</PaginationItem>)}

				{properties.current_page !== properties.last_page && (<PaginationItem>
					<PaginationLink href={properties.last_page_url}>
						{properties.last_page}
					</PaginationLink>
				</PaginationItem>)}

				<PaginationItem>
					{properties.next_page_url ? (
						<PaginationNext href={properties.next_page_url} />
					) : (
						<span className="pointer-events-none opacity-50">
							<PaginationNext href="#" />
						</span>
					)}
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
