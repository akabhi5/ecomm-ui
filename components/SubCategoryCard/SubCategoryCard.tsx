import Link from "next/link";

interface Props {
  name: string;
  image: string;
  slug: string;
}

const SubCategoryCard = ({ name, image, slug }: Props) => {
  return (
    <Link
      href={`categories/${slug}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "220px",
        height: "270px",
      }}
      className="transform transition duration-500 hover:scale-105"
    >
      <div className="relative top-20 px-4 py-3 bg-gray-500/50 w-full">
        <p className="text-gray-200 text-xl">{name}</p>
      </div>
    </Link>
  );
};

export default SubCategoryCard;
