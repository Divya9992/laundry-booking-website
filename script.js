function bookLaundry() {
  var name = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;
  var service = document.getElementById("service").value;

  if (name === "" || mobile === "" || service === "") {
    alert("Please fill all details");
    return;
  }

  // ✅ Order ID generate
  var orderId = "ORD-" + Date.now();

  // ✅ Booking Date & Time
  var now = new Date();
  var bookingDate = now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, '0') + "-" +
    String(now.getDate()).padStart(2, '0');

  var bookingTime = now.toLocaleTimeString();

  // ✅ Save to Firebase (CORRECT field names)
  firebase.database().ref("LaundryBookings/" + orderId).set({
    orderId: orderId,
    customerName: name,
    phoneNumber: mobile,
    serviceType: service,

    bookingDate: bookingDate,   // ✅ fixed
    bookingTime: bookingTime,   // ✅ fixed

    deliveryDate: "",           // admin later update pannum
    deliveryTime: "",

    deliveryStatus: "Pending"   // Processing / Ready / Delivered
  });

  // ✅ Show Order ID
  alert(
    "Laundry Booked Successfully!\n\n" +
    "Your Order ID:\n" + orderId
  );

  // Clear form
  document.getElementById("name").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("service").value = "";
}