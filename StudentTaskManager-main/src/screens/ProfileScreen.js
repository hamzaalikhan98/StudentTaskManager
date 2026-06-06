import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { colors } from "../components/colors";


export default function ProfileScreen({ navigation }) {

  const tasks = useSelector(state => state.tasks.items);

  const completed = tasks.filter(
    item => item.completed
  ).length;

  const pending = tasks.length - completed;

  const percentage =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);


  return (

    <ScrollView style={styles.container}>


      {/* HEADER */}
      <View style={styles.header}>


        <View style={styles.avatar}>

          <Ionicons
            name="person"
            size={60}
            color="#fff"
          />

        </View>


        <Text style={styles.name}>
          Muhammad Asad
        </Text>


        <Text style={styles.email}>
          student@university.com
        </Text>


      </View>



      {/* Academic Info */}


      <View style={styles.card}>


        <Text style={styles.heading}>
          🎓 Academic Information
        </Text>


        <Text style={styles.info}>
          Department: Information Engineering Technology
        </Text>


        <Text style={styles.info}>
          Semester: 4th
        </Text>


        <Text style={styles.info}>
          Role: Student
        </Text>


      </View>





      {/* Stats */}


      <View style={styles.row}>


        <View style={styles.statCard}>


          <Ionicons
            name="clipboard"
            size={30}
            color="#2563EB"
          />

          <Text style={styles.number}>
            {tasks.length}
          </Text>

          <Text>Total</Text>


        </View>




        <View style={styles.statCard}>


          <Ionicons
            name="checkmark-circle"
            size={30}
            color="#10B981"
          />


          <Text style={styles.number}>
            {completed}
          </Text>

          <Text>Done</Text>


        </View>




        <View style={styles.statCard}>


          <Ionicons
            name="time"
            size={30}
            color="#F59E0B"
          />


          <Text style={styles.number}>
            {pending}
          </Text>

          <Text>Pending</Text>


        </View>


      </View>





      {/* Progress */}


      <View style={styles.card}>


        <Text style={styles.heading}>
          📊 Academic Progress
        </Text>


        <Text style={styles.percent}>

          {percentage}% Completed

        </Text>


      </View>






      {/* Buttons */}



      <TouchableOpacity
      style={styles.option}
      >

        <Ionicons
        name="create-outline"
        size={25}
        />

        <Text style={styles.optionText}>
          Edit Profile
        </Text>


      </TouchableOpacity>





      <TouchableOpacity
      style={styles.option}
      onPress={() =>
      navigation.navigate("Settings")
      }
      >

        <Ionicons
        name="settings-outline"
        size={25}
        />

        <Text style={styles.optionText}>
          Settings
        </Text>


      </TouchableOpacity>





      <TouchableOpacity
      style={[
        styles.option,
        styles.logout
      ]}
      >


        <Ionicons
        name="log-out-outline"
        size={25}
        color="#fff"
        />


        <Text
        style={styles.logoutText}
        >

          Logout

        </Text>


      </TouchableOpacity>






    </ScrollView>


  );
}




const styles = StyleSheet.create({

container:{

flex:1,
backgroundColor:colors.background,
padding:20,

},



header:{

backgroundColor:"#2563EB",
borderRadius:30,
padding:30,
alignItems:"center",
marginBottom:20,

},


avatar:{

width:110,
height:110,
borderRadius:60,
backgroundColor:"#1E40AF",
justifyContent:"center",
alignItems:"center",
marginBottom:15,

},



name:{

fontSize:25,
fontWeight:"900",
color:"#fff",

},


email:{

color:"#DBEAFE",
marginTop:5,

},



card:{

backgroundColor:colors.card,
padding:20,
borderRadius:25,
marginBottom:20,
elevation:5,

},



heading:{

fontSize:18,
fontWeight:"900",
marginBottom:10,
color:colors.text,

},



info:{

fontSize:15,
fontWeight:"600",
marginVertical:4,
color:colors.text,

},



row:{

flexDirection:"row",
justifyContent:"space-between",
marginBottom:20,

},



statCard:{


width:"31%",
backgroundColor:colors.card,
padding:15,
borderRadius:20,
alignItems:"center",
elevation:4,

},



number:{


fontSize:25,
fontWeight:"900",
marginVertical:5,

},



percent:{

fontSize:30,
fontWeight:"900",
color:"#10B981",

},



option:{


flexDirection:"row",
alignItems:"center",
backgroundColor:colors.card,
padding:18,
borderRadius:20,
marginBottom:15,
elevation:4,


},



optionText:{


marginLeft:15,
fontSize:16,
fontWeight:"800",


},



logout:{


backgroundColor:"#EF4444",
justifyContent:"center",


},


logoutText:{


color:"#fff",
fontWeight:"900",
fontSize:17,
marginLeft:10,


}



});