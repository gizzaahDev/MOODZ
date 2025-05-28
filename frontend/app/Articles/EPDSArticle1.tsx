import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { BlurView } from 'expo-blur';

interface Article1Props {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const Article1: React.FC<Article1Props> = ({ modalVisible, setModalVisible }) => {
    const { theme } = useTheme() as { theme: any };

    // Full article content
    const articleContent = `
Introduction
Postpartum depression (PPD) is a serious and common mental health condition that affects many women after childbirth. While it's natural for new mothers to experience temporary mood swings, crying spells, and anxiety in the first couple of weeks following childbirth, postpartum depression goes beyond these fleeting emotions. PPD can last for months, and if untreated, it may severely impact the mother's ability to care for herself and her newborn. It’s important to understand the causes, symptoms, and treatments of PPD to support those who are suffering from it.

Chapter 1: Causes of Postpartum Depression
Postpartum depression is caused by a combination of various biological, psychological, and social factors. It does not happen due to a single reason, and each woman's experience may differ.

1.1 Hormonal Changes
After giving birth, a woman's hormone levels drop significantly, including estrogen and progesterone. These drastic changes in hormone levels can affect neurotransmitters in the brain, particularly serotonin, which plays a key role in regulating mood, emotions, and sleep. This chemical imbalance can trigger depressive symptoms.
1.2 Emotional Factors
The emotional strain of becoming a new mother can contribute to PPD. Many women experience feelings of self-doubt, fear of not being a good enough parent, and overwhelming pressure to meet the demands of caring for a newborn. These emotions can lead to feelings of sadness, guilt, or inadequacy.
1.3 Physical Factors
Physical pain or complications from childbirth, including vaginal tearing, cesarean section recovery, or issues with breastfeeding, can also contribute to postpartum depression. Exhaustion from the delivery process, combined with lack of sleep and physical recovery, can make emotional well-being more fragile during this time.
1.4 Lifestyle and Social Factors
Support systems (or lack thereof) play a major role in postpartum mental health. A lack of emotional or physical support from family or friends, financial stress, or feeling isolated in the first few weeks postpartum can increase the risk of developing PPD. In addition, significant life changes or difficult circumstances, such as marital stress or living in a stressful environment, can make a woman more vulnerable to depression.

Chapter 2: Symptoms of Postpartum Depression
The symptoms of PPD can vary, but they typically include both emotional and physical manifestations.

2.1 Emotional Symptoms
Persistent sadness: Feeling sad or "down" for extended periods, beyond the typical "baby blues."
Excessive crying: Crying without a clear reason, or feeling emotionally overwhelmed.
Guilt and self-blame: Feeling inadequate or not being able to connect with the baby, even though these feelings are unfounded.
2.2 Behavioral Symptoms
Difficulty bonding with the baby: Many mothers with PPD report feeling disconnected from their newborn, which can make it hard to form a healthy attachment.
Avoiding social interactions: Withdrawing from family, friends, and social events due to a lack of energy or interest in interacting with others.
2.3 Cognitive Symptoms
Difficulty concentrating: Some women with PPD have difficulty focusing on tasks and may feel mentally "foggy."
Persistent negative thoughts: These may include fears about being a bad parent, or even feelings of hopelessness or worthlessness.
2.4 Physical Symptoms
Sleep disturbances: Despite feeling exhausted, a mother may experience difficulty falling asleep or staying asleep, even when the baby is sleeping.
Fatigue: Chronic tiredness that isn’t relieved by rest.
Physical aches: Unexplained physical pain or discomfort, including headaches or muscle aches, which may be due to the emotional toll of depression.

Chapter 3: Diagnosis of Postpartum Depression
Proper diagnosis of postpartum depression is crucial in getting the right treatment and support. The following tools and methods are used by healthcare providers to diagnose PPD:

3.1 Screening Tools
EPDS (Edinburgh Postnatal Depression Scale): The EPDS is a widely used screening tool that helps identify depressive symptoms in new mothers. It asks a series of questions about mood, behavior, and thoughts, helping healthcare professionals gauge the severity of depression.
3.2 Timing and Duration
Postpartum depression can develop anytime within the first year after childbirth, but it typically appears within 4–6 weeks. The symptoms last longer than the typical "baby blues," which generally resolve within two weeks of childbirth.

Chapter 4: Treatment Options
There are several treatment options for postpartum depression, each tailored to the severity of the condition and the needs of the individual. Treatment can be a combination of psychotherapy, medications, and lifestyle changes.

4.1 Psychotherapy
Cognitive Behavioral Therapy (CBT): CBT is one of the most effective forms of psychotherapy for postpartum depression. It helps women identify and change negative thinking patterns, and equips them with tools to manage stress and improve emotional regulation.
4.2 Medications
SSRIs (Selective Serotonin Reuptake Inhibitors): SSRIs are often prescribed to treat depression and anxiety in postpartum women. These medications help to restore balance in the brain’s neurotransmitters, particularly serotonin, which regulates mood. It’s important to consult with a doctor before taking medications, as some antidepressants may pass into breast milk.
4.3 Lifestyle Changes
Regular exercise, such as walking or yoga, can improve mood and reduce anxiety.
Maintaining a balanced diet rich in nutrients can help stabilize blood sugar levels and improve energy.
Relaxation techniques, such as deep breathing, meditation, or mindfulness, can help reduce stress and improve overall mental well-being.

Chapter 5: Coping Strategies and Support
Managing postpartum depression often requires a multi-faceted approach, including emotional and practical support.

5.1 Build a Support System
Reach out to family, friends, or support groups to create a network of people who can provide emotional support during difficult times. Talking to others who have experienced PPD can help normalize the feelings and make a mother feel less isolated.
5.2 Self-Care Practices
Taking breaks from the baby when possible, asking for help, and engaging in personal activities such as reading, taking a bath, or engaging in hobbies can help mothers feel more in control and less overwhelmed.
5.3 Professional Help
If the symptoms of PPD are severe or do not improve with time, it is important to seek medical advice. A doctor or therapist can provide guidance and help create a treatment plan that addresses the specific needs of the mother.
Conclusion
Postpartum depression is a serious, but treatable condition. It is important to recognize the symptoms early and seek help. With the right support, therapy, and sometimes medication, women can recover and successfully navigate the challenges of motherhood. Timely intervention is essential for both the mother’s well-being and the child’s development.

References
APA (2023). Postpartum Depression.
Mayo Clinic (2023).
WHO (2023). Maternal Mental Health Guidelines.
`;

    // Function to format content
    const formatContent = (content: string) => {
        return content.split("\n").map((line, index) => {
            // If line starts with "Chapter" or "Introduction", make it bold
            if (line.startsWith("Chapter") || line === "Introduction") {
                return <Text key={index} style={[styles.sectionTitle, { color: theme.title }]}>{line}</Text>;
            }
            // Regular text (not headings)
            return <Text key={index} style={[styles.pageText, { color: theme.textPrimary }]}>{line}</Text>;
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
                <Text style={[styles.titleText,{ color: theme.textPrimary }]}>Postpartum depression Article</Text>
                <View style={[styles.modalContent, { backgroundColor: theme.bgColorPopup }]}>
                    <ScrollView showsVerticalScrollIndicator={true} >
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

export default Article1;
