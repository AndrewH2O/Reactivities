import {Grid2} from "@mui/material";
import ActivityList from "./ActivityList.tsx";

type Props = {
  activities: Activity[]
}

// {activities} destructuring activities from props
export function ActivityDashboard({activities}: Props) {
  return (
    <Grid2 container>
      <Grid2 size={9}>
        <ActivityList activities={activities}/>
      </Grid2>
    </Grid2>
  );
}

