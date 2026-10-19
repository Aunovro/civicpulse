import { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useReports } from '@/components/reportsContext';

export default function ReportsScreen() {
  const { reports, addReport, toggleResolved } = useReports();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function submitReport() {
    if (title.trim() === '' || description.trim() === '') {
      return;
    }

    const date = new Date().toLocaleDateString();

    addReport(title, description, date);

    // Clear the form after submitting
    setTitle('');
    setDescription('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Report an Issue</Text>

        {/* REPORT FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>Issue Title</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: Pothole on Main Street"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description</Text>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Describe the issue..."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Button
            title="Submit Report"
            onPress={submitReport}
          />
        </View>

        {/* SUBMITTED REPORTS */}
        <Text style={styles.sectionTitle}>Submitted Reports</Text>

        {reports.length === 0 ? (
          <Text>No reports yet.</Text>
        ) : (
          reports.map((report: any) => (
            <View
              key={report.id}
              style={[
                styles.report,
                report.resolved
                  ? styles.resolved
                  : styles.notResolved,
              ]}
            >
              <Text style={styles.reportTitle}>
                {report.title}
              </Text>

              <Text>{report.description}</Text>

              <Text>Date: {report.date}</Text>

              <Text style={styles.status}>
                {report.resolved
                  ? 'RESOLVED'
                  : 'NOT RESOLVED'}
              </Text>

              <Button
                title={
                  report.resolved
                    ? 'Mark as Not Resolved'
                    : 'Mark as Resolved'
                }
                onPress={() => toggleResolved(report.id)}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  form: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  report: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
  },

  resolved: {
    borderColor: 'green',
    backgroundColor: '#dff5df',
  },

  notResolved: {
    borderColor: 'red',
    backgroundColor: '#ffdede',
  },

  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  status: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
});