import React, {useEffect, useRef, useState} from 'react';
import India from '../image/India.json';
import {MapContainer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Spinner from './Spinner';
import Axios from '../Axios';

export default function Map({selectedState, selectedPC}) {
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setScreenSize('small');
      } else {
        setScreenSize('big');
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [loading, setLoading] = useState(false);
  const countryStyle = {
    fillColor: '#ff8000',
    fillOpacity: 1,
    color: 'black',
    weight: 0.9,
  };
  const mapRef = useRef(null);

  const [mapCenter, setMapCenter] = useState([23.5937, 80.9629]);
  const [mapZoom, setMapZoom] = useState(5);
  const [filteredGeoJSON, setFilteredGeoJSON] = useState(null);
  const [filteredGeoPCJSON, setFilteredGeoPCJSON] = useState(null);

  //STATE

  const filterGeoJSONByState = (geojsonData, stateName) => {
    return {
      ...geojsonData,
      features: geojsonData.features.filter(
        feature => feature.properties.st_name === stateName,
      ),
    };
  };

  useEffect(() => {
    setLoading(true);
    const filteredData = filterGeoJSONByState(India, selectedState);

    console.log(filteredData);
    if (filteredData.features.length > 0) {
      setFilteredGeoJSON(filteredData);
      const bounds = L.geoJSON(filteredData).getBounds();
      if (bounds.isValid()) {
        const center = bounds.getCenter();
        setMapCenter([center.lat, center.lng]);
        const area =
          (bounds.getEast() - bounds.getWest()) *
          (bounds.getNorth() - bounds.getSouth());
        let zoomLevel;
        if (area <= 1) {
          zoomLevel = 10;
        } else if (area <= 10) {
          zoomLevel = 8;
        } else {
          zoomLevel = 7;
        }
        setMapZoom(zoomLevel);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [selectedState, selectedPC]);

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        const layerName = feature.properties.pc_name;
        layer
          .bindPopup(<div class="custom-popup">${layerName}</div>, {
            closeButton: false,
            maxWidth: 200,
          })
          .openPopup();
      },
      mouseout: () => {
        layer.unbindPopup();
      },
    });
  };
  return (
    <div className="home-map-main">
      {loading ? (
        <Spinner />
      ) : (
        <MapContainer
          style={{width: '100%', height: '100%'}}
          center={mapCenter}
          zoom={mapZoom}
          whenCreated={mapInstance => (mapRef.current = mapInstance)}>
          {selectedState == '' && selectedPC == '' ? (
            <GeoJSON
              data={India.features}
              style={countryStyle}
              onEachFeature={onEachFeature}
            />
          ) : (
            filteredGeoJSON &&
            filteredGeoJSON.features[0].properties.st_name ===
              selectedState && (
              <GeoJSON
                data={filteredGeoJSON}
                style={countryStyle}
                onEachFeature={onEachFeature}
              />
            )
          )}
        </MapContainer>
      )}
    </div>
  );
}
