interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#011c25] to-[#0c0217]">
      
      {children}
    </div>
  );
};

export default Layout;
