"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-neutral-200 bg-white p-3 ",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[400px] w-[450px] mt-[60px] items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-background p-10 md:shadow-l",
        className,
      )}
      ref={containerRef}
    >
      
      <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-lg">
        
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.googleDocs />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.messenger />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.notion />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Icons.openai />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Icons.user />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
      />
    </div>
  );
}

const Icons = {
  notion: () => (
    <img src="https://sun9-60.userapi.com/impf/c854016/v854016958/dd70/q2e5-aSry5c.jpg?size=520x0&quality=95&sign=3039e1d634c50e90de34a94cf11464fc" className="rounded-xl size-6" alt="" />
  ),
  openai: () => (
    <img src="/black.png"></img>
  ),
  googleDrive: () => (
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtf2w9aVENJQLyKNzBPhvhrwi0OJeYPxEeKw&s" alt="" className="rounded-xl"/>
  ),
  whatsapp: () => (
    <img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/eqwvnydrxvng2vgzecn6" className="rounded-xl" alt="" />
  ),
  googleDocs: () => (
    <img src="https://habrastorage.org/getpro/moikrug/uploads/company/100/004/679/1/logo/big_52d6473a9db6fc51ff16b12c9c83e8bb.jpg" className="rounded-xl" alt="" />
  ),
  zapier: () => (
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb810SiZu8zi-qn1s-0F5NhS1dWqPlXxu5Eg&s" className="rounded-xl" alt="" />
  ),
  messenger: () => (
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT87WVC5ZP5AtJooAZU1ax5ob-M94n_UCNfGA&s" className="rounded-xl" alt="" />
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};
