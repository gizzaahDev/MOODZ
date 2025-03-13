import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../ThemeContext';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';

const storyContent = `Geriatric Therapy

How to Help Older Adults With Depression.

As people live longer, emotional and mental health issues like depression are becoming more common in older adults. Luckily, there are many effective ways to help manage depression and support emotional well-being in older people.

This article explains geriatric therapy, depression in older adults, and some activities that can help. The goal is to help older individuals maintain a high quality of life, feel strong, and enjoy good health in their later years.

This Article Contains:
1️⃣ What Is Geriatric Therapy?
2️⃣ How to Help Older Adults With Depression
3️⃣ 9 Therapy Intervention Ideas
4️⃣ A Look at Geriatric Group Therapy
5️⃣ Helpful Activities

✅ What Is Geriatric Therapy?

Geriatric therapy focuses on mental health care for individuals over 60. Many older people experience mental health issues like depression, anxiety, and cognitive decline. These challenges can stem from poor health, loneliness, chronic pain, and other difficulties related to aging. Thankfully, there are many therapies and interventions that can improve the mental well-being of older adults.

✅ How to Help Older Adults With Depression

Depression is one of the most common issues among older adults. Factors such as illness, social isolation, and cognitive impairment can increase the risk of depression. Studies show that depression in seniors can range from mild to severe, with some studies finding depression rates as high as 42% in nursing homes.

Fortunately, there are treatment options that can help. Many treatments aim to improve day-to-day life, manage stress, and encourage positive thinking. Some of these treatments include psychotherapy, cognitive-behavioral therapy (CBT), and physical activity.

✅ 9 Therapy Intervention Ideas
Here are 9 types of therapy that can be helpful for older individuals with depression:

1. **Interpersonal Therapy (IPT)**  
This therapy focuses on improving relationships and social interactions, which can help reduce depression. IPT has shown promise in helping seniors cope with grief, loss, and transitions.

2. **Cognitive-Behavioral Therapy (CBT)**  
CBT helps change negative thought patterns and behaviors that contribute to depression. Research shows that it is effective in treating depression in older adults by improving coping skills and providing a more positive outlook on life.

3. **Exercise Training**  
Physical activity is essential for both emotional and physical health. Exercise can improve strength, balance, and mood. Studies show that regular exercise can reduce depression symptoms among older adults.

4. **Occupational Therapy (OT)**  
OT helps seniors with daily tasks and activities, improving their independence and quality of life. It can reduce stress and promote positive mental health.

5. **Animal-Assisted Therapy**  
Pets can help reduce stress and loneliness in older adults. Many seniors find comfort and joy in caring for animals, and studies have shown that pets can improve mental health and emotional well-being.

6. **Music Therapy (MT)**  
Listening to music or participating in music therapy can help reduce depression and anxiety. Music has been shown to improve mood and foster social connections in elderly individuals.

7. **Laughter Therapy**  
Laughter is known to reduce stress and improve emotional health. Laughing helps relax the body and can promote feelings of happiness and well-being.

8. **Art Therapy**  
Expressing oneself through art can be therapeutic for older individuals. It can reduce anxiety, boost self-esteem, and provide a sense of accomplishment.

9. **Reminiscence Therapy (RT)**  
This therapy involves recalling past memories, often with the help of photos or other triggers. RT can help older individuals connect with their past, improve mood, and reduce depression.

✅ A Look at Geriatric Group Therapy

Group therapy provides a supportive environment for older individuals to share their experiences and connect with others. It can be especially helpful for reducing feelings of isolation and fostering a sense of belonging.

✅ Helpful Activities

There are many things that older individuals can do to promote mental and emotional health. Here are some ideas:

1. Stay physically active (walking, yoga, swimming).
2. Keep your mind active (puzzles, reading, games).
3. Be social and join community groups or clubs.
4. Enjoy hobbies like gardening, painting, or playing music.
5. Spend time with pets.
6. Give back to the community by volunteering.
7. Go on outings and enjoy new experiences.
8. Practice mindfulness through meditation or yoga.
9. Connect with nature through walks or outdoor activities.
10. Stay involved in local politics or causes you care about.
11. Seek professional help if needed.

By staying active, social, and engaged, older adults can maintain their mental and emotional well-being as they age.`;

const Story1GDS = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const handleGDSHomePress = () => {
    router.replace("/Components/GDS/Day2/GDSDay3");
  };

  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}> 
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Stress & Burnout Prevention</Text>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.imgcontainerday1}>
              <Text style={styles.storyText}>{storyContent}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleGDSHomePress}>
            <Text style={styles.backButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  startcontainer: { flex: 1 },
  textcontainer: { marginTop: 70, padding: 16, alignItems: 'center' },
  text_welcome: { fontFamily: 'roboto', fontSize: 30, marginBottom: 20 },
  scrollContainer: { maxHeight: 550 },
  imgcontainerday1: {
    width: 375,
    padding: 20,
    borderRadius: 10,
    borderColor: "#016A70",
    borderWidth: 2,
    backgroundColor: '#E8F6EF',
  },
  storyText: { fontSize: 22, textAlign: 'left', fontWeight: 'bold', lineHeight: 30 },
  backButtonContainer: { alignItems: 'center', marginTop: 20 },
  backButton: {
    borderRadius: 40,
    width: 140,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#016A70',
    borderWidth: 1,
    borderColor: '#016A70',
  },
  backButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
});

export default Story1GDS;