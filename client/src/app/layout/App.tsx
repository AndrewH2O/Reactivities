import {useEffect, useState} from "react";
import {Box, Container, CssBaseline} from "@mui/material";
import axios from "axios";
import {NavBar} from "./NavBar.tsx";
import {ActivityDashboard} from "../../features/activities/dashboard/ActivityDashboard.tsx";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  // view detail of an activity
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  // create activity state - show form or not
  const [editMode, setEditMode] = useState(false)

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

  // we use the activity form for both edit and creating an activity
  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id)
    else handleCancelSelectActivity()
    setEditMode(true)
  }

  const handleFormClose = () => {
    setEditMode(false)
  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      {/*resets browser styles so we get no margin on Navbar */}
      <CssBaseline/>
      <NavBar openForm={handleOpenForm}/>
      {/*default spacing is 8 pixels the 3 means 8 * 3 pixels */}
      <Container maxWidth="xl" sx={{mt: 3}}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
        />
      </Container>
    </Box>
  )
}

export default App
