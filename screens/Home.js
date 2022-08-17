import React, {useState} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Modal, 
  TextInput,
  Alert
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [data, setData] = useState([]);
  const renderItem = ({item, index}) => {
    return(      
      <View style={styles.taskItem}>
        <View style={styles.itemLeft}>
          <CheckBox
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            disabled={false}
            value={item.active}
            onValueChange={(newValue) => setToggleCheckBox(newValue, index)}
          />
          <Text style={[
              styles.listTitle,
              {textDecorationLine: item.active ? 'line-through' : 'none'}
            ]}>{item.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteTask(index)}>
          <Image
            source={require('./../assets/delete.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const openModal = () => {
    setIsModalVisible(true);
    setTitle('');
  };

  const saveTitle = () => {
    if (title === "") {
      Alert.alert('Hello Aurelia!!', 'What do you want to buy?');
      return;
    } else {
      let newArr = [...data];
      newArr.push({id: newArr.length + 1, title: title, active: false})
      setData(newArr);
      setIsModalVisible(false);
    }
  };

  const setToggleCheckBox = (value, index) => {
    let newArr = [...data];
    newArr[index].active = !newArr[index].active;
    setData(newArr);
  }

  const deleteTask = (index) => {
    let newArr = [...data];
    newArr.splice(index, 1);
    setData(newArr);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <Text style={styles.title}>What's up, Aurelia!</Text>
        <Text style={styles.subTitle}>Shopping list:</Text>
        <FlatList data={data} renderItem={renderItem} style={styles.listWrapper}/>
        <TouchableOpacity style={styles.AddBtnWrapper} onPress={openModal}>
          <Image 
          source={require('./../assets/add.png')}/>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal 
        animated
        animationType="slide"
        transparent
        visible={isModalVisible}>
        <View style={styles.modalContentWrapper}>
          <Text style={styles.textBtnWrapper}>Happy Shopping...</Text>
          <TouchableOpacity
            style={styles.closeBtnWrapper}
            onPress={() => setIsModalVisible(false)}>
            <Image
              style={styles.closeIcon}
              source={require('./../assets/cancel.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: '#dbdbdb',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder={'What do you want to buy?'}
              onChangeText={(text) => setTitle(text)}
            />            
            <TouchableOpacity style={styles.btnWrapper} onPress={saveTitle}>
              <Text style={styles.textBtnSaveWrapper}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  subTitle: {
    fontSize: 16,
  },
  listWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  AddBtnWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  addIcon: {
    width: 50,
    height: 50,
  },
  modalContentWrapper: {
    height: '30%',
    marginTop: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  closeIcon: {
    marginHorizontal: 20,
    marginVertical: 10,
    width: 30,
    height: 30,
  },
  textBtnWrapper: {
    color: '#161616',
    position: 'absolute',
    marginHorizontal: 20,
    marginVertical: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeBtnWrapper: {
    alignItems: 'flex-end',
  },
  inputWrapper: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  textInput: {
    padding: 10,
    color: '#000000',
    backgroundColor: '#F3F3F3',
    fontSize: 16,
    borderRadius: 10,
  },
  btnWrapper: {
    backgroundColor: '#161616',
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  textBtnSaveWrapper: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  listTitle: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});