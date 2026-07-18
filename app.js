const statusMessage = document.querySelector("#connection-status");

function updateConnectionStatus() {
  const online = navigator.onLine;
  document.body.classList.toggle("is-offline", !online);
  statusMessage.textContent = online
    ? "Online — tools are ready."
    : "Offline — showing saved content.";
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}
