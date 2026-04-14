/* ================================================================
   EVENT DATA — ここの値を差し替えてください
   ================================================================ */
const EVENT_DATA = {
  EVENT_TITLE: "Voices in Bloom",
  EVENT_SUBTITLE: "Four Vocal Bands in Live Session",

  EVENT_DATE: "2026.07.26 SUN",
  OPEN_TIME: "15:00",
  START_TIME: "15:30",

  VENUE_NAME: "Live Bar Flat Five",
  VENUE_ADDRESS: "兵庫県神戸市中央区中山手通2-3-19 B1F",

  ACCESS_TEXT: "各線三宮駅 徒歩7分 / 生田署向かい地下1階",
  ACCESS_SUB: "三宮駅より生田神社方面へ徒歩、ドンキホーテのある筋を山側へ徒歩5分",

  // チケット（事前/当日あるので調整）
  TICKET_PRICE: "¥1,000 / ¥1,500",
  TICKET_NOTE: "+1 Drink",

  // -------- バンド --------
  BAND_1_NAME: "SYM",
  BAND_1_TIME: "15:30",
  BAND_1_DESC: "Vo.るー / Gt.しみしょう / Gt.のぶや / Ba.こまっきー / Dr.ともみん",

  BAND_2_NAME: "Dang爵'z",
  BAND_2_TIME: "16:20",
  BAND_2_DESC: "Vo.キョウコ / Gt.OKU / Gt.さっさん / Ba.イリキ / Dr.Yasu",

  BAND_3_NAME: "Surpplysic",
  BAND_3_TIME: "17:10",
  BAND_3_DESC: "Vo.Jun / Gt.NINO / Gt.Naga U / Ba.Akane",

  // 予約URL（未定なら仮）
  RESERVE_URL: "#",
  BAND_1_IMG: "assets/woman1.png",
  BAND_2_IMG: "assets/woman2.png",
  BAND_3_IMG: "assets/woman3.png",  
};

/* ================================================================
   DOM INJECTION — EVENT_DATA をページへ反映
   ================================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* data-key 属性でテキストを差し替え */
  Object.keys(EVENT_DATA).forEach((key) => {
    document.querySelectorAll(`[data-key="${key}"]`).forEach((el) => {
      el.textContent = EVENT_DATA[key];
    });
  });

  /* 予約リンクの href を設定 */
  document.querySelectorAll("[data-reserve-link]").forEach((el) => {
    if (EVENT_DATA.RESERVE_URL && EVENT_DATA.RESERVE_URL !== "#") {
      el.href = EVENT_DATA.RESERVE_URL;
    }
  });

  /* アーティスト画像の src を設定 */
  [1, 2, 3].forEach((n) => {
    const img = document.querySelector(`[data-artist-img="${n}"]`);
    if (img) img.src = EVENT_DATA[`BAND_${n}_IMG`];
  });

  /* ヒーロー画像の読み込みエラー時にフォールバック表示
     <picture> 内の <img> なので nextElementSibling では .hero-fallback に届かない。
     closest(".hero-img-wrap") 経由で探す。 */
  const heroImg = document.querySelector(".hero-img");
  if (heroImg) {
    heroImg.addEventListener("error", () => {
      heroImg.classList.add("img-error");
      const fallback = heroImg.closest(".hero-img-wrap")
        ?.querySelector(".hero-fallback");
      if (fallback) fallback.style.display = "flex";
    });
    /* 既にキャッシュで失敗していた場合 */
    if (heroImg.complete && !heroImg.naturalWidth) {
      heroImg.dispatchEvent(new Event("error"));
    }
  }

  /* スムーススクロール */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* フェードイン: IntersectionObserver */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => io.observe(el));
});
