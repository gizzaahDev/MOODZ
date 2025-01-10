import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';

export const icon = {
    index: (props: any) => <Feather name="home" size={24}  {...props} />,
    ongoingTask: (props: any) => <MaterialIcons name="pending-actions" size={24}  {...props} />,
    progress: (props: any) => <FontAwesome name="paper-plane-o" size={24}  {...props} />,
    userProfile: (props: any) => <Feather name="user" size={24} {...props} />,
  }
  export default icon;