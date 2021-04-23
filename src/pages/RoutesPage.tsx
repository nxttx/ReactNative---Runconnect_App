import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import {Route} from '../core/domain/Route';
import {RouteMapper} from '../core/mapper/RouteMapper';
import {RouteAPI} from '../core/api/RouteAPI';

const RoutesPage: React.FC = (): JSX.Element => {
  const [routes, setRoutes] = useState<Route[] | undefined>();
  const [highlightedRoute, setHighlightedRoute] = useState<Route | undefined>();

  useEffect(() => {
    const getAllRoutes: Function = async (): Promise<void> => {
      const fetchedRoutes = await RouteAPI.getRoutes();
      setRoutes(fetchedRoutes);
      setHighlightedRoute(fetchedRoutes[0]);
    };

    getAllRoutes();
  }, []);

  return (
    <ScrollView>
      {highlightedRoute !== undefined && (
        <Maps
          mapsLine={RouteMapper.toMapsLine(highlightedRoute)}
          mapsPoint={RouteMapper.toMapsPoint(highlightedRoute)}
          center={highlightedRoute.middlePoint}
          zoom={highlightedRoute.zoomLevel}
        />
      )}
      <Text style={styles.routesTitle}>Kies een route</Text>
      {routes !== undefined &&
        routes.map(route => (
          <RouteInformation
            isActive={route.id === highlightedRoute?.id}
            key={route.id}
            route={route}
            setHighlightedRoute={setHighlightedRoute}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  routesTitle: {
    textAlign: 'center',
    marginVertical: 18,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RoutesPage;
