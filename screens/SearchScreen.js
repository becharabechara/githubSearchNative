import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {setLocalStorageRepos} from '../components/Locals/localStorage';
import CustomSearchBar from '../components/SearchPage/CustomSearchBar';

const TOKEN = require('./token.json').TOKEN;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    getStartedText: {
        fontSize: 30,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 40,
        textAlign: 'center',
    }
});


export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedUser: {
                name: "",
                photo: ""
            },
            repositories: [],
            search :""
        }
    }
    static navigationOptions = {
        header: null,
    };

    getUserRepos = async username => {
        try {
            if(username !== "" || username !== undefined || username !== null){
                const response = await axios.get(`https://api.github.com/users/${username}?access_token=${TOKEN}`);
                const result = response.data;
                if (result.login !== undefined) {
                    const reponse = await axios.get(`https://api.github.com/users/${username}/repos?access_token=${TOKEN}`);
                    const repos = reponse.data;
                    this.setState({
                        loggedUser: {
                            name: result.login,
                            photo: result.avatar_url
                        },
                        repositories: repos.map(rep => {
                            return {
                                id: rep.id,
                                name: rep.name,
                                language: rep.language,
                                description: rep.description,
                                created_at: rep.created_at,
                                updated_at: rep.updated_at,
                                url: rep.url
                            };
                        })
                    });
                   setLocalStorageRepos(this.state.repositories);
                }
            }
        }
        catch (exception) {
            console.log(exception);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.getStartedContainer}>
                        <Text style={styles.getStartedText}>Github SearchPage</Text>
                    </View>
                    <View style={styles.container}>
                        <CustomSearchBar handleSubmit={this.getUserRepos} {...this.props}/>
                        <View style={styles.container}>
                            {
                                this.state.loggedUser.name === "" ?
                                    null
                                    : <View style={styles.container}>
                                        <UserProfile loggedUser={this.state.loggedUser} {...this.props}/>
                                        {/*<UserReposList repositories={this.state.repositories} sendRepositoryDetails={this.props.sendRepositoryDetails} {...this.props} />*/}
                                    </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}