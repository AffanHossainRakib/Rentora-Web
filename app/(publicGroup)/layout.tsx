import { BackToTop } from "@/components/shared/back-to-top";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const PublicGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();

  return (
    <>
      <Navbar user={user} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer user={user} />
      <BackToTop />
    </>
  );
};

export default PublicGroupLayout;
