'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import AutoPlay from 'embla-carousel-autoplay';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButton';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoPlay({ playOnInit: true, delay: 3000 }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="w-full">
                <Image
                  src={item} // Your image source
                  alt="slide images"
                  layout="responsive" // Ensures responsiveness
                  width={1000} // Set a width proportional to the aspect ratio you desire
                  height={500} // Adjust height for proper scaling
                  objectFit="contain" // Ensures the image is not cropped
                  quality={100}
                  className="!h-[450px] rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
