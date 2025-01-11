import Link from "next/link";

export default function NavLinks() {
  return (
<div className="links flex flex-wrap gap-[20px] md:gap-[50px] items-center justify-end">
  <Link
    href={"/login"}
    className="text-[#000000] text-[16px] md:text-[20px] font-bold cursor-pointer"
  >
    English
  </Link>
  <Link
    href={"/auth/login"}
    className="text-[#4461F2] text-[16px] md:text-[20px] font-bold cursor-pointer"
  >
    Sign in
  </Link>
  <Link
    href={"/auth/register"}
    className="border px-[20px] py-[8px] md:px-[30px] md:py-[10px] font-bold text-[#4461F2] rounded-2xl cursor-pointer"
  >
    Register
  </Link>
</div>

  )
}

