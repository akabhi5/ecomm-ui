import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="px-14 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-7 flex flex-wrap justify-evenly">
          <Skeleton className="w-[500px] h-[700px]" />
          <Skeleton className="w-[500px] h-[700px]" />
        </div>
        <div className="col-span-5 space-y-5">
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[40px]" />
          <div className="flex space-x-2">
            <Skeleton className="rounded-full h-10 w-10" />
            <Skeleton className="rounded-full h-10 w-10" />
            <Skeleton className="rounded-full h-10 w-10" />
            <Skeleton className="rounded-full h-10 w-10" />
            <Skeleton className="rounded-full h-10 w-10" />
          </div>
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
