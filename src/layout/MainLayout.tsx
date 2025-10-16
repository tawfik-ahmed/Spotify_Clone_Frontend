import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="min-h-screen h-screen bg-black text-white flex flex-col ">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-screen overflow-hidden p-2"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="bg-transparent transition-colors" />

        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <div className="mx-2 rounded-md overflow-hidden h-full">
            <Outlet />
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-transparent transition-colors" />

        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={30}
          collapsedSize={0}
        >
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
