import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

interface VideoModalProps {
  videoId: string;
}

export function VideoModal({ videoId }: VideoModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#007bff]/5 text-[#007bff] hover:bg-[#007bff]/10 transition-colors duration-200 font-medium">
          <Play className="h-4 w-4" strokeWidth={1.5} />
          <span>Watch service overview</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogTitle className="sr-only">Service Overview Video</DialogTitle>
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
            title="Service Overview Video"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}