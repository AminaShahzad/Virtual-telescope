const { insertUser, getUsers, updateUser, deleteUser } = require("./server");

// Insert a User
insertUser({  tel_name: "SuperScope",focal_lenght: 250, aperture: 50.5 });
//insertUser({  tel_name: "Meade 16\" LX200-ACF",focal_lenght: 4064, aperture: 406.4 });
//insertUser({  tel_name: "Celestron 8\" EdgeHD 800 Schmidt-Cassegrain Telescope OTA",focal_lenght: 2032, aperture: 203.2 });
//insertUser({  tel_name: "Celestron 14\" EdgeHD 1400 Flat Field Schmidt-Cassegrain Telescope OTA",focal_lenght: 3910, aperture: 356});

// Retrieve Users
getUsers();

// Update a User (Replace `id_here` with a real MongoDB ObjectId)
updateUser("SuperScope", { focal_lenght: 30, aperture: 99 });
getUsers();
// Delete a User (Replace `id_here` with a real MongoDB ObjectId)
deleteUser("SuperScope");
