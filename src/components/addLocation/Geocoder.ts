import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useAppDispatch } from '../../redux/store/store';
import { useControl } from 'react-map-gl';
import { setLocation } from '../../redux/slices/locationSlice';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
   const dispatch = useAppDispatch();
   const ctrl = new MapBoxGeocoder({
      accessToken: import.meta.env.VITE_MAP_BOX_TOKEN,
      marker: false,
      collapsed: true
   });

   useControl(() => ctrl);

   ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      dispatch(setLocation({ lng: coords[0], lat: coords[1] }));
   });

   return null;
}

export default Geocoder;
