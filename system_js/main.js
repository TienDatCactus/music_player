/*
1. Render songs
2. Play / Pause / Seek
3. Next / Previous
4. Next / Repeat when ended
5. Active songs
6. Scroll active song into view
7. Play song when click
8. Random
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const musicInfo = $(".music-info");
const musicSubInfo = $(".music-subinfo");
const musicView = $(".music-view>img");
const musicName = $(".music-name");

const playBtn = $(".play");
const nextBtn = $(".next");
const prevBtn = $(".prev");
const mixBtn = $(".mix");
const replayBtn = $(".replay");

const audio = $(".audio");
const playIcon = $(".play>ion-icon");
const mixIcon = $(".mix>ion-icon");
const controller = $(".control");

const progressBar = $(".progress-bar>.bar");
const app = {
  curIndex: 0,
  songs: [
    {
      name: "1 Drop go Boom",
      singer: "shonci",
      path: "./assets/songs/1DROP_GO_BOOM_ProdChrissWtff.mp3",
      image:
        "./assets/images/289812454_1734433333574241_5278876591765689472_n.jpg",
    },
    {
      name: "1998",
      singer: "fxnkins",
      path: "./assets/songs/1998.mp3",
      image:
        "./assets/images/314487721_840482083741796_5887813443931778779_n.jpg",
    },
    {
      name: "all my fellas",
      singer: "quandale dingle",
      path: "./assets/songs/all-my-fellas.mp3",
      image:
        "./assets/images/323172470_716924593273773_8027849052266935150_n.jpg",
    },
    {
      name: "funkcão",
      singer: "dj FKU",
      path: "./assets/songs/brazilian-meme-song.mp3",
      image:
        "./assets/images/324414740_555199596510992_9135836555467931697_n.jpg",
    },
    {
      name: "de copao na mao estourado",
      singer: "kizz0",
      path: "./assets/songs/de-copao-na-mao-estourado.mp3",
      image:
        "./assets/images/318027802_5770860226269691_2328322409162795554_n.jpg",
    },
    {
      name: "the box",
      singer: "roddy rincho",
      path: "./assets/songs/indian.mp3",
      image:
        "./assets/images/326486989_1739214933139964_8620903039074243520_n.jpg",
    },
    {
      name: "mama, i'm a criminal",
      singer: "quandale dingle",
      path: "./assets/songs/mama-im-a-criminal_CPmz3U9_2.mp3",
      image:
        "./assets/images/327034121_650860520128323_7270424806548905794_n.jpg",
    },
    {
      name: "roses",
      singer: "tristansho",
      path: "./assets/songs/Spotify_Free_2024-01-28_20-47-38_1.mp3",
      image:
        "./assets/images/327677892_634316375118957_523028550179425736_n.jpg",
    },
    {
      name: "moonlight",
      singer: "xxxtentimesindian",
      path: "./assets/songs/vocaroo_s00zn0s23tsd.mp3",
      image:
        "./assets/images/327998994_991755395120209_5692396110861826567_n.jpg",
    },
    {
      name: "funked up",
      singer: "fxntaC",
      path: "./assets/songs/y2mate.com - FUNKED UP.mp3",
      image:
        "./assets/images/355078903_854722989421034_4483646814210333469_n.jpg",
    },
    {
      name: "parado no bailão",
      singer: "neimar jr.",
      path: "./assets/songs/y2mate.com - Parado no bailãoenglish lyrics  Neymar Jr song  tiktok sound  Chill MOOD channel.mp3",
      image:
        "./assets/images/356182996_3616519488578283_7284618543126914498_n.jpg",
    },
    {
      name: "diamondz n rozes",
      singer: "vaporGod",
      path: "./assets/songs/y2mate.com - VaporGod  Diamondz n Roses best part.mp3",
      image:
        "./assets/images/359893691_1310496516229255_4081742186739639720_n.png",
    },
    {
      name: "gay yeat",
      singer: "yaet",
      path: "./assets/songs/yeat-gay.mp3",
      image:
        "./assets/images/393079318_380409527695049_9175388240863914926_n.jpg",
    },
  ],
  isPlaying: false,
  isShuffle: false,
  defineProperty: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.curIndex];
      },
    });
  },
  loadCurrentSong: function () {
    musicInfo.textContent = this.currentSong.name;
    musicView.src = this.currentSong.image;
    musicSubInfo.textContent = this.currentSong.singer;
    musicName.textContent = this.currentSong.name;
    audio.src = this.currentSong.path;
    audio.onloadedmetadata = function () {
      progressBar.max = audio.duration;
    };
  },
  nextSong: function () {
    this.curIndex++;
    if (this.curIndex >= this.songs.length) {
      this.curIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.curIndex--;
    if (this.curIndex <= this.songs.length) {
      this.curIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndx;
    do {
      newIndx = Math.floor(Math.random() * this.songs.length);
    } while (this.curIndex === newIndx);
    this.curIndex = newIndx;
    this.loadCurrentSong();
  },
  replaySong: function () {
    audio.currentTime = 0;
  },
  handleEvents: function () {
    const _this = this;

    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      audio.onplay = function () {
        _this.isPlaying = true;
        controller.classList.add("playing");
        playIcon.name = "pause-outline";
      };
      audio.onpause = function () {
        _this.isPlaying = false;
        controller.classList.remove("playing");
        playIcon.name = "play";
      };

      audio.ontimeupdate = function () {
        progressBar.value = audio.currentTime;
      };

      progressBar.onchange = function () {
        var fastfw = progressBar.value;
        audio.currentTime = fastfw;
      };

      nextBtn.onclick = function () {
        if (_this.isShuffle) {
          _this.randomSong();
        } else {
          _this.nextSong();
        }
        audio.play();
      };

      prevBtn.onclick = function () {
        if (_this.isShuffle) {
          _this.randomSong();
        } else {
          _this.prevSong();
        }
        audio.play();
      };

      mixBtn.onclick = function () {
        _this.isShuffle = !_this.isShuffle;
        if (_this.isShuffle) {
          mixIcon.name = "invert-mode-outline";
        } else {
          mixIcon.name = "invert-mode";
        }
        audio.play();
      };

      replayBtn.onclick = function () {
        audio.currentTime = 0;
      };

      audio.onended = function () {
        nextBtn.click()
      }
    };

  },
  render: function () {
    const hmtl = this.songs.map((song) => {
      return `
      <div class="music-small">
        <div class="music-icon">
          <ion-icon name="musical-note"></ion-icon>
        </div>
        <div class="music-view-small">
          <img
            src="${song.image}"
          />
        </div>
        <div class="music-desc-small">
          <div class="music-info-small">${song.name}</div>
          <div class="music-subinfo-small">${song.singer}</div>
        </div>
      </div>
  `;
    });
    $(".playlist").innerHTML = hmtl.join("");
  },
  start: function () {
    this.defineProperty();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  },
};

app.start();
