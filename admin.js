var nuke = false;
// Hardcoded whitelist: name + UID combo
const whitelist = [
  { name: "Chris", uid: "1234567" },
  { name: "Bob", uid: "7654321" },
  { name: "Christopher", uid: "9876543" },
];

// Function to generate a random 7-digit UID
function generateUID() {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

// First-time setup: ask for name, generate UID, then close
function firstTimeSetup() {
  const name = prompt("Enter your name:");
  if (!name) {
    alert("Name is required.");
    window.close();
    return;
  }

  const uid = generateUID();
  localStorage.setItem("userName", name);
  localStorage.setItem("userUID", uid);

  alert(`Your UID is: ${uid}\nPlease reopen the page.`);
  window.close();
}

// Whitelist check
function isWhitelisted(name, uid) {
  return whitelist.some(entry => entry.name === name && entry.uid === uid);
}

// Main function
function initiate22() {
  if (nuke) {
    alert("Access denied. Killswitch is active.");
    window.close();
    return;
  }

  const name = localStorage.getItem("userName");
  const uid = localStorage.getItem("userUID");

  if (!name || !uid) {
    firstTimeSetup(); // Will prompt and close
    return;
  }

  if (!isWhitelisted(name, uid)) {
    alert("Access denied. You are not whitelisted.");
    window.close();
    return;
  }

  console.log("Access granted to", name, "with UID:", uid);
    const main = "https://raw.githubusercontent.com/jasonkurisu/unblocker/refs/heads/main/index.html";

    fetch(main)
      .then(response => {
        if (!response.ok) throw new Error("Primary URL failed");
        return response.text();
      })
      .catch(() => {
        return fetch(fallback).then(response => {
          if (!response.ok) throw new Error("Fallback URL failed");
          return response.text();
        });
      })
      .then(html => {
        document.open();
        document.write(html);
        document.close();
      });
  });

}

initiate22();
