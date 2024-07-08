import React, { useEffect, useState, useRef } from "react";
import { Avatar, Box, Tooltip, Paper } from "@mui/material";
import useUserHotels from "../../hooks/user/useUserHotels";
import HotelData from "./HotelData";
import HomepageCards from "../skeletons/HomepageCards";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  MapRef,
  ViewStateChangeEvent,
} from "react-map-gl";
import Supercluster from "supercluster";
import axios from "axios";
import { Card } from "flowbite-react";

interface Hotel {
  _id: string;
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  imageUrls: string[];
  ownerPhoto: string;
}

interface Point {
  type: "Feature";
  properties: {
    cluster: boolean;
    hotelId: string;
    title: string;
    description: string;
    lng: number;
    lat: number;
    images: string[];
    uPhoto: string;
    uName: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

interface ClusterProperties {
  cluster: boolean;
  point_count: number;
  hotelId?: string;
  title?: string;
  description?: string;
  lng?: number;
  lat?: number;
  images?: string[];
  uPhoto?: string;
  uName?: string;
}

interface Cluster {
  type: "Feature";
  id: number;
  properties: ClusterProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 40,
});

const HomePage: React.FC = () => {
  const { hotels, loading } = useUserHotels();
  const [points, setPoints] = useState<Point[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [bounds, setBounds] = useState<number[]>([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState<ClusterProperties | null>(null);
  const [userLocation, setUserLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const mapRef = useRef<MapRef | null>(null); // Ensure mapRef is properly typed

  useEffect(() => {
    axios
      .get("https://ipapi.co/json")
      .then((response) => {
        const { longitude, latitude } = response.data;
        setUserLocation({ longitude, latitude });
        console.log("User location fetched:", { longitude, latitude });
      })
      .catch((error) =>
        console.error("Error fetching user location:", error)
      );
  }, []);

  useEffect(() => {
    console.log("Hotels Data:", hotels);

    const validHotels = hotels.filter(
      (hotel: Hotel) =>
        hotel.coordinates &&
        hotel.coordinates.latitude &&
        hotel.coordinates.longitude
    );
    console.log("Valid Hotels:", validHotels);

    const points: Point[] = validHotels.map((hotel: Hotel) => ({
      type: "Feature",
      properties: {
        cluster: false,
        hotelId: hotel._id,
        title: hotel.name,
        description: hotel.description,
        lng: hotel.coordinates.longitude,
        lat: hotel.coordinates.latitude,
        images: hotel.imageUrls,
        uPhoto: hotel.ownerPhoto,
        uName: hotel.name,
      },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(hotel.coordinates.longitude.toString()),
          parseFloat(hotel.coordinates.latitude.toString()),
        ],
      },
    }));
    setPoints(points);
    console.log("Generated Points:", points);
  }, [hotels]);

  useEffect(() => {
    if (points.length > 0) {
      supercluster.load(points);
      const clusters = supercluster.getClusters(bounds, zoom);
      setClusters(clusters);
      console.log("Generated Clusters:", clusters);
    } else {
      console.log("No points to load into supercluster");
    }
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      const mapBounds = mapRef.current.getMap().getBounds();
      if (mapBounds) {
        setBounds(mapBounds.toArray().flat());
        console.log("Updated Bounds:", mapBounds.toArray().flat());
      }
    }
  }, [mapRef?.current]);

  const handleZoomEnd = (e: ViewStateChangeEvent) => {
    setZoom(Math.round(e.viewState.zoom));
    if (mapRef.current) {
      const mapBounds = mapRef.current.getMap().getBounds();
      if (mapBounds) {
        setBounds(mapBounds.toArray().flat());
        console.log("Map bounds after zoom:", mapBounds.toArray().flat());
      }
    }
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <Box
          sx={{
            height: 400,
            width: "80%",
            border: 1,
            borderRadius: 10,
            boxShadow: 1,
            overflow: "hidden",
          }}
        >
          {userLocation ? (
            <ReactMapGL
              mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
              initialViewState={{
                longitude: userLocation.longitude,
                latitude: userLocation.latitude,
                zoom: 12,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              ref={mapRef}
              onZoomEnd={handleZoomEnd}
              // onMoveEnd={handleZoomEnd}
            >
              <NavigationControl position="top-left" />
              <GeolocateControl position="top-left" />

              {clusters.map((cluster: Cluster) => {
                const { cluster: isCluster, point_count } = cluster.properties;
                const [longitude, latitude] = cluster.geometry.coordinates;
                if (isCluster) {
                  return (
                    <Marker
                      key={`cluster-${cluster.id}`}
                      longitude={longitude}
                      latitude={latitude}
                    >
                      <div
                        className="bg-blue-500 rounded-lg p-4 flex justify-center align-middle"
                        style={{
                          width: `${10 + (point_count / points.length) * 20}px`,
                          height: `${
                            10 + (point_count / points.length) * 20
                          }px`,
                        }}
                        onClick={() => {
                          const zoom = Math.min(
                            supercluster.getClusterExpansionZoom(cluster.id),
                            20
                          );
                          console.log(
                            "Cluster click - expanding zoom:",
                            zoom
                          );
                          mapRef.current?.flyTo({
                            center: [longitude, latitude],
                            zoom,
                            speed: 1,
                          });
                        }}
                      >
                        {point_count}
                      </div>
                    </Marker>
                  );
                }

                return (
                  <Marker
                    key={`hotel-${cluster.properties.hotelId}`}
                    longitude={longitude}
                    latitude={latitude}
                  >
                    <Tooltip title={cluster.properties.title || ""}>
                      <Avatar
                        src={
                          cluster.properties.images
                            ? cluster.properties.images[0]
                            : ""
                        }
                        component={Paper}
                        elevation={2}
                        onClick={() => {
                          console.log(
                            "Hotel marker click - showing popup for:",
                            cluster.properties
                          );
                          setPopupInfo(cluster.properties);
                        }}
                      />
                    </Tooltip>
                  </Marker>
                );
              })}
              {popupInfo && (
                <Popup
                  longitude={popupInfo.lng || 0}
                  latitude={popupInfo.lat || 0}
                  closeOnClick={false}
                  focusAfterOpen={false}
                  onClose={() => {
                    console.log("Popup closed");
                    setPopupInfo(null);
                  }}
                >
                  <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={popupInfo.images && popupInfo?.images[0]}
                  >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {popupInfo.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {popupInfo.description}
                    </p>
                  </Card>
                </Popup>
              )}
            </ReactMapGL>
          ) : (
            <p>Loading user location...</p>
          )}
        </Box>
      </div>

      <div className="py-10 px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-2xl">
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, index) => <HomepageCards key={index} />)
        ) : hotels.length > 0 ? (
          hotels.map((hotel: Hotel) => <HotelData key={hotel._id} {...hotel} />)
        ) : (
          <p>No hotels available</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
