import React from 'react';
import { ListView,Text,StyleSheet,View,Modal,TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 'auto',
    },
    rowText:{
        textAlign: 'center',
        margin:'auto',
        flex:1,
        paddingTop: 10,
        backgroundColor:'#ffe'
    }
});

const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>r1 !== r2});

export default class UserReposList extends React.Component {
    state = {
        modal:{},
        modalVisible: false,
    };

    
    setModalVisible(selectedModal) {
    this.setState({modal: selectedModal, modalVisible:true});
    }

    setModalUnvisible() {
        this.setState({modal:'', modalVisible:false});
    }

    render() {
        const elems = ds.cloneWithRows(this.props.repositories)
        return (
            <View style={styles.container}>
                <ListView 
                    dataSource={elems}
                    renderRow={(repo)=><Text onPress={()=>{this.setModalVisible(repo);}} style={styles.rowText} >{repo.name}</Text>}
                />
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={()=>this.setModalUnvisible()}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>{this.state.modal.name}</Text>
                            <Text>{this.state.modal.language}</Text>
                            <Text>{this.state.modal.description}</Text>
                            <Text>{this.state.modal.created_at}</Text>
                            <Text>{this.state.modal.updated_at}</Text>
                            <Text>{this.state.modal.url}</Text>
                            <TouchableHighlight style={{paddingTop:20}} onPress={()=>this.setModalUnvisible()}>
                                <Text>Close Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
