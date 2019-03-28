import React from 'react';
import { ListItem } from 'react-native-elements';

export default class UserProfile extends React.Component {
    render() {
        const { name, photo } = this.props.loggedUser;
        return (
            <ListItem
                leftAvatar={{
                    title: name[0],
                    source: { uri: photo },
                    showEditButton: true,
                }}
                title={name}
            />
        )
    }
}