import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import WidgetSm from "../components/WidgetSm";
import WidgetLg from "../components/WidgetLg";
import { data } from "../dummyData";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../utilities/request";

function HomeSection() {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.accessToken;
    const getUsers = async () => {
      try {
        const res = await userRequest(token).get("/user/stats");
        res.data.map((item) => {
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ]);
        });
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, [MONTHS]);
  return (
    <div className="homeSection">
      <FeaturedInfo />
      <Chart
        title="User Analytics"
        data={userStats}
        dataKey="Active User"
        grid
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

export default HomeSection;
