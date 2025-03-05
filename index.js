const { insertUser, getUsers, updateUser, deleteUser } = require("./server");

// Insert a User
insertUser({ focal_lenght: 250, tel_name: "SuperScope", aperture: 50.5 });

// Retrieve Users
getUsers();

// Update a User (Replace `id_here` with a real MongoDB ObjectId)
updateUser("67c7eb094ad3da09b4b68821", { focal_lenght: 30, aperture: 99 });

// Delete a User (Replace `id_here` with a real MongoDB ObjectId)
deleteUser("67c7eb094ad3da09b4b68821");
