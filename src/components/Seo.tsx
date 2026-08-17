import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  canonical: string;
};

const setMeta = (selector: string, attr: string, value: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
};

const Seo = ({ title, description, canonical }: Props) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical]);

  return null;
};

export default Seo;
