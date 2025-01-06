import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '../Components/TabBar/TabBar'

const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name='index' options={{title:'Home',headerShown:false}} />
        <Tabs.Screen name='ongoingTask' options={{title:'Ongoing Task'}}/>
        <Tabs.Screen name='progress' options={{title:'Progress'}}/>
        <Tabs.Screen name='userProfile' options={{title:'Profile'}}/>
    </Tabs>
  )
}

export default TabLayout