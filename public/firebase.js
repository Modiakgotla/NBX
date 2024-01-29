const firebaseConfig = {
  //copy your firebase config informations
  apiKey: "AIzaSyARJSGp_FaEPLbDwwdl7j6YBZAXsKn68-4",
  authDomain: "portal-7e1b2.firebaseapp.com",
  databaseURL: "https://portal-7e1b2-default-rtdb.firebaseio.com",
  projectId: "portal-7e1b2",
  storageBucket: "portal-7e1b2.appspot.com",
  messagingSenderId: "960726558205",
  appId: "1:960726558205:web:dbee5f6f90fd0659c0a594"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);vggfg

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var phone = getElementVal("phone");
  var fileUpload = document.getElementById("fileUpload").files[0];

  // Save file to Firebase Storage (assuming you're using Firebase Storage for file uploads)
  saveFileToStorage(fileUpload).then((fileUrl) => {
    // Save form data to Firebase Realtime Database
    saveMessages(name, phone, fileUrl);

    //   enable alert
    document.querySelector(".alert").style.display = "block";

    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);

    //   reset the form
    document.getElementById("contactForm").reset();
  }).catch((error) => {
    console.error('Error uploading file:', error);
    // Handle error
  });
}

const saveMessages = (name, phone, fileUrl) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    phone: phone,
    fileUrl: fileUrl, // Assuming you store the file URL in the database
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

const saveFileToStorage = (file) => {
  return new Promise((resolve, reject) => {
    var storageRef = firebase.storage().ref('uploads/' + file.name);

    // Upload file to Firebase Storage
    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
      (snapshot) => {
    
      }, 
      (error) => {
        // Handle upload error
        reject(error);
      }, 
      () => {
        // Upload completed successfully
        // Get download URL and resolve the promise
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}; 
