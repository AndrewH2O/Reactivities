import {Grid2} from "@mui/material";
import ActivityList from "./ActivityList.tsx"
import ActivityDetail from "../details/ActivityDetail.tsx";

type Props = {
  activities: Activity[]
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
  // same as selectedActivity: Activity|undefined
  selectedActivity?: Activity
}

// {activities etc} destructuring activities from props
export function ActivityDashboard(
  {
    activities,
    cancelSelectActivity,
    selectActivity,
    selectedActivity
  }: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
        />
      </Grid2>
      <Grid2 size={5}>
        {
          selectedActivity && <ActivityDetail activity={selectedActivity}
                                              cancelSelectActivity={cancelSelectActivity}/>
        }
      </Grid2>
    </Grid2>
  );
}

