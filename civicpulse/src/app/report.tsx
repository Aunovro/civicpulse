import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReports } from '@/components/reportsContext';

export default function ReportsScreen() {
  const { reports, toggleResolved } = useReports();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reports</Text>

      {reports.length === 0 ? (
        <Text>No reports yet.</Text>
      ) : (
        reports.map((report: any) => (
          <View
            key={report.id}
            style={[
              styles.report,
              report.resolved ? styles.resolved : styles.notResolved,
            ]}
          >
            <Text style={styles.reportTitle}>{report.title}</Text>

            <Text>{report.description}</Text>

            <Text>Date: {report.date}</Text>

            <Text style={styles.status}>
              {report.resolved ? 'RESOLVED' : 'NOT RESOLVED'}
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