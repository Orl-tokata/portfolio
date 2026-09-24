export const THEME_STORAGE_KEY = "theme";

export const BOOT_STORAGE_KEY = "booted";

/**
 * Runs before paint: applies the stored theme (dark is the default) and marks
 * returning visitors so the boot splash only plays once per session.
 */
const script = `(function(){var d=document.documentElement;try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light"){d.classList.remove("dark")}}catch(e){}try{if(sessionStorage.getItem("${BOOT_STORAGE_KEY}")){d.setAttribute("data-booted","")}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
