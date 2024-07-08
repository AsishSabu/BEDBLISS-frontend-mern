import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { removeLocation, setLocation } from "../../redux/slices/locationSlice";
import axios from "axios";
import Geocoder from "./Geocoder";

const AddLocation = () => {
  const {location }= useAppSelector((state) => state.locationSlice);
  const lat=location.lat
  const lng=location.lng
  const dispatch = useAppDispatch();
  const mapRef=useRef()
  
  useEffect(()=>{
    dispatch(removeLocation())
  },[])
  useEffect(()=>{
    if(!lng&& !lat){
        axios.get("https://ipapi.co/json")
        .then((response)=>{
            mapRef?.current?.flyTo({
                center:[response.data.longitude,response.data.latitude]
            })
            
        })
    }
  },[])

  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <ReactMapGL
      ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch(setLocation({ lng: e.lngLat.lng, lat: e.lngLat.lat }))
          }
        />
        <NavigationControl position="bottom-right"/>
        <GeolocateControl position="top-left"
        trackUserLocation 
        onGeolocate={(e)=> dispatch(setLocation({ lng: e.coords.longitude, lat: e.coords.latitude }))}/>
        <Geocoder/>
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;
