import React, { Component } from 'react';
import { View, Platform, Image, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { 
    Card, 
    CardItem, 
    Thumbnail, 
    Text, 
    Button, 
    Icon, 
    Left, 
    Body, 
    Right 
} from 'native-base';
import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';
import _ from 'lodash';

class Home extends Component {
    state = { postList: [] }

    componentDidMount() {
        firebase.database().ref(`/posts`)
        .on('value', snapshot => {
           console.log(snapshot.val())
           var postList = []
            _.map(snapshot.val(), (val, id) => {
                firebase.database().ref(`/users/${val.userId}`)
                .once('child_added', (snapshot) => {
                    var value = snapshot.val()
                    console.log(value)
                    postList.push({ 
                        ...val, 
                        id, 
                        username: value.displayName, 
                        userPhoto: value.photoURL 
                    })
                    this.setState({ postList })
                })
            });
        });
    }

    renderPostList = () => {
        return this.state.postList.map((item) => {
            return (
                <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: item.userPhoto }} />
                                <Body>
                                    <Text>{item.username}</Text>
                                    <Text note>Instagrin User</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: item.imageURL }} style={{height: 350, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>{item.caption}</Text>
                            </Left>
                        </CardItem>
                    </Card>
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{ text: 'Instagrin', style: { color: 'black', fontSize: 18 } }}
                    leftContainerStyle={{ flex: 3 }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
                    }}
                />
                <ScrollView>
                    {this.renderPostList()}
                </ScrollView>
            </View>
        )
    }
}

export default Home;