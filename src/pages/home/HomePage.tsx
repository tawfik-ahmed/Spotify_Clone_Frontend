import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import Featured from "./components/Featured";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionHeader from "./components/SectionHeader";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
  const {
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchFeaturedSongs,
    featuredSongs,
    madeForYouSongs,
    trendingSongs,
    isLoading,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      trendingSongs.length > 0 &&
      featuredSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...trendingSongs, ...madeForYouSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good afternoon
          </h1>
          <Featured />

          <div className="space-y-8">
            <SectionHeader
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionHeader
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
