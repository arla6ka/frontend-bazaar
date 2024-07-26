import OrbitingCircles from "@/components/magicui/orbiting-circles";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative mb-[-100px] mt-[-70px] flex w-[500px] h-[500px] ml-2 mr-2 md:h-[500px] scale-[0.55] md:scale-[0.65] flex-col items-center justify-center overflow-hidden rounded-lg ">
      <span className="font-unbounded pointer-events-none whitespace-pre-wrap text-black bg-clip-text text-center text-7xl font-semibold leading-none  dark:from-white dark:to-black">
        Bazaar
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[40px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Icons.whatsapp />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[40px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Icons.notion />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        reverse
      >
        <Icons.googleDrive />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        delay={20}
        reverse
      >
        <Icons.gitHub />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  gitHub: () => (
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtf2w9aVENJQLyKNzBPhvhrwi0OJeYPxEeKw&s" alt="" className="rounded-full"/>
  ),
  notion: () => (
    <img src="https://seeklogo.com/images/O/olx-logo-20F1656D13-seeklogo.com.png" className="rounded-full" alt="" />
  ),
  openai: () => (
    <img src="https://habrastorage.org/getpro/moikrug/uploads/company/100/004/679/1/logo/big_52d6473a9db6fc51ff16b12c9c83e8bb.jpg" className="rounded-full" alt="" />
  ),
  googleDrive: () => (
    <img src="https://habrastorage.org/getpro/moikrug/uploads/company/100/004/679/1/logo/big_52d6473a9db6fc51ff16b12c9c83e8bb.jpg" className="rounded-full" alt="" />
  ),
  whatsapp: () => (
    <img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/eqwvnydrxvng2vgzecn6" className="rounded-full" alt="" />
  ),
};
