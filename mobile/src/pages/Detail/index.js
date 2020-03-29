import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import beTheHeroLogo from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const message = `Olá ${
    incident.name
  }! Estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${formatCurrency(incident.value)}`;

  function formatCurrency(value) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    Linking.openURL(
      `mailto:${incident.email}?subject=Herói do caso: ${incident.title}&body=${incident.email}`,
    );
  }

  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={beTheHeroLogo}></Image>
        <TouchableOpacity onPress={navigateBack}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city} - {incident.state}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {formatCurrency(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>
          Entre em contato: {incident.whatsapp}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
