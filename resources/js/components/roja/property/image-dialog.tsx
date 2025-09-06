import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageCarousel } from "./image-carousel"
import { Property } from "@/types"

export function ImageDialog({ DialogTriggerBtn, property }: { DialogTriggerBtn: React.ReactNode, property: Property }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {DialogTriggerBtn}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]  p-0 rounded-none grid place-items-center">
                <ImageCarousel property={property} />
            </DialogContent>
        </Dialog>
    )
}
