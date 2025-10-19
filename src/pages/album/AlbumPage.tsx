import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { Clock, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainderSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainderSeconds}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { currentAlbum, fetchAlbumById } = useMusicStore();

  useEffect(() => {
    fetchAlbumById(albumId!);
  }, [albumId, fetchAlbumById]);

  return (
    <div className="h-screen flex flex-col relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col flex-shrink-0">
        <div className="flex flex-col md:flex-row p-6 gap-6 pb-8">
          <img
            src={currentAlbum?.imageUrl}
            alt={currentAlbum?.title}
            className="w-60 h-60 md:w-[240px] md:h-[240px] sm:w-40 sm:h-40 shadow-xl rounded object-cover"
          />

          <div className="flex flex-col justify-end">
            <p className="text-sm font-medium">Album</p>
            <h1 className="text-4xl md:text-4xl xl:text-7xl 2xl:text-6xl font-bold my-4 truncate">
              {currentAlbum?.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-zinc-100 flex-wrap">
              <span className="font-medium text-white">
                {currentAlbum?.artist}
              </span>
              <span>• {currentAlbum?.songs.length} songs </span>
              <span>• {currentAlbum?.releaseYear}</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-4 flex items-center gap-6 flex-shrink-0">
          <Button
            size="icon"
            className="h-14 w-14 !rounded-full !bg-green-500 hover:!bg-green-400 hover:scale-105 transition-all"
          >
            <Play className="h-7 w-7 text-black" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-black/20 backdrop-blur-sm h-full">
        <div className="min-w-max">
          <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-5 py-2 text-sm text-zinc-400 border-b border-white/5 sticky top-0 bg-black z-10">
            <div>#</div>
            <div>Title</div>
            <div>Release Date</div>

            <Clock className="size-4" />
          </div>

          <div className="space-y-2 py-4">
            {currentAlbum?.songs.map((song, index) => (
              <div
                key={song._id}
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <Play className="size-4 hidden group-hover:block" />
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="size-10"
                  />
                  <span className="font-medium text-white">{song.title}</span>
                </div>

                <div className="flex items-center">
                  {song.createdAt.split("T")[0]}
                </div>
                <div className="flex items-center">
                  {formatDuration(song.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
