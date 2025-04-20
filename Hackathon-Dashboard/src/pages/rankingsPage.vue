<template>
  <v-container fluid class="ranking-page pa-4">
    <!-- Title -->
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h1 class="title">Leaderboard</h1>
      </v-col>
    </v-row>

    <!-- Top Three Podium -->
    <v-row class="top-three" justify="center" align="end">
      <!-- 2nd Place -->
      <v-col cols="12" sm="1" class="podium-wrapper">
        <v-card class="podium silver-podium">
          <div class="podium-header">🥈 {{ topThree[1]?.name || "N/A" }}</div>
          <div class="podium-body">
            <p class="score">{{ topThree[1]?.score || 0 }} points</p>
            <p class="details">8 out of 10</p>
          </div>
        </v-card>
      </v-col>

      <!-- 1st Place -->
      <v-col cols="12" sm="1" class="podium-wrapper">
        <v-card class="podium gold-podium">
          <div class="podium-header">🥇 {{ topThree[0]?.name || "N/A" }}</div>
          <div class="podium-body">
            <p class="score">{{ topThree[0]?.score || 0 }} points</p>
            <p class="details">9 out of 10</p>
          </div>
        </v-card>
      </v-col>

      <!-- 3rd Place -->
      <v-col cols="12" sm="1" class="podium-wrapper">
        <v-card class="podium bronze-podium">
          <div class="podium-header">🥉 {{ topThree[2]?.name || "N/A" }}</div>
          <div class="podium-body">
            <p class="score">{{ topThree[2]?.score || 0 }} points</p>
            <p class="details">7 out of 10</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Other Players List -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="ranking-list">
          <v-list>
            <v-list-item
              v-for="(player, index) in otherPlayers"
              :key="player.id"
            >
              <v-list-item-content class="list-item-content">
                <div class="list-item-container">
                  <span class="rank">#{{ index + 4 }}</span>
                  <div class="player-info">
                    <v-list-item-title>{{ player.name }}</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ player.score }} points</v-list-item-subtitle
                    >
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RankingPage",
  data() {
    return {
      players: [
        { id: 1, name: "Laura", score: 9846 },
        { id: 2, name: "LeAnn", score: 8246 },
        { id: 3, name: "Michelle", score: 7398 },
        { id: 4, name: "Dianthy", score: 234 },
        { id: 5, name: "Kay", score: 200 },
        { id: 6, name: "Shelsy", score: 168 },
        { id: 7, name: "Carl :)", score: 0 },
      ],
    };
  },
  computed: {
    sortedPlayers() {
      return [...this.players].sort((a, b) => b.score - a.score);
    },
    topThree() {
      return this.sortedPlayers.slice(0, 3);
    },
    otherPlayers() {
      return this.sortedPlayers.slice(3);
    },
  },
};
</script>

<style scoped>
.ranking-page {
  background: #7a9fff;
  min-height: 100vh;
  text-align: center;
  padding: 4%;
}

.title {
  color: #ffffff;
  font-size: calc(1.8rem + 1vw);
  font-weight: bold;
  margin-bottom: 2rem;
}

.top-three {
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.podium-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0.5rem;
}

.podium {
  width: 90%;
  max-width: 220px;
  min-width: 180px;

  text-align: center;
  border-radius: 0.75rem;
  color: #282828;
  font-weight: bold;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
  border: 0.125rem solid #ffffff;
  margin: 0 auto;
}

.podium:hover {
  transform: scale(1.05);
}

.silver-podium,
.bronze-podium {
  margin: 0 1rem;
}

.gold-podium {
  background: #ffe250;
  height: 25vh;
}

.silver-podium {
  background: #d9d9d9;
  height: 20vh;
}

.bronze-podium {
  background: #cd7f32;
  height: 15vh;
}

.podium-header {
  background: #282828;
  padding: 0.625rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: #ffffff;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
}

/* Podium Body */
.podium-body {
  padding: 0.9375rem;
}

.score {
  font-size: 1.375rem;
  font-weight: bold;
}

.details {
  font-size: 0.875rem;
  opacity: 0.9;
}

.ranking-list {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 0.9375rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  margin-top: 1.25rem;
}

.list-item-container {
  position: relative;
  text-align: center;
  padding-left: 3rem;
  display: inline-block;
  width: 100%;
}

.rank {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
}

.player-info {
  margin-top: 5px;
  display: inline-block;
}

@media (max-width: 800px) {
  .podium {
    min-width: unset;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  .silver-podium,
  .bronze-podium {
    margin: 0;
  }
}

@media (min-width: 801px) and (max-width: 1024px) {
  .silver-podium,
  .bronze-podium {
    margin: 0 0.5rem;
  }

  .top-three {
    gap: 1rem;
  }
}

@media (max-width: 600px) {
  .title {
    font-size: calc(1.6rem + 1vw);
  }

  .podium-wrapper {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .gold-podium {
    height: 20vh;
  }

  .silver-podium {
    height: 15vh;
  }

  .bronze-podium {
    height: 10vh;
  }
}
</style>
