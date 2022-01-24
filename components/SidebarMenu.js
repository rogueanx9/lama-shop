import Link from "next/link";

function SidebarMenu({ title, items }) {
  return (
    <div className="sidebarMenu">
      <h3 className="title">{title}</h3>
      <ul className="items">
        {items.map((item, idx) => {
          return (
            <Link key={idx} href={`/${item.title}`}>
              <li className={`item ${item.active ? "active" : ""}`}>
                {<item.icon className="icon" />}
                {item.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default SidebarMenu;
