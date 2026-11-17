import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Küçük, bağımlılıksız yönlendirici: History API + /rota/:id gibi parametreli yollar.
// vercel.json zaten tüm yolları index.html'e yönlendirdiği için derin bağlantılar çalışır.

const RouterContext = createContext(null);

function readLocation() {
  return { pathname: window.location.pathname || '/', search: window.location.search || '' };
}

function toUrl(to) {
  if (typeof to === 'string') return to;
  const { pathname = '/', params } = to;
  const qs = params ? new URLSearchParams(params).toString() : '';
  return qs ? `${pathname}?${qs}` : pathname;
}

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const onPop = () => setLocation(readLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const url = toUrl(to);
    const idx = (window.history.state && window.history.state.idx) || 0;
    if (replace) window.history.replaceState({ idx }, '', url);
    else window.history.pushState({ idx: idx + 1 }, '', url);
    setLocation(readLocation());
  }, []);

  const back = useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) window.history.back();
    else navigate('/', { replace: true });
  }, [navigate]);

  const value = useMemo(() => ({ location, navigate, back }), [location, navigate, back]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

function useRouterContext() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('RouterProvider eksik');
  return ctx;
}

export const useLocation = () => useRouterContext().location;
export const useNavigate = () => {
  const { navigate, back } = useRouterContext();
  return useMemo(() => Object.assign(navigate, { back }), [navigate, back]);
};

export function useSearchParams() {
  const { location, navigate } = useRouterContext();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const setParams = useCallback(
    (next, opts = { replace: true }) => navigate({ pathname: location.pathname, params: next }, opts),
    [location.pathname, navigate]
  );
  return [params, setParams];
}

// '/rota/:id' gibi kalıbı yola uygular; eşleşirse parametreleri döner.
export function matchPath(pattern, pathname) {
  const clean = (s) => s.replace(/\/+$/, '') || '/';
  const a = clean(pattern).split('/');
  const b = clean(pathname).split('/');
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

export function Link({ to, replace = false, onClick, children, ...rest }) {
  const navigate = useNavigate();
  const href = toUrl(to);
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to, { replace });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
