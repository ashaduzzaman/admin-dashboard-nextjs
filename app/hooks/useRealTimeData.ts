import { useState, useEffect } from "react";

interface RealTimeDataOptions {
  initialData?: unknown[];
  interval?: number;
  onUpdate?: (data: unknown[]) => void;
}

export function useRealTimeData({
  initialData = [],
  interval = 3000,
  onUpdate,
}: RealTimeDataOptions) {
  const [data, setData] = useState(initialData);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    setIsConnected(true);

    const timer = setInterval(() => {
      // Simulate real-time data updates
      setData((prevData) => {
        const newData = Array.isArray(prevData) ? [...prevData] : [];
        setLastUpdate(new Date());
        onUpdate?.(newData);
        return newData;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      setIsConnected(false);
    };
  }, [interval, onUpdate]);

  return {
    data,
    isConnected,
    lastUpdate,
    setData,
  };
}
