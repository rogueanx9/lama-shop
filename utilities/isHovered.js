import { useState } from "react";

const isHovered = () => {
  const [hovered, setHovered] = useState(false);
  const togglerHover = () => setHovered(!hovered);

  return [hovered, togglerHover];
};

export { isHovered };
