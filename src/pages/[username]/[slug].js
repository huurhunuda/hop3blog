import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Article() {
  const router = useRouter();
  const { slug, username } = router.query;
  const [article, setArticle] = useState();

  useEffect(() => {
    if (slug) {
      fetch(`https://dev.to/api/articles/${username}/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
          console.log(data);
        });
    }
  }, [slug, username]);
  return (
    <div>
      <h1>Article</h1>
    </div>
  );
}
