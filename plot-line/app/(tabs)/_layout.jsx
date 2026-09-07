import React from 'react'
import { Tabs } from 'expo-router'
import { Colors } from '@/components/styles.jsx'
import { Ionicons } from '@expo/vector-icons'

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: Colors?.primary,
          borderTopColor: Colors?.brand,
          borderTopWidth: 2,
          height: 80
        },
        tabBarItemStyle: {
          margin: 1,
          padding: 1
        },
        tabBarInactiveTintColor: Colors?.tertiary + "cc",
        tabBarActiveTintColor: Colors?.brand,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({size, color}) => {
          let iconName;
          if (route.name === 'home') {
            iconName = 'home'
          } else if (route.name === 'search') {
            iconName = 'search'
          } else if (route.name === 'reading-list') {
            iconName = 'list'
          } else if (route.name === 'profile') {
            iconName = 'person'
          }
          return <Ionicons name={iconName} size={size} color={color}/>

        },
      })}
    >
      <Tabs.Screen name="home" options={{title: 'Home'}}/>
      <Tabs.Screen name="search" options={{title: 'Search'}}/>
      <Tabs.Screen name="reading-list" options={{title: 'Reading List'}}/>
      <Tabs.Screen name="profile" options={{title: 'Profile'}}/>
    </Tabs>
  )
}



export default TabLayout

