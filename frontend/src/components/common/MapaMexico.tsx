import React, { memo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// TopoJSON de los estados de México
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/mexico/mexico-states.json";

// Hubs logísticos de Totalplay en México
const totalplayHubs = [
  { name: "CDMX - Central Hub", coords: [-99.1332, 19.4326] as [number, number], color: "#DC2626", units: 142 },
  { name: "Monterrey - CEDIS Norte", coords: [-100.3161, 25.6866] as [number, number], color: "#1E40AF", units: 88 },
  { name: "Guadalajara - Hub Occidente", coords: [-103.3496, 20.6597] as [number, number], color: "#10B981", units: 64 },
  { name: "Querétaro - Hub Bajío", coords: [-100.3899, 20.5888] as [number, number], color: "#F59E0B", units: 45 },
  { name: "Puebla - Hub Oriente", coords: [-98.2063, 19.0414] as [number, number], color: "#8B5CF6", units: 32 },
  { name: "Tijuana - Hub Noroeste", coords: [-117.0382, 32.5149] as [number, number], color: "#EC4899", units: 16 },
];

const MapaMexico = () => {
  const [tooltip, setTooltip] = useState({ show: false, name: "", details: "", x: 0, y: 0 });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1100,
          center: [-102, 23.5], // Centrar México
        }}
        style={{ width: "100%", height: "100%", maxHeight: "460px" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const { name } = geo.properties;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(evt) => {
                    const { clientX, clientY } = evt;
                    setTooltip({
                      show: true,
                      name,
                      details: "Estado monitoreado por telemetría Totalplay",
                      x: clientX,
                      y: clientY,
                    });
                  }}
                  onMouseLeave={() =>
                    setTooltip({ show: false, name: "", details: "", x: 0, y: 0 })
                  }
                  style={{
                    default: {
                      fill: "#E2E8F0",
                      outline: "none",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.8,
                      transition: "fill 0.2s ease",
                    },
                    hover: {
                      fill: "#1E40AF",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#0F172A",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Marcadores Totalplay */}
        {totalplayHubs.map((hub) => (
          <Marker
            key={hub.name}
            coordinates={hub.coords}
            onMouseEnter={(evt) => {
              const { clientX, clientY } = evt;
              setTooltip({
                show: true,
                name: hub.name,
                details: `${hub.units} Unidades activas en telemetría`,
                x: clientX,
                y: clientY,
              });
            }}
            onMouseLeave={() =>
              setTooltip({ show: false, name: "", details: "", x: 0, y: 0 })
            }
          >
            <circle r={7} fill={hub.color} stroke="#ffffff" strokeWidth={2} style={{ cursor: "pointer" }} />
            <circle r={12} fill={hub.color} opacity={0.3} style={{ animation: "pulse 2s infinite" }} />
            <text
              textAnchor="middle"
              y={18}
              style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700, fill: "#0F172A" }}
            >
              {hub.name.split(" - ")[0]}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip flotante */}
      {tooltip.show && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 12,
            top: tooltip.y - 12,
            background: "rgba(15, 23, 42, 0.92)",
            backdropFilter: "blur(6px)",
            color: "#FFFFFF",
            padding: "8px 14px",
            borderRadius: 8,
            fontSize: 13,
            pointerEvents: "none",
            zIndex: 9999,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div style={{ fontWeight: 700, color: "#93C5FD", marginBottom: 2 }}>{tooltip.name}</div>
          {tooltip.details && <div style={{ fontSize: 11, color: "#CBD5E1" }}>{tooltip.details}</div>}
        </div>
      )}
    </div>
  );
};

export default memo(MapaMexico);
