"use client";
import Image from "next/image";
import Link from "next/link";
export default function Portfolio() {
  const postData = async () => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "عرفان",
        message: "سلام نکست!",
      }),
    });

    const data = await res.json();
    console.log("پاسخ سرور:", data);
  };

  return (
    <div className="py-24 px-10 ">
      <h1>WE ARE HERE</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
      <div className="flex justify-center items-center">
        <Link href="/portfolio/1" className=" ">
          <Image
            src="/images/portfolio/1.png"
            alt="Portfolio"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </Link>
        <button
          onClick={() => {
            postData();
          }}
        >
          Click me
        </button>
      </div>
    </div>
  );
}
