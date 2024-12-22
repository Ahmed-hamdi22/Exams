import Image from "next/image";

export default function PageUi() {
  return (
    <div className="container bg-[#F0F4FC] rounded-tr-[100px] py-[77px] pl-[79px] pr-[147px] rounded-br-[100px] shadow-lg h-full">
      <h1 className="text-[50px] leading-[75px] text-black font-bold">Welcome to <br/><span className="text-[#122D9C] ">Elevate</span> </h1>
      <p className="text-[18px] leading-10 mb-[80px]">Quidem autem voluptatibus qui quaerat aspernatur architecto natus</p>
      <Image width={408} height={434} src={"/images/bro.png"} alt="elevate" />

    </div>
  )
}

