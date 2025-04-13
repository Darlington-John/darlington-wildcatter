import Image from "next/image";
import useToggle from "~/lib/utils/use-toggle";
import dynamite from "~/public/images/dynamitehand.svg";

const HandDynamite = () => {
  const toggle = useToggle(1000);

  return (
    <section className="flex items-center justify-center py-48 max-lg:py-20">
      <Image
        src={dynamite}
        className={`w-90 ${toggle && "fast-shake"} max-lg:w-60`}
        alt="dynamite"
      />
    </section>
  );
};

export default HandDynamite;
