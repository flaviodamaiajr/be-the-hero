import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';
import beTheHeroLogo from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length == total) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.get('incidents', {
        params: {page},
      });
      setIncidents([...incidents, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
    } catch {
      Alert.alert(
        'Ocorreu uma exceção',
        'Não foi possível carregar os incidentes. Tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={beTheHeroLogo}></Image>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>casos {total}</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              {/* <Icon name="arrow-right" size={16} color="#E02041"></Icon> */}
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
