import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

const PublicGroupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
};

export default PublicGroupLayout;
