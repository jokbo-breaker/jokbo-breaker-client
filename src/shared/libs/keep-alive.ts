export function startKeepAlive() {
  const apiBase = import.meta.env.VITE_API_BASE_URL as string; // 예: .../api
  const isRemoteRender = /https:\/\/.+\.onrender\.com\/api$/.test(apiBase);
  if (!isRemoteRender) return;

  const health = apiBase.replace(/\/api$/, '') + '/health';
  setInterval(() => {
    fetch(health, { credentials: 'include' }).catch(() => {});
  }, 120_000);
}
