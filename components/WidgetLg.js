import { useEffect, useState } from "react";
import { userRequest } from "../utilities/request";
import { format } from "timeago.js";

function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.accessToken;
    const getUsers = async () => {
      try {
        const res = await userRequest(token).get("/order/all");
        setOrders(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, []);

  const ButtonTr = ({ type }) => {
    return <button className={"buttonTr " + type}>{type}</button>;
  };
  return (
    <div className="widgetlg">
      <h3 className="title">Latest Transactions</h3>
      <table>
        <tr>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {orders.map((order) => {
          return (
            <tr key={order._id}>
              <td className="user">
                <span className="name">{order.userId}</span>
              </td>
              <td className="date">{format(order.createdAt)}</td>
              <td className="amount">{`$${order.amount}`}</td>
              <td className="status">
                <ButtonTr type={order.status} />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default WidgetLg;
