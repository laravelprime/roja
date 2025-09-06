import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Property } from "@/types"

export function ImageCarousel({property}: {property: Property}) {
  return (
    <Carousel className="w-full md:max-w-md">
      <CarouselContent>
        {property.media.map((media, index) => (
          <CarouselItem key={index}>
            <img
                src={media.original_url}
                alt={`Property image ${index + 1}`}
                className="w-full h-auto object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
