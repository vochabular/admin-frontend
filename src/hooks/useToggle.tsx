import { useState } from "react";

export default function useToggle(initialValue: boolean) {
  const [toggler, setToggler] = useState<boolean>(initialValue);
  function handleToggler(): void {
    setToggler(!toggler);
  }

  return { toggler, handleToggler };
}
