import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@mui/icons-material";
import SidebarMenu from "./SidebarMenu";

function Sidebar({ index }) {
  return (
    <div className="sidebar">
      <div className="cont">
        <SidebarMenu
          title="Dashboard"
          items={[
            { title: "home", icon: LineStyle, active: index == "home" },
            { title: "analytics", icon: Timeline, active: index == "analytics" },
            { title: "sales", icon: TrendingUp, active: index == "sales" },
          ]}
        />
        <SidebarMenu
          title="Quick Menu"
          items={[
            { title: "users", icon: PermIdentity, active: index == "users" },
            { title: "products", icon: Storefront, active: index == "products" },
            { title: "transactions", icon: AttachMoney, active: index == "transactions" },
            { title: "reports", icon: BarChart, active: index == "reports" },
          ]}
        />
        <SidebarMenu
          title="Notifications"
          items={[
            { title: "mail", icon: MailOutline, active: index == "mail" },
            { title: "feedback", icon: DynamicFeed, active: index == "feedback" },
            { title: "messages", icon: ChatBubbleOutline, active: index == "messages" },
          ]}
        />
        <SidebarMenu
          title="Staff"
          items={[
            { title: "manage", icon: WorkOutline, active: index == "manage" },
            { title: "analytics", icon: Timeline, active: index == "tes" },
            { title: "reports", icon: Report, active: index == "reports" },
          ]}
        />
      </div>
    </div>
  );
}

export default Sidebar;
