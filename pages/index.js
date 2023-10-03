import React, { useEffect, useState } from "react";
import styled from "styled-components";

import config from "../config.json";
import Menu from "../src/components/Menu/Menu";
import Aluratubers from "../src/components/Menu/components/Alutarubers";

import { StyledTimeline } from "../src/components/Timeline";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://uidvmjolmjaclnengenj.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZHZtam9sbWphY2xuZW5nZW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxMTM2NTUsImV4cCI6MjAxMTY4OTY1NX0.LKR5jvF38K0CTmS6sPepz_kin9MxE9HW_w-4Nlt4DNQ";
const supabase = createClient(PROJECT_URL, API_KEY);

export default function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = useState({});
  // config.playlists
  // const playlists = {
  //   "jogos": [],
  // }

  async function deleteItem() {
    const item = await supabase.from('video').delete().eq('id', '2');
  }

  useEffect(() => {
    console.log("use effect");

    supabase.from("video").select("*")
    .then((data) => {
      console.log(data.data);
      // Forma imutavel
      const novaPlaylists = {...playlists}
      data.data.forEach((video) => {
        if (!novaPlaylists[video.playlist]) {
          novaPlaylists[video.playlist] = [];
        }
        novaPlaylists[video.playlist]?.push(video);
      });
      setPlaylists(novaPlaylists);
      // supabase.from('video').delete().eq('id', '3');

      deleteItem();
    })
  }, [])

  return (
    <>
      <div>
        {/* Prop Drilling */}
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline
          searchValue={valorDoFiltro}
          playlists={playlists}
          fav={config.fav}
        />
      </div>
    </>
  );
}

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgoundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  margin-top: 50px;
  height: 230px;
  background-position: center;
  background-image: url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  const favs = Object.keys(props.fav);

  // Statement
  // Retorno por expressão
  return (
    <>
      <StyledTimeline>
        {playlistNames.map((playlistName) => {
          const videos = props.playlists[playlistName];
          return (
            <section key={playlistName}>
              <h2>{playlistName}</h2>
              <div>
                {videos
                  .filter((video) => {
                    const titleNormalized = video.title.toLowerCase();
                    const searchValueNormalized = searchValue.toLowerCase();
                    return titleNormalized.includes(searchValueNormalized);
                  })
                  .map((video) => {
                    return (
                      <a key={video.url} href={video.url} target="_blank">
                        <img src={video.thumb} />
                        <span>{video.title}</span>
                      </a>
                    );
                  })}
              </div>
            </section>
          );
        })}
      </StyledTimeline>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "32px",
          gap: "16px",
        }}
      >
        <h3>Aluratubers</h3>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {config.fav.Aluratubers.map((tubers) => {
            return (
              <>
                <Aluratubers
                  name={tubers.name}
                  image={tubers.image}
                  url={tubers.url}
                />
              </>
            );
          })}
        </section>
      </section>
    </>
  );
}
