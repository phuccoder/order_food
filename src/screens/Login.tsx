import React, { useState, useEffect, FC } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TextField } from '../components'
import { ButtonWithTitle } from '../components/ButtonWithTitle'
import { connect } from 'react-redux'

import { 
    ApplicationState, 
    OnUserLogin, 
    UserState, 
    onOtpRequest, 
    onVerifyOtp,
    OnUserSignUp
} from '../redux'

import { useNavigation } from '../utils'

interface LoginProps { 
    OnUserLogin: Function,
    userReducer: UserState,
    onOtpRequest: Function,
    onVerifyOtp: Function,
    OnUserSignUp: Function
}

const _Login: FC<LoginProps> = ({ 
    OnUserLogin,
    userReducer,
    onOtpRequest,
    onVerifyOtp,
    OnUserSignUp
}) => {

    const { navigate } = useNavigation()

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('Login')
    const [isSignUp, setIsSignUp] = useState(false)
    const [otp, setOtp] = useState('')
    const [verified, setVerified] = useState(true)
    const [requestOtpTitle, setRequestOtpTitle] = useState('Resend in ')
    const [canRequestOtp, setCanRequestOtp] = useState(true)
    const { Cart, user } = userReducer

    let countDown: number

    useEffect(() => {
        if (user.verified !== undefined) {
            if (user.verified === true) {
                navigate('CartPage')
            } else {
                setVerified(user.verified)
            }
        }
        onEnableOtpRequest()
        return () => {
            clearInterval(countDown)
        }
    }, [user])
    
    const onTapAuthenticate = () => {
        if (isSignUp) {
            OnUserSignUp(email, phone, password)
        } else {
            OnUserLogin(email, password)
        }
        setVerified(false)
    }

    const onTapOptions = () => {
        setIsSignUp(!isSignUp)
        setTitle(!isSignUp ? 'Sign Up' : 'Log In')
    }

    const onEnableOtpRequest = () => {
        const otpDate = new Date()
        otpDate.setTime(new Date().getTime() + ( 2 * 60 * 1000 ))
        const otpTime = otpDate.getTime()

        countDown = setInterval(() => {
            const currentTime = new Date().getTime()
            const totalTime = otpTime - currentTime

            let seconds = Math.floor(totalTime % (1000 * 60) / 1000)

            setRequestOtpTitle(`Resend in 0:${seconds}`)

            if (seconds < 1) {
                setCanRequestOtp(true)
                setRequestOtpTitle('Request a new OTP')
                clearInterval(countDown)
            }
        }, 1000)
    }

    const onTapVerify = () => {
        onVerifyOtp(otp, user)
    }

    const onTapRequestNewOtp = () => {
        setCanRequestOtp(false)
        onOtpRequest(user)
    }

    if (!verified) {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Image 
                        source={require('../images/verify_otp.png')} 
                        style={{ width: 120, height: 120, margin: 20 }}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>
                        Verification
                    </Text>
                    <Text style={{ fontSize: 16, margin: 5, color: '#716f6f' }}>
                        Enter your OTP sent from your phone
                    </Text>
                    <TextField
                        placeholder='OTP'
                        onTextChange={setOtp}
                        isOtp
                    />
                    <ButtonWithTitle
                        title='Submit'
                        onTap={onTapVerify}
                        width={150}
                        height={40}
                    />
                    <ButtonWithTitle
                        isNoBg
                        disable={canRequestOtp}
                        title={requestOtpTitle}
                        onTap={onTapRequestNewOtp}
                        width={120}
                        height={40}
                    />
                </View>
                <View style={styles.footer}></View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Text style={{ fontSize: 30, fontWeight: '400'}}>
                        {title}
                    </Text>
                </View>
                <View style={styles.body}>
                    <TextField placeholder="Email ID" onTextChange={setEmail} isSecure={false} />
    
                    {isSignUp && 
                        <TextField placeholder="Phone Number" onTextChange={setPhone} isSecure={false} />
                    }
    
                    <TextField placeholder="Password" onTextChange={setPassword} isSecure={true} />
    
                    <ButtonWithTitle title={title} height={50} width={350} onTap={onTapAuthenticate} />
                    
                    <ButtonWithTitle 
                        title={!isSignUp ? "No Account? Sign Up Here" : "Have an Account? Log In Here"} 
                        height={50}
                        width={350} 
                        onTap={onTapOptions} 
                        isNoBg={true} 
                    />
                </View>
                <View style={styles.footer}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1,},
    navigation: { flex: 3, justifyContent: 'center', paddingLeft: 30},
    body: { flex: 6, justifyContent: 'center', alignItems: 'center'},
    footer: { flex: 3 }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

export const LoginScreen = connect(mapStateToProps, { 
    OnUserLogin, 
    onOtpRequest, 
    onVerifyOtp,
    OnUserSignUp
})(_Login)
