interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#011c25] to-[#0c0217]">
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
        <h1 className="text-3xl py-6 text-white font-bold">
          Create My Asset list
        </h1>
      </div>
      {children}
    </div>
  );
};

export default Layout;
