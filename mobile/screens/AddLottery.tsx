import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import Form from '../components/Form';
import { AddLotteryNavigationProp } from '../types';
import { colors } from '../colors';

const AddLottery = () => {
  const navigation = useNavigation<AddLotteryNavigationProp>();
  const toast = useToast();

  const onSubmit = () => {
    toast.show('New lottery added successfully!');
  };

  const onNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', default: 'height' })}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Form onSubmit={onSubmit} onNavigateBack={onNavigateBack} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddLottery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
});
