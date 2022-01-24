import { ArrowDownward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../utilities/request";
import FeaturedItem from "./FeaturedItem";

function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.accessToken;
    const getIncome = async () => {
      try {
        const res = await userRequest(token).get("/order/income");
        setIncome(res.data);
        setPerc(
          Math.floor((res.data[1].total * 100) / res.data[0].total - 100)
        );
      } catch (e) {
        console.log(e);
      }
    };
    getIncome();
  }, []);
  return (
    <div className="featured">
      <FeaturedItem title="Revenue" money={income[1]?.total} rate={perc} />
      <FeaturedItem title="Sales" money={4415} rate={-1.4} />
      <FeaturedItem title="Cost" money={2225} rate={2.4} />
    </div>
  );
}

export default FeaturedInfo;
