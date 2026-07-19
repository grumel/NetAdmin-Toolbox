import { initializeCommandPalette } from "./command-palette.js";
import { initializeLocale, t } from "./i18n.js";
import { activeRoute, renderNavigation, renderRoute } from "./router.js";
import { currentTheme, initializeTheme, toggleTheme } from "./theme.js";
import { findTool } from "./tool-catalog.js";
import { recordRecentTool } from "./tool-state.js";

const content=document.querySelector("#app-content");const navigation=document.querySelector("#primary-navigation");const status=document.querySelector("#connection-status");const themeToggle=document.querySelector("#theme-toggle");let deferredInstallPrompt;
async function render(){const view=activeRoute();navigation.innerHTML=renderNavigation(view);const rendered=await renderRoute(view,content);if(!rendered)return;if(findTool(view))recordRecentTool(view);content.focus({preventScroll:true});updateConnectionStatus();setupInstallButton();}
function updateConnectionStatus(){const online=navigator.onLine;status.textContent=online?t("online"):t("offline");status.classList.toggle("is-offline",!online);const dashboardStatus=document.querySelector("#dashboard-connection");if(dashboardStatus)dashboardStatus.textContent=online?t("online"):t("offline");}
function setupInstallButton(){const button=document.querySelector("#install-button");if(!button||!deferredInstallPrompt)return;button.hidden=false;button.addEventListener("click",async()=>{deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=undefined;button.hidden=true;},{once:true});}
function updateThemeButton(){const dark=currentTheme()==="dark";themeToggle.setAttribute("aria-pressed",String(dark));document.querySelector("#theme-toggle-label").textContent=dark?t("useLight"):t("useDark");}
themeToggle.addEventListener("click",()=>{toggleTheme();updateThemeButton();});window.addEventListener("hashchange",render);window.addEventListener("online",updateConnectionStatus);window.addEventListener("offline",updateConnectionStatus);window.addEventListener("localechange",()=>{updateThemeButton();updateConnectionStatus();render();});window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();deferredInstallPrompt=event;setupInstallButton();});
initializeLocale();initializeTheme();updateThemeButton();initializeCommandPalette();render();
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(error=>console.error("Service worker registration failed",error)));}
