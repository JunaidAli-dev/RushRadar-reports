import Link from "next/link";

const AboutButton = () => {
  return (
    <Link href="/about">
      <button className="bg-[#912fe2] text-white p-[6px] rounded-xl md:text-xl text-[12px] font-semibold hover:bg-[#c44ff2] transition">
        About Us
      </button>
    </Link>
  );
};

export default AboutButton;
