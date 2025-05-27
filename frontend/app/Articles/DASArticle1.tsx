import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { BlurView } from 'expo-blur';

interface Article3Props {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const Article3: React.FC<Article3Props> = ({ modalVisible, setModalVisible }) => {
    const { theme } = useTheme() as { theme: any };

    // Full article content
    const articleContent = `
Introduction
Depression in married couples is a complex emotional and psychological issue that affects not only the individual but also the dynamics of the relationship. When one or both partners experience depression, it can strain communication, reduce intimacy, and lead to emotional disconnection. Despite being common, depression in couples is often overlooked, as symptoms may be misinterpreted as normal marital stress. Understanding the causes, recognizing the signs, and exploring effective treatments can help couples navigate this challenge together and rebuild emotional harmony

Causes of Depression in Married Couples
Marital depression can stem from a mix of individual vulnerabilities, relationship dynamics, and life stressors. Addressing these causes is key to promoting healing and resilience

Individual Factors
Depression may originate from pre-existing mental health conditions, unresolved childhood trauma, hormonal changes, or personal stress. When one partner struggles internally, it inevitably affects the relationship, often leading to feelings of neglect or misunderstanding from the other partner.

Relationship Stressors
Marital conflict, lack of effective communication, financial struggles, and mismatched expectations can all contribute to depression. Infidelity, trust issues, or a history of emotional neglect can erode the foundation of the relationship and foster emotional detachment.

Life Events
Major life changes such as miscarriage, infertility, career loss, relocation, or illness in the family may trigger or worsen depressive symptoms. Couples going through such transitions often experience emotional strain that, if unaddressed, can deepen into chronic distress.

Symptoms of Depression in Married Couples

Emotional Symptoms
-Feelings of sadness, hopelessness, or numbness
-Loss of emotional connection or affection
-Frequent irritability or anger outbursts

Cognitive Symptoms
-Negative self-talk and poor self-esteem
-Difficulty concentrating or making decisions
-Blaming oneself or the partner excessively

Behavioral Symptoms
-Withdrawal from conversations or shared activities
-Reduced physical intimacy and affection
-Avoidance of conflict resolution or increased arguing

Physical Symptoms
-Fatigue or low energy
-Sleep disturbances (insomnia or oversleeping)
-Changes in appetite or unexplained health complaints

Assessing Depression in Married Couples
Several tools and approaches help identify depressive symptoms in a relational context. The Dyadic Adjustment Scale (DAS) is often used to assess relationship satisfaction, communication, and emotional well-being in couples.

Structure of the DAS
The DAS evaluates factors like consensus, satisfaction, cohesion, and affectional expression. It helps clinicians understand how depression may be affecting relationship functioning.

Importance of Couple-Based Assessment
Evaluating both partners allows therapists to see patterns of interaction that contribute to distress and identify whether one or both are experiencing clinical depression.

Treatment Options

Couples Therapy
-Approaches like Emotionally Focused Therapy (EFT) and Integrative Behavioral Couple Therapy (IBCT) help couples improve communication, understand emotional needs, and rebuild trust. Therapy sessions provide a safe space to express feelings and resolve underlying issues.

Individual Therapy
-Cognitive Behavioral Therapy (CBT) or Interpersonal Therapy (IPT) may be recommended if one partner has a major depressive disorder. Individual therapy allows deeper exploration of personal issues affecting the relationship.

Medication
-Antidepressants such as SSRIs may be prescribed to manage clinical symptoms. Medication is often used alongside therapy and requires careful monitoring, especially when relationship tensions are present.

Lifestyle Modifications
-Physical activities like walking or yoga done together
-Joint hobbies to reignite connection
-Practicing gratitude and mindfulness as a couple
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
                <Text style={[styles.titleText,{ color: theme.textPrimary }]}>Marital Depression Article</Text>
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

export default Article3;
