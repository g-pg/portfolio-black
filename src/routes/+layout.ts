// export const ssr = true;
export const prerender = true;
export function load({ url }) {
  return {
    url: url.pathname,
  };
}
