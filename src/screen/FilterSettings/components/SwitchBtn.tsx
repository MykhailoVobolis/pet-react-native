import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../constants/fonts';

interface IItems {
  items: {
    text: string;
    icon?: JSX.Element;
    id: string | boolean;
  }[];
  active: string | boolean;
  handleSwitch: (text: {id: string | boolean}) => void;
}
export default function SwitchBtn({items, active, handleSwitch}: IItems) {
  return (
    <View style={styles.switcherWrapper}>
      {items.map(i => (
        <TouchableOpacity
          onPress={() => handleSwitch(i)}
          style={active === i.id ? styles.activeBtn : styles.nonActiveBtn}>
          {!!i.icon && <View style={styles.iconContainer}>{i.icon}</View>}
          <View style={[styles.textContainer, !!i.icon && {flex: 0.8}]}>
            <Text style={styles.btnText}>{i.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  switcherWrapper: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#EAE9FB',
    height: 50,
    alignItems: 'center',
  },
  activeBtn: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    gap: 20,
  },
  btnText: {
    fontFamily: fonts.MontserratRegular,
    color: '#0B0B0B',
  },
  nonActiveBtn: {
    gap: 20,
    flex: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 50,
  },
  iconContainer: {flex: 0.05},
  textContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
