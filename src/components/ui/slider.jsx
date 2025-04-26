import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full">
    <div className="absolute left-0 top-1/2 -translate-y-1/2">
      <ChevronLeft className="h-4 w-4 text-black" />
    </div>
    <div className="absolute right-0 top-1/2 -translate-y-1/2">
      <ChevronRight className="h-4 w-4 text-black" />
    </div>
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center px-4", className)}
      {...props}>
      <SliderPrimitive.Track
        className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-black">
        <SliderPrimitive.Range className="absolute h-full bg-black" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-4 w-4 rounded-full border border-black/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  </div>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
