import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import database from './firebase';
import './App.css';

const token = 'pk.eyJ1IjoiZ2FicmllbGFhbWFyaW5obyIsImEiOiJjbGkzNGhtNXcxODR5M2tvY2wzZDJiNnljIn0.42TNEEBx8h6zQ0Z4CjqZyw';
mapboxgl.accessToken = token;

function App() {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [data, setData] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [status, setStatus] = useState(1); // Estado inicial do status

  // Função para enviar os dados para o Firebase e atualizar o marcador
  const push = () => {
    const longitudeNum = parseFloat(longitude);
    const latitudeNum = parseFloat(latitude);

    database.ref('locais').set({
      longitude: longitudeNum,
      latitude: latitudeNum,
      status: status // Adiciona o status aos dados enviados para o Firebase
    }).then(() => {
      updateMap(longitudeNum, latitudeNum); // Atualiza o marcador com as coordenadas enviadas
    }).catch(alert);
  };

  // Função para alternar o status entre ligado (1) e desligado (0)
  const toggleStatus = () => {
    const newStatus = status === 1 ? 0 : 1;
    setStatus(newStatus);

    // Atualiza o valor do campo "status" no Firebase
    database.ref('locais/status').set(newStatus).catch(alert);
  };

  // Função para buscar os dados do Firebase e adicionar o listener
  const fetchData = () => {
    const locaisRef = database.ref('locais');
  
    locaisRef.on('value', (snapshot) => {
      const locais = snapshot.val();
      if (locais) {
        setData(locais);
        setLongitude(locais.longitude.toString());
        setLatitude(locais.latitude.toString());
        if (locais.status !== undefined) {
          setStatus(locais.status); // Define o estado do status com base nos dados do Firebase
        }
        updateMap(locais.longitude, locais.latitude);
      }
    }, (error) => {
      console.error(error);
    });
    
    // Adicionar listener para atualizar o marcador quando os dados mudarem
    locaisRef.child('longitude').on('value', (snapshot) => {
      const newLongitude = snapshot.val();
      if (newLongitude !== null) {
        setLongitude(newLongitude.toString());
        updateMap(newLongitude, latitude);
      }
    });
    
    locaisRef.child('latitude').on('value', (snapshot) => {
      const newLatitude = snapshot.val();
      if (newLatitude !== null) {
        setLatitude(newLatitude.toString());
        updateMap(longitude, newLatitude);
      }
    });
  };

  // Chamado uma vez ao carregar o componente para buscar os dados iniciais e adicionar o listener
  useEffect(() => {
    fetchData();
  }, []);

  // Inicializa o mapa
  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 15,
      });

      const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
      setMarker(marker);
      setMap(map);

      // Event listener para clicar no mapa e atualizar as coordenadas
      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        setLongitude(lng.toFixed(6));
        setLatitude(lat.toFixed(6));
      });

      // Atualiza o mapa e o marcador com as coordenadas iniciais
      updateMap(longitude, latitude);
    };

    if (!map && longitude !== '' && latitude !== '') {
      initializeMap();
    }
  }, [map, longitude, latitude]);

  // Atualiza a localização do mapa e do marcador
  const updateMap = (newLongitude, newLatitude) => {
    if (map && marker) {
      marker.setLngLat([newLongitude, newLatitude]);

      // Verifica o valor do status para mostrar ou ocultar o marcador
      if (status === 0) {
        marker.remove(); // Remove o marcador do mapa
      } else {
        marker.addTo(map); // Adiciona o marcador ao mapa
      }

      map.flyTo({
        center: [newLongitude, newLatitude],
        zoom: 1,
        maxBounds: [
          [-180, -85],
          [180, 85]
        ],
      });
    }
  };

  // Adiciona a chamada à função updateMap() no useEffect de inicialização do mapa
  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 15,
      });

      const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
      setMarker(marker);
      setMap(map);

      // Event listener para clicar no mapa e atualizar as coordenadas
      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        setLongitude(lng.toFixed(6));
        setLatitude(lat.toFixed(6));
      });

      // Atualiza o mapa e o marcador com as coordenadas iniciais
      updateMap(longitude, latitude);
    };

    if (!map && longitude !== '' && latitude !== '') {
      initializeMap();
    } else if (map && marker) {
      updateMap(longitude, latitude); // Adiciona a chamada para atualizar o mapa e o marcador
    }
  }, [map, longitude, latitude]);

  return (
    <div className="App">
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
      <div className="input-container">
        <input
          placeholder="Enter your longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <br /><br />
        <input
          placeholder="Enter your latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <br /><br />
        <button onClick={push}>PUSH</button>
        <button onClick={toggleStatus}>{status === 1 ? 'Turn Off GPS' : 'Turn On GPS'}</button>
      </div>
    </div>
  );
}

export default App;
