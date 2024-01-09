import { useKeenSlider } from "keen-slider/react";
import * as Dialog from "@radix-ui/react-dialog";
import "keen-slider/keen-slider.min.css";
import { Ad } from "./Ad";
import { ArrowLeft, ArrowRight, PlusCircle, X } from "phosphor-react";
import { useState } from "react";
import { AdForm } from "./AdForm";


const Ads = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setloaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    slides: {
      perView: 4,
      spacing: 20
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setloaded(true);
    }
  });

  return (
    <div className="navigation-wrapper mt-4 relative">
      <div ref={sliderRef} className="keen-slider flex items-center h-full">
        <Ad
          Campo="Tanto faz"
          date="12/04/2023"
          key={1}
          profile="https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo-700x394.png"
        />
        <Ad
          Campo="Tanto faz"
          date="12/04/2023"
          key={2}
          profile="https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo-700x394.png"
        />
        <Ad
          Campo="Tanto faz"
          date="12/04/2023"
          key={3}
          profile="https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo-700x394.png"
        />
        <Ad
          Campo="Tanto faz"
          date="12/04/2023"
          key={4}
          profile="https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo-700x394.png"
        />
        <Ad
          Campo="Tanto faz"
          date="12/04/2023"
          key={5}
          profile="https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo-700x394.png"
        />

        <div className='keen-slider__slide bg-zinc-300 flex flex-col justify-center items-center !w-[130px] !max-w-[130px rounded-xl max-h-40 h-[180px]'>
          <Dialog.Root>
            <Dialog.Trigger
              type="button"
              className="flex items-center justify-center flex-col font-bold px-2 text-center h-full"
            >
              <PlusCircle size={48} className="text-green-600"/>
              
              Criar um anúncio
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/60 fixed inset-0 w-screen h-screen"/>
              <Dialog.Content className="absolute p-10 bg-zinc-200 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog.Close
                  className="absolute right-6 top-6 text-zinc-500 hover:text-zinc-900 transition-all duration-500"
                > 
                  <X size={24} aria-label="Close" />
                </Dialog.Close>
                <Dialog.Title
                  className="text-3xl leading-tight font-extrabold"
                >
                  Criar anúncio
                </Dialog.Title>

                <AdForm />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

      </div>

      <>
        <div
          className="w-8 h-8 rounded-full bg-zinc-400 flex items-center justify-center absolute top-1/2 -translate-y-1/2 cursor-pointer left-1"
          onClick={(e: any) =>{ e.stopPropagation() || instanceRef.current?.prev()}}
        >
          <ArrowLeft size={20} weight="bold"/>
        </div>

        <div
          className="w-8 h-8 rounded-full bg-zinc-400 flex items-center justify-center absolute top-1/2 -translate-y-1/2 cursor-pointer right-1"
          onClick={(e: any) =>{ e.stopPropagation() || instanceRef.current?.next()}}
        >
          <ArrowRight size={20} weight="bold"/>
        </div>
      </>
    </div>
  )
}

export { Ads };