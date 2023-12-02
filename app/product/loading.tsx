import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="px-14 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-8 flex flex-wrap justify-evenly">
          <Skeleton className="w-[300px] h-[400px]" />
          <Skeleton className="w-[300px] h-[400px]" />
        </div>
        <div className="col-span-4 space-y-5">
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[40px]" />
          <div className="flex space-x-5">
            <Skeleton className="w-[100px] h-[40px]" />
            <Skeleton className="w-[100px] h-[40px]" />
          </div>
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
        </div>
      </div>
      <hr className="my-16" />
    </section>
  );
};

export default Loading;
