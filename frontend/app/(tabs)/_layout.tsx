import { StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'



const TabLayout = () => {
  return (
    <>
        <Tabs>
            <Tabs.Screen 
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                }}
            />
        </Tabs>
    </>
  )
}

export default TabLayout

const styles = StyleSheet.create({})