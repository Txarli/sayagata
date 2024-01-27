import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import * as styles from "./hendaiaGauZaharra.module.scss";
import { SEO } from "../../components/SEO";

const HendaiaGauZaharra: React.FC = () => {
  return (
    <>
      <SEO
        title="Urtezaharra Hendaian"
        description="2023-2024 urtezaharra. Aita irailan zendu zen. Ama, arreba eta
            hirurok data hau Hendaian pasatzea erabaki dugu eta, nik, 1989ko
            Yashica zahar bat daramat jolasteko. Honatx 36 esposizioko karrete
            batean salbatutako argazkiak."
        pathname="/photo"
      />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroTextWrapper}>
            <h1 className={styles.heroTitle}>Urtezaharra Hendaian</h1>

            <p className={styles.heroDescription}>
              2023-2024 urtezaharra. Aita irailan zendu zen. Ama, arreba eta
              hirurok data hau Hendaian pasatzea erabaki dugu eta, nik, 1989ko
              Yashica zahar bat daramat jolasteko. Honatx 36 esposizioko karrete
              batean salbatutako argazkiak.
            </p>
          </div>

          <StaticImage
            src="./img/56920019.jpg"
            alt="Baionako feriako noria etxe baten atzean"
            placeholder="none"
            formats={["webp", "auto"]}
            imgClassName={styles.heroImage}
            className={styles.heroImageWrapper}
          />
        </section>

        <section className={styles.imagesSection}>
          <h2 className={styles.sectionTitle}>Baiona</h2>

          <div className={styles.baionaImagesWrapper}>
            <StaticImage
              src="./img/56920018.jpg"
              alt="Baionako feriako tiobiboa eta hegazti bat"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.baionaTiobibo}
            />

            <StaticImage
              src="./img/56920020.jpg"
              alt="Baionako ibaia"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.baionaIbaia}
            />
          </div>
        </section>

        <section className={styles.imagesSection}>
          <h2 className={styles.sectionTitle}>Angelutik Miarritzera</h2>

          <div className={styles.angeluImagesWrapper}>
            <StaticImage
              src="./img/56920023.jpg"
              alt="Miarritzeko farua zuhaitz baten adarren atzetik"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.farua}
            />

            <StaticImage
              src="./img/56920021.jpg"
              alt="Angeluko hesi bat graffiti batekin margotuta"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.hesia}
            />
          </div>
        </section>

        <section className={styles.imagesSection}>
          <h2 className={styles.sectionTitle}>Urruñatik pasiran</h2>

          <div className={styles.urrugnaImagesWrapper}>
            <StaticImage
              src="./img/56920003.jpg"
              alt="Urtubiako gazteluko detailea: dorrea eta lehio batzuk"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.gaztelua}
            />

            <StaticImage
              src="./img/56920006.jpg"
              alt="Baionako feriako noria etxe baten atzean"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.trenbidea}
            />

            <StaticImage
              src="./img/56920009.jpg"
              alt="Baionako feriako noria etxe baten atzean"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.maite}
            />

            <StaticImage
              src="./img/56920010.jpg"
              alt="Baionako feriako noria etxe baten atzean"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.kanposantoa}
            />

            <StaticImage
              src="./img/56920012.jpg"
              alt="Baionako feriako noria etxe baten atzean"
              placeholder="none"
              formats={["webp", "auto"]}
              className={styles.etxea}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default HendaiaGauZaharra;
