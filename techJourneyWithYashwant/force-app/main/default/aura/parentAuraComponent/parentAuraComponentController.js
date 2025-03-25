({
  handleClick: function (component, event, helper) {
    component
      .find("childcomp")
      .getAuraMessage("Welcome to Tech Journey With Yashwant.");
  },
  handleMessageChild: function (component, event, helper) {
    let fullName = event.getParam("fullName");
    console.log("Aura", fullName);
    alert(fullName);
  }
});
