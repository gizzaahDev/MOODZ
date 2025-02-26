import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { BlurView } from 'expo-blur';

interface Article2Props {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const Article2: React.FC<Article2Props> = ({ modalVisible, setModalVisible }) => {
    const { theme } = useTheme() as { theme: any };

    // Full article content
    const articleContent = `
Introduction
Elderly depression is a significant mental health concern that affects many older adults. While it is normal for seniors to experience occasional sadness or emotional distress, persistent depression can severely impact their quality of life. Depression in the elderly often goes undiagnosed or is mistaken for the natural aging process. Recognizing the causes, symptoms, and treatments of elderly depression is essential to provide the necessary support and improve mental well-being. The Geriatric Depression Scale (GDS) is a widely used tool to assess depression in older adults, helping healthcare professionals identify those in need of intervention.

Chapter 1: Causes of Elderly Depression
Elderly depression is influenced by a range of biological, psychological, and social factors. Understanding these causes can help in developing appropriate preventive and treatment strategies.

1.1 Biological Factors
Aging-related changes in brain chemistry, including reduced levels of neurotransmitters like serotonin and dopamine, can contribute to depression. Chronic medical conditions such as heart disease, diabetes, and neurodegenerative disorders (e.g., Alzheimer’s disease and Parkinson’s disease) also increase the risk of depression in older adults. Additionally, medication side effects from certain blood pressure drugs, pain relievers, and steroids may trigger depressive symptoms.

1.2 Psychological Factors
The loss of independence, declining cognitive function, and fear of mortality can lead to feelings of hopelessness and sadness. Many elderly individuals experience grief due to the loss of a spouse, close friends, or family members, which can contribute to prolonged depression. Loneliness and social isolation are also common psychological triggers, as seniors may have fewer social interactions compared to their younger years.

1.3 Social and Environmental Factors
A lack of social support, financial difficulties, and living alone can contribute to elderly depression. Retirement may bring a sense of purpose loss, leading to feelings of emptiness and reduced self-worth. Additionally, seniors in assisted living facilities or nursing homes may struggle with adjustment issues and experience emotional distress due to unfamiliar environments and reduced autonomy.

Chapter 2: Symptoms of Elderly Depression
Elderly depression presents with a variety of emotional, cognitive, behavioral, and physical symptoms, some of which may be mistaken for normal aging.

2.1 Emotional Symptoms
- Persistent sadness or feelings of emptiness
- Increased irritability or frustration
- Loss of interest in previously enjoyed activities
- Feelings of guilt, worthlessness, or helplessness

2.2 Cognitive Symptoms
- Difficulty concentrating and making decisions
- Memory problems or confusion, which may mimic dementia
- Recurrent negative thoughts, including thoughts of death or suicide

2.3 Behavioral Symptoms
- Withdrawal from social activities and family interactions
- Changes in appetite, leading to weight loss or gain
- Decreased motivation to complete daily tasks

2.4 Physical Symptoms
- Fatigue and decreased energy levels
- Sleep disturbances, including insomnia or excessive sleeping
- Unexplained aches and pains, such as headaches or joint discomfort

Chapter 3: The Geriatric Depression Scale (GDS)
The GDS is a validated screening tool designed to assess depression in older adults. It consists of a series of questions that evaluate mood, activity levels, and feelings of well-being.

3.1 Structure of the GDS
The GDS is available in different versions, including a 30-question long form and a 15-question short form. The questions require simple “yes” or “no” responses, making it accessible for elderly individuals, even those with mild cognitive impairment.

3.2 Scoring and Interpretation
- Score 0-5: Normal (no significant depression)
- Score 6-10: Mild depression
- Score 11-15: Moderate to severe depression
A higher score indicates a greater likelihood of depression, and individuals scoring above the threshold should seek professional evaluation and intervention.

Chapter 4: Treatment Options
Effective treatment of elderly depression involves a combination of therapy, medications, and lifestyle modifications tailored to the individual’s needs.

4.1 Psychotherapy
Cognitive Behavioral Therapy (CBT) is widely used to help seniors challenge negative thought patterns and develop coping mechanisms. Reminiscence therapy, which encourages elderly individuals to recall positive past experiences, can also improve mood and self-esteem.

4.2 Medications
Selective Serotonin Reuptake Inhibitors (SSRIs), such as sertraline and fluoxetine, are commonly prescribed to manage depression in older adults. It is essential to monitor for side effects and interactions with other medications commonly used by seniors.

4.3 Lifestyle Modifications
- Regular physical activity, such as walking or light exercises, can enhance mood.
- Engaging in social activities and community programs helps reduce feelings of loneliness.
- Maintaining a nutritious diet rich in vitamins and minerals supports brain health.
- Relaxation techniques, such as meditation or deep breathing exercises, promote emotional well-being.

Chapter 5: Coping Strategies and Support
5.1 Strengthening Social Connections
Encouraging seniors to participate in social groups, volunteer work, or religious activities can improve their emotional well-being. Family involvement is crucial in providing emotional support and companionship.

5.2 Encouraging Independence
Helping seniors maintain a sense of purpose by setting achievable goals and engaging in hobbies can boost self-esteem. Encouraging autonomy in daily tasks fosters a sense of control and accomplishment.

5.3 Seeking Professional Help
When symptoms of depression persist or worsen, it is important to consult healthcare professionals. Geriatric psychiatrists, counselors, and support groups can offer specialized care to address elderly mental health concerns.

Conclusion
Elderly depression is a serious yet treatable condition that requires awareness, timely diagnosis, and appropriate intervention. The use of the Geriatric Depression Scale (GDS) can help in early identification, ensuring that affected individuals receive the necessary support. With a combination of therapy, medications, social engagement, and lifestyle changes, older adults can lead fulfilling and emotionally healthy lives.

References
- American Psychiatric Association (2023). Mental Health and Aging.
- Mayo Clinic (2023). Depression in Older Adults.
- World Health Organization (2023). Mental Health in Later Life.
`;

    // Function to format content
    const formatContent = (content: string) => {
        return content.split("\n").map((line, index) => {
            // If line starts with "Chapter" or "Introduction", make it bold
            if (line.startsWith("Chapter") || line === "Introduction") {
                return <Text key={index} style={[styles.sectionTitle, { color: theme.title }]}>{line}</Text>;
            }
            // Regular text (not headings)
            return <Text key={index} style={[styles.pageText, { color: theme.textPopup }]}>{line}</Text>;
        });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Close modal
        >
            <BlurView intensity={10} tint="dark" style={[styles.modalContainer,{backgroundColor:theme.bgColorPopup}]}>
                <Text style={[styles.titleText,{ color: theme.textPrimary }]}>Elderly depression Article</Text>
                <View style={[styles.modalContent, { backgroundColor: theme.modalBackground }]}>
                    <ScrollView showsVerticalScrollIndicator={true}>
                        {formatContent(articleContent)}
                    </ScrollView>

                    {/* Close Button */}
                    <TouchableOpacity
                        style={[styles.closeButton, { backgroundColor: theme.buttonBackground }]}
                        onPress={() => setModalVisible(false)} // Close modal
                    >
                        <Text style={[styles.closeButtonText, { color: theme.buttonText }]}>Close</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent background for blur
    },
    modalContent: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
        padding: 8,
    },
    titleText: {
        fontSize: 20,
        fontWeight:'bold'
  },
    pageText: {
        fontSize: 16,
        textAlign: 'justify',
        lineHeight: 24,
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    closeButton: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: '#000',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Article2;
