import React, { useState, useEffect } from "react";
import Battery from "../Battery/Battery";
import { register, unregister } from "../../utils/battery";

export default function BatteryHookContainer() {
  const [batteryData, setBatteryData] = useState({
    level: 0.55,
    charging: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 2000);
    register(updateBattery);
    return () => {
      unregister(updateBattery);
    };
  }, []);

  const updateBattery = ({ level, charging }) => {
    setBatteryData({ level, charging });
  };

  return (
    <div>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <Battery level={batteryData.level} charging={batteryData.charging} />
      )}
    </div>
  );
}
