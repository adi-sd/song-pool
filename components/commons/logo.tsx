// Styling
import Image from "next/image";
import Link from "next/link";

interface LogoPops {}

export const Logo: React.FC<LogoPops> = () => {
    return (
        <div className="h-10 mb-16 flex flex-col justify-center items-center min-h-[40px] min-w-[150px]">
            <Link href={"/"}>
                <Image
                    src="/images/logo.svg"
                    alt="logo image"
                    height={40}
                    width={500}
                    className="bg-transparent object-cover"
                ></Image>
            </Link>
        </div>
    );
};
