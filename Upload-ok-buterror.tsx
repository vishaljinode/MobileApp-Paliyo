import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker, Image, Alert } from 'react-native'; // Ensure Picker is imported
import { FontAwesome } from '@expo/vector-icons';

export default function UploadPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleDistrictChange = (value) => {
    setDistrict(value);
  };

  const handleImageUpload = () => {
    // Implement image upload functionality here
    Alert.alert('Image upload', 'Photo upload functionality not available in Snack Expo.');
  };

  const handleSubmit = () => {
    if (!title || !description || !district || !image) {
      Alert.alert('All fields are required');
      return;
    }
    // Here you can add code to handle the submission, like sending the data to a server
    // or saving it locally.
    // For now, let's just display the entered data in an alert.
    Alert.alert('Post submitted', `Title: ${title}\nDescription: ${description}\nDistrict: ${district}`);
  };

  // List of all 33 districts of Gujarat
  const gujaratDistricts = [
    "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod",
    "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana",
    "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", 
    "Tapi", "Vadodara", "Valsad"
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <FontAwesome name="photo" size={24} color="black" />
        <Text style={styles.uploadText}>Upload Photo</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={handleDescriptionChange}
      />
      <View style={styles.pickerContainer}>
        {gujaratDistricts ? (
          <Picker
            selectedValue={district}
            style={styles.picker}
            onValueChange={handleDistrictChange}>
            <Picker.Item label="Select District" value="" />
            {gujaratDistricts.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        ) : (
          <Text>Loading districts...</Text>
        )}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadText: {
    marginLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    width: '100%',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
