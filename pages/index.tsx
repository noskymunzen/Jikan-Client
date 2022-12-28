import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import $anime from "../services/anime";
import { useEffect } from "react";

export default function Home() {
  const getAnime = () => {
    $anime.getAnime();
  };
  const getAnimeById = () => {
    $anime.getAnimeById("1");
  };

  useEffect(() => {
    getAnime();
    getAnimeById();
  }, []);

  return (
    <>
      <div>index</div>
    </>
  );
}
