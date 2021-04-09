export default function AlertReducer(alert = [], action) {
  switch (action.type) {
    case "ADDALERT":
      var alertRoot = document.querySelector(".alertRoot");
      alertRoot.classList.remove("hide");
      alert.push(action.payload);
      setTimeout(() => {
        alertRoot.classList.add("hide");
      }, 5000);
      return [...alert];
    case "CLEARALERTS":
      return [];
    case "CLOSEALERT":
      return [...alert.filter((el, idx) => idx !== action.payload)];
    default:
      return alert;
  }
}
