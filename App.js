import { StyleSheet, Text, TextInput, View, Button, FlatList, Image } from 'react-native';
import React from 'react';
import { useState, Alert } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setRepositories(data.meals))
    .then(console.log(repositories))
    .catch(error => {
      alert('Error', error);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
      <View style={styles.container}>
        <TextInput 
          style={{fontSize: 15, width: 200, borderWidth: 1}}
          placeholder='Type an ingredient'
          onChangeText={text => setKeyword(text)}
        />
        <Button title="Search" onPress={getRepositories}/>
          <FlatList 
            keyExtractor={(item, index ) => index.toString()}
            numColumns={2}
            horizontal={false}
            style={{width: "100%"}}
            renderItem={({item}) => 
              <View style={{ width: "100%"}}>
                <Text
                  style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}
                </Text>
                <Image 
                  source={{ uri: item.strMealThumb}}
                  style={{
                    width:70,
                    height:70,
                    borderWidth:2,
                    borderColor:'#d35647',
                    margin:8
                }}
                />
              </View>}
            data={repositories}
            ItemSeparatorComponent={listSeparator}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 70
  },
});
