"use client";

import { useEffect, useState } from "react";

export default function DeviceNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("desktopNoticeShown");
    if (alreadyShown) return;

    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const isSmallScreen = window.innerWidth < 768;

    if (isMobileDevice || isSmallScreen) {
      setShowNotice(true);
      sessionStorage.setItem("desktopNoticeShown", "true");

      // Automatically hide after 10 seconds
      const timeout = setTimeout(() => {
        setShowNotice(false);
      }, 10000); // 10 seconds = 10000ms

      return () => clearTimeout(timeout); // cleanup
    }
  }, []);

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md text-sm shadow-lg z-50 max-w-xs text-center">
      For the best experience, please view this site on a desktop or laptop.
    </div>
  );
}
