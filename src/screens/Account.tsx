import React, { FC } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    ScrollView
} from 'react-native'

import { connect } from 'react-redux'

import { 
    ApplicationState,
    ShoppingState,
    UserState,
    onUserLogout
} from '../redux'

import { useNavigation } from '../utils'

import { LoginScreen } from '../screens/Login'

interface AccountScreenProps { 
    userReducer: UserState
    shoppingReducer: ShoppingState
    onUpdateCart: Function
    onCreateOrder: Function
    onUserLogout: Function
}

const _Account: FC<AccountScreenProps> = (props) => {

    const { navigate } = useNavigation()

    const { user } = props.userReducer

    const options = [
        {
            title: 'Edit profile',
            action: () => alert('Coming soon...')
        },
        {
            title: 'View orders',
            action: () => navigate('ViewOrderFromAccountPage')
        },
        {
            title: 'Contact support',
            action: () => alert('Coming soon...')
        },
        {
            title: 'Logout',
            action: () => props.onUserLogout()
        }
    ]

    const optionView = (title: string, action: Function) => {
        return (
            <TouchableOpacity
                onPress={() => action()}
                key={title}
                style={{
                    backgroundColor: '#FFF',
                    height: 80,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    margin: 5
                }}
            >
                <Text style={{ fontSize: 18, color: '#525252', padding: 20, fontWeight: '500' }}>
                    {title}
                </Text>
                <Image 
                    source={require('../images/arrow_icon.png')}
                    style={{ width: 20, height: 20 }}
                />
            </TouchableOpacity>
        )
    }

    if (user.verified) {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}> 
                    <View>
                        <Image source={require('../images/avatar.png')} style={{  width: 100, height: 100 }}/>
                    </View>
                    <View style={{padding: 10}}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                            {user.firstName || 'Name is not set'}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {user.email}
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <ScrollView>
                        {options.map(option => {
                            return optionView(option.title, option.action)
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    } else {
        return <LoginScreen />
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2'},
    navigation: { 
        flex: 3, 
        marginTop: 43, 
        padding: 10,
        paddingLeft: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    body: { flex: 9, display: 'flex' }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

export const AccountScreen = connect(mapStateToProps, { onUserLogout })(_Account)