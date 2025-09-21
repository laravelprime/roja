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
            <DialogContent className="min-w-screen h-screen bg-oange-200 p-0 grid place-items-center rounded-none">
                <ImageCarousel property={property} />
                {/* <img className="h-screen" src="http://localhost:8000/storage/476/9.jpg" alt="" /> */}
            </DialogContent>
        </Dialog>
    )
}
