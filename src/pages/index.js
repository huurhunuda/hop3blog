import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import { AspectRatio, Avatar, Box, Typography } from "@mui/joy";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("https://dev.to/api/articles?tag=webdev")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        console.log(data);
      });
  }, []);

  const router = useRouter();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-between",
          boxSizing: "border-box",
          padding: "10px",
        }}
      >
        {articles.map((article) => (
          <Card
            key={article.id}
            sx={{
              width: "32%",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onClick={() =>
              router.push(`/${article.user.username}/${article.slug}`)
            }
          >
            <AspectRatio ratio="2">
              {article.cover_image ? (
                <img src={article.cover_image} loading="lazy" alt="" />
              ) : null}
            </AspectRatio>
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
              {article.title}
            </Typography>
            <Typography sx={{ opacity: "80%" }}>
              {article.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Avatar src={article.user.profile_image} size="sm" />
              <Typography fontSize="sm" sx={{ mb: 0.5 }}>
                {article.user.name}
              </Typography>
            </Box>
          </Card>
        ))}
      </div>
    </>
  );
}
