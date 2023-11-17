import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Toaster />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
};

export default PlatformLayout;
