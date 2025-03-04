import { InfoIcon } from "lucide-react";
import React from "react";

function Warning({ message }: { message: string }) {
  return (
    <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
      <InfoIcon size="16" strokeWidth={2} />
      {message}
    </div>
  );
}

export default Warning;
