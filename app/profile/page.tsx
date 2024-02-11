import prisma from "@/prisma/client";
function page() {
  const getSelf = async () => {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });
  };
  getSelf();
  return (
    <div className="pt-20 p-6 w-full justify-center flex flex-col">Hello</div>
  );
}

export default page;
