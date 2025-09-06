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

export default function PropertyListingPagination({ properties }: { properties: LaravelPaginatedResponse<Property> }) {
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

				{properties.prev_page_url && (<PaginationItem>
					<PaginationLink href={properties.prev_page_url}>
						{properties.current_page - 1}
					</PaginationLink>
				</PaginationItem>)}

				<PaginationItem>
					<PaginationLink href="#" isActive>
						{properties.current_page}
					</PaginationLink>
				</PaginationItem>

				{properties.next_page_url && (<PaginationItem>
					<PaginationLink href={properties.next_page_url}>
						{properties.current_page + 1}
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
