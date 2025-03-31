import {Grid2} from "@mui/material";
import ActivityList from "./ActivityList.tsx"
import ActivityDetail from "../details/ActivityDetail.tsx";

type Props = {
  activities: Activity[]
}

// {activities} destructuring activities from props
export function ActivityDashboard({activities}: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList activities={activities}/>
      </Grid2>
      <Grid2 size={5}>
        {activities[0] && <ActivityDetail activity={activities[0]}/>}
      </Grid2>
    </Grid2>
  );
}

