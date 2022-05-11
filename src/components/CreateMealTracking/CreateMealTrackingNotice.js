import React from "react";
import { Link } from "react-router-dom";

function createMealTrackingNotice() {
  return (
    <>
      <p>Bạn chưa có nhật ký dinh dưỡng nào cả.</p>
      <Link to="/admin/mealstracking/createmealtracking">Tạo ngay nhé!</Link>
    </>
  );
}

export default createMealTrackingNotice;
