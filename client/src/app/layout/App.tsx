import {useEffect, useState} from "react";
import {Box, Container, CssBaseline} from "@mui/material";
import axios from "axios";
import {NavBar} from "./NavBar.tsx";
import {ActivityDashboard} from "../../features/activities/dashboard/ActivityDashboard.tsx";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  // view detail of an activity
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)

  // executes when component loads
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, [])


  // this will be passed down to ActivityCard via ActivityDashboard
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  // this will be passed down to activityDetails via ActivityDashboard
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      {/*resets browser styles so we get no margin on Navbar */}
      <CssBaseline/>
      <NavBar/>
      {/*default spacing is 8 pixels the 3 means 8 * 3 pixels */}
      <Container maxWidth="xl" sx={{mt: 3}}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
        />
      </Container>
    </Box>
  )
}

export default App
