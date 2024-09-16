<script setup>

import { computed, ref, onMounted, watch } from 'vue';
import confetti from 'canvas-confetti';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';

import LineGraph from './components/LineGraph.vue';
import StereoMeter from './components/StereoMeter.vue';
import BrandGame from './BrandGame.js';

const game = ref(new BrandGame());
const balance = ref(game.value.balance);
const lowLevelThreshold = ref(50);
const orderQuantity = ref(75);
const retailCostPerUnit = ref(100)
const todaysStats = ref({});
const gameFinishedMessage = ref('');
const displayInstructions = ref(true);
const confettiPlayed = ref(false)
const dayDuration = ref(250);

const customerLoyalty = computed(() => {
  return (todaysStats.value.customerLoyalty || 0) * 100;
});

const inventory = computed(() => {
  return todaysStats.value.inventory || 0;
});

const unitsSold = computed(() => {
  return todaysStats.value.unitsSold;
});

const day = computed(() => {
  return todaysStats.value.day;
});

const grossMargin = computed(() => {
  return (todaysStats.value.grossMargin || 0) * 100;
});

const freightCost = computed(() => {
  return todaysStats.value.freightCost;
});

const formattedTodayStats = computed(() => {
  return JSON.stringify(todaysStats.value, null, 2);
});
const lastMessage = computed(() => {
  return game.value.log[game.value.log.length - 1]
})
const isGameRunning = computed(() => {
  return game.value.isGameRunning()
})

const isGameLost = computed(() => {
  return game.value.isGameLost()
})

const isGameWon = computed(() => {
  return game.value.isGameWon()
})

const balanceIndicator = computed(() => {
  return Math.min(game.value.balance / game.value.initialBalance * 100, 100)
})

const toggleGame = () => {
  game.value.toggleGame(lowLevelThreshold, orderQuantity, retailCostPerUnit)
}

const startGame = (reset=false) => {
  if (reset) {
    newGame()
  }
  game.value.startGame(lowLevelThreshold, orderQuantity, retailCostPerUnit);
}

const newGame = () => {
  game.value = new BrandGame();
  game.value.setDayDuration(dayDuration.value);
  dailyStats.value = [];
  gameFinishedMessage.value = '';
  confettiPlayed.value = false;

  if (!isGameRunning.value) {
    toggleGame()
  }

}

const dailyStats = ref([])

const isNewStatistic = () => {
  if (dailyStats.value.length === 0) {
    return true
  }
  return dailyStats.value[dailyStats.value.length - 1].day != todaysStats.value.day
}

const playConfetti = () => {
  const end = Date.now() + (3 * 1000);

  const colors = ['#ff06ee', '#ff5d00'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
  confettiPlayed.value = true;

}

onMounted(() => {

  game.value.setDayDuration(dayDuration.value);

  return {
    game,
    gameFinishedMessage,
    isGameLost,
    isGameWon,
    balance,
    balanceIndicator,
    dailyStats,
    isNewStatistic,
    lowLevelThreshold,
    orderQuantity,
    retailCostPerUnit,
    isGameRunning,
    toggleGame,
    startGame,
    newGame,
  }

});

// watch game for changes, which will include balance and other attributes
watch(game, (newGame, oldGame) => {
  balance.value = newGame.balance;
  todaysStats.value = newGame.getTodayStats()
  if (todaysStats.value && isNewStatistic()) {
    dailyStats.value.push(todaysStats.value)
  }

  if (newGame.isGameLost() || newGame.isGameWon()) {
    gameFinishedMessage.value = lastMessage.value;
  }

  if (newGame.isGameWon() && !confettiPlayed.value) {
    playConfetti()
  }

}, { deep: true });

watch(lowLevelThreshold, (newVal, oldVal) => {
  game.value.lowLevelThreshold = newVal;
});

watch(orderQuantity, (newVal, oldVal) => {
  game.value.orderQuantity = newVal;
});

watch(retailCostPerUnit, (newVal, oldVal) => {
  game.value.retailCostPerUnit = newVal;
});

</script>

<template>
  <div v-if="displayInstructions" class="instructions">
    <p>You thought time flies IRL&mdash; in this simulation days go by every 1/2 a second.</p>

    <p>And every day, customers are trying to buy from your online shop. Set your prices too low, and you'll run out of cash. Set them too high, and customers won't buy!</p>

    <p>You're charged a daily storage fee and inventory takes 3 weeks to arrive, so watch your inventory levels!</p>

    <p>Double your money as fast as possible to set a new record.</p>
  </div>

  <div class="game-container">
    <div class="controls">
      <div class="control">
        <p>
          <label for="lowLevelThreshold">Re-Order Threshold</label>
        </p>
        <InputText v-model.number="lowLevelThreshold" />
        <Slider v-model="lowLevelThreshold" :max="375" />
      </div>

      <div class="control">
        <p>
          <label for="orderQuantity">Re-Order Quantity</label>
        </p>
        <InputText v-model.number="orderQuantity" />
        <Slider v-model="orderQuantity" :max="375" />
      </div>

      <div class="control">
        <p>
          <label for="retailCostPerUnit">Retail Price</label>
        </p>
        <InputText v-model.number="retailCostPerUnit" />
        <Slider v-model="retailCostPerUnit" :max="375" />
      </div>
    </div> <!-- end controls -->

    <div class="mid-group">
      <div class="balance">
        Day <strong>{{ day }}</strong>. Cash Balance <strong>${{ balance }}</strong><br />
        <a href="#" class="reset-day" @click="newGame">Reset to Day 1</a>
      </div>

      <!-- Start/Stop Button -->
      <div class="control button-container">
        <template v-if="game.isGameLost() || game.isGameWon()">
          <Button @click="startGame(true)" outlined label="Play Again" icon="pi pi-refresh" iconPos="left" />
        </template>
        <template v-else>
          <Button outlined v-if="isGameRunning" @click="toggleGame" label="Pause" icon="pi pi-pause" iconPos="left" />
          <Button outlined v-else @click="toggleGame" label="Start" icon="pi pi-play" iconPos="left" />
        </template>
      </div>
      <!-- End Start/Stop Button -->
    </div>

    <div class="feedback-text">

      <template v-if="gameFinishedMessage">
        <span><strong>{{ gameFinishedMessage }}</strong></span>
      </template>


      <span v-if="!gameFinishedMessage">{{ lastMessage }}</span>
      <span v-else><!-- Empty span for positioning--></span>
    </div>



    <div class="feedback-group">
      <div class="graph">
        <LineGraph :data="dailyStats" />
      </div>
      <div class="stats">
        <StereoMeter :value="customerLoyalty" label="Customer Loyalty" :min="0" :max="100" :size="300" />
        <StereoMeter :value="inventory" label="Inventory" :min="0" :max="100" :size="300" />
        <StereoMeter :value="balanceIndicator" label="Cash On Hand" :min="0" :max="100" :size="300" />
        <StereoMeter :value="grossMargin" label="Gross Margin" :min="0" :max="1" :size="300" />
      </div>
    </div> <!-- end feedback group-->
  </div>
</template>

<style scoped>

div.game-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


div.controls {
  display: flex;
  flex-direction: column;
  gap: 0rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  div.control {
    width: 100%;
    margin-bottom: 0;

    input[type="text"] {
      width: 100%;
      margin-bottom: 1rem;
      background-color: var(--p-input-background-color);
      color: var(--p-input-color);
    }

  }


  label {
    white-space: nowrap;
    text-transform: uppercase;
  }

}


div.mid-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

div.feedback-text {
  min-height: 2rem;
}

div.stats {
  display: flex;
  justify-content: space-around;
}



div.feedback-group {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}


div.graph, div.stats {
  width: 100%;
}

@media (min-width: 960px) {

  div.controls {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }

  div.game-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  div.feedback-group {
    flex-direction: row;
  }

  div.graph {
    width: 66.6%;
  }

  div.stats {
    width: 33.3%;
  }
}

</style>
