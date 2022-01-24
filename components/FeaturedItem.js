import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

function FeaturedItem({ title, money, rate }) {
  return (
    <div className="featuredItem">
      <span className="title">{title}</span>
      <div className="moneyCont">
        <span className="money">${money}</span>
        <span className="moneyRate">
          {`${rate} `}{" "}
          {rate > 0 ? (
            <ArrowUpward className="icon" />
          ) : (
            <ArrowDownward className="icon negative" />
          )}
        </span>
      </div>
      <span className="sub">Compare to last month</span>
    </div>
  );
}

export default FeaturedItem;
