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
    <Carousel className="w-screen h-screen max-w-xs ">
      <CarouselContent>
        {property.media.map((media, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-full flex">
              <img
                src={media.original_url}
                alt={`Property image ${index + 1}`}
                className="h-screen object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
