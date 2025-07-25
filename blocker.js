const blockedHostnames = ["solarpandora184.github.io"];
const isBlocked = blockedHostnames.includes(location.hostname);

if (isBlocked) {
  // Optionally show a message to users
  alert("⚠️ This site is disabled on this domain.");

  // Stop any further scripts from loading/running
  throw new Error("Execution blocked on this domain.");
}
