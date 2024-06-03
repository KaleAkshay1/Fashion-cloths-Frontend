import React, { useLayoutEffect } from "react";
import axios from "axios";

function OrderHistory() {
  useLayoutEffect(() => {
    (async () => {
      const data = await axios("/api/items/practise");
      console.log(data);
    })();
  }, []);
  return <div>OrderHistory</div>;
}

export default OrderHistory;
